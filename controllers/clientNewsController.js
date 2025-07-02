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
}

module.exports = new clientNewsController();
