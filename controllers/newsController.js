const newsModel = require("../models/newsModel");
const imageGalleryModel = require("../models/imageGalleryModel");

const cloudinary = require("../utils/cloudinary");
const { formidable } = require("formidable");
const moment = require("moment");
const mongoose = require("mongoose");

class NewsController {
  get_news = async (req, res) => {
    try {
      const { role, id } = req.userInfo;

      const query = role === "admin" ? {} : { writerId: id };

      const news = await newsModel.find(query).sort({ createdAt: -1 }).lean();

      return res.status(200).json({
        message:
          role === "admin"
            ? "All news retrieved successfully"
            : "Your news retrieved successfully",
        news,
      });
    } catch (error) {
      console.error("get_news Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

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

  get_images = async (req, res) => {
    try {
      const { id } = req.userInfo;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid writer ID" });
      }

      const images = await imageGalleryModel
        .find({
          writerId: id,
        })
        .sort({ createdAt: -1 });

      return res.status(200).json({ images });
    } catch (error) {
      console.error("Upload Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  add_images = async (req, res) => {
    try {
      const { id } = req.userInfo;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid writer ID" });
      }

      const form = formidable({ multiples: true });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Formidable error:", err);
          return res.status(400).json({ message: "File parsing failed" });
        }

        const fileList = Array.isArray(files.images)
          ? files.images
          : [files.images];

        let uploadedImages = [];

        for (const file of fileList) {
          const { url } = await cloudinary.uploader.upload(file.filepath, {
            folder: "news_images",
          });

          uploadedImages.push({ writerId: id, url });
        }

        const image = await imageGalleryModel.insertMany(uploadedImages);

        return res.status(201).json({
          message: "Images uploaded successfully",
          images: image,
        });
      });
    } catch (error) {
      console.error("Upload Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = new NewsController();
