const newsModel = require("../models/newsModel");

class clientNewsController {
  getAllNews = async (req, res) => {
    try {
      // Fetch active news, sorted by newest, grouped by category
      const categoryNews = await newsModel.aggregate([
        { $sort: { createdAt: -1 } },
        { $match: { status: "active" } },
        {
          $group: {
            _id: "$category",
            news: {
              $push: {
                _id: "$_id",
                title: "$title",
                slug: "$slug",
                writerName: "$name",
                image: "$image",
                description: "$description",
                date: "$date",
                category: "$category",
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            news: { $slice: ["$news", 5] }, // Limit to latest 5 news per category
          },
        },
      ]);

      // Convert result array to object: { [category]: news[] }
      const newsByCategory = categoryNews.reduce((acc, item) => {
        acc[item.category] = item.news;
        return acc;
      }, {});

      return res.status(200).json({ news: newsByCategory });
    } catch (error) {
      console.error("Error fetching categorized news:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getPopularNews = async (req, res) => {
    try {
      const popularNews = await newsModel
        .find({ status: "active" })
        .sort({ count: -1 })
        .limit(4)
        .select("title slug image category date name description")
        .lean();

      const transformedNews = popularNews.map((item) => {
        const { name, ...rest } = item;
        return {
          ...rest,
          writerName: name,
        };
      });

      return res.status(200).json({ popularNews: transformedNews });
    } catch (error) {
      console.error("Error fetching popular news:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getLatestNews = async (req, res) => {
    try {
      const latestNews = await newsModel
        .find({ status: "active" })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title slug image category date name")
        .lean();

      const transformedNews = latestNews.map((item) => {
        const { name, ...rest } = item;
        return {
          ...rest,
          writerName: name,
        };
      });

      return res.status(200).json({ latestNews: transformedNews });
    } catch (error) {
      console.error("Error fetching latest news:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getHeadlines = async (req, res) => {
    try {
      const headlines = await newsModel
        .find({ status: "active" })
        .sort({ createdAt: -1 })
        .limit(10)
        .select("title slug");

      return res.status(200).json({ headlines });
    } catch (error) {
      console.error("Error fetching headlines:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

module.exports = new clientNewsController();
