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

  getNewsCategories = async (req, res) => {
    try {
      const categories = await newsModel.aggregate([
        { $match: { status: "active" } },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1,
          },
        },
      ]);

      return res.status(200).json({ categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getNewsDetails = async (req, res) => {
    const { slug } = req.params;

    try {
      const newsDoc = await newsModel
        .findOneAndUpdate({ slug }, { $inc: { count: 1 } }, { new: true })
        .lean();

      if (!newsDoc) {
        return res.status(404).json({ message: "News not found" });
      }

      // rename 'name' to 'writerName' in main news
      const { name, ...rest } = newsDoc;
      const news = { ...rest, writerName: name };

      const relatedNewsDocs = await newsModel
        .find({
          slug: { $ne: slug },
          category: news.category,
          status: "active",
        })
        .limit(4)
        .sort({ createdAt: -1 })
        .lean();

      // map name → writerName in related news
      const relatedNews = relatedNewsDocs.map(({ name, ...other }) => ({
        ...other,
        writerName: name,
      }));

      return res.status(200).json({
        news,
        relatedNews,
      });
    } catch (error) {
      console.error("Error fetching news details:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getNewsByCategory = async (req, res) => {
    const { category } = req.params;
    const formattedCategory =
      category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    try {
      const newsDocs = await newsModel
        .find({
          category: formattedCategory,
          status: "active",
        })
        .sort({ createdAt: -1 })
        .lean();

      // Optional: Rename `name` → `writerName`
      const news = newsDocs.map(({ name, ...rest }) => ({
        ...rest,
        writerName: name,
      }));

      return res.status(200).json({ news });
    } catch (error) {
      console.error("Error fetching category news:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getRecentNews = async (req, res) => {
    try {
      const news = await newsModel
        .find({ status: "active" })
        .sort({ createdAt: -1 })
        .skip(6)
        .limit(5)
        .select("title slug image category date name")
        .lean();

      const transformed = news.map(({ name, ...rest }) => ({
        ...rest,
        writerName: name,
      }));

      return res.status(200).json({ news: transformed });
    } catch (error) {
      console.error("Error fetching recent news:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  getGalleryImages = async (req, res) => {
    try {
      const images = await newsModel.aggregate([
        {
          $match: { status: "active" },
        },
        {
          $sample: { size: 9 }, // Randomly select 9 documents
        },
        {
          $project: { image: 1, _id: 0 }, // Only return image field
        },
      ]);

      return res.status(200).json({ images });
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };

  searchNews = async (req, res) => {
    const { value } = req.query;

    try {
      if (!value || value.trim() === "") {
        return res.status(400).json({ message: "Search value is required" });
      }

      const news = await newsModel
        .find({
          status: "active",
          title: { $regex: value, $options: "i" },
        })
        .lean();

      const transformed = news.map(({ name, ...rest }) => ({
        ...rest,
        writerName: name,
      }));

      return res.status(200).json({ news: transformed });
    } catch (error) {
      console.error("Error searching news:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

module.exports = new clientNewsController();
