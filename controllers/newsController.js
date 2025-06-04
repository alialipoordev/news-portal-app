const newsModel = require("../models/newsModel");
const cloudinary = require("../utils/cloudinary");
const { formidable } = require("formidable");
const moment = require("moment");

class NewsController {
  add_news = async (req, res) => {
    const { id, name, category } = req.userInfo;
    const form = formidable({});

    try {
      const [fields, files] = await form.parse(req);
      const { title, description } = fields;

      if (!title || !description || !files.image) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const { url } = await cloudinary.uploader.upload(
        files.image[0].filepath,
        { folder: "news_images" }
      );

      const news = await newsModel.create({
        writerId: id,
        name,
        title: title[0].trim(),
        slug: title[0].trim().split(" ").join("-"),
        category,
        description: description[0],
        date: moment().format("LL"),
        image: url,
      });

      return res.status(201).json({ message: "News Added Successfully", news });
    } catch (error) {
      console.error("Upload Error:", error);
      return res.status(500).json({ message: "Internal server Error" });
    }
  };
}

module.exports = new NewsController();
