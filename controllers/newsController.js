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

  get_news_edit = async (req, res) => {
    try {
      const { id } = req.params;
      const news = await newsModel.findById(id).lean();
      res.json({ news });
    } catch (error) {
      console.error("get_news_edit Error:", error);
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

  update_news = async (req, res) => {
    try {
      const { id } = req.params;
      const form = formidable({});

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid news ID" });
      }

      await form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Form parse error:", err);
          return res.status(400).json({ message: "Form data parsing failed" });
        }

        const news = await newsModel.findById(id);
        if (!news) {
          return res.status(404).json({ message: "News not found" });
        }

        const { title, description } = fields;

        let imageUrl = news.image;

        if (files.image) {
          const parts = imageUrl.split("/");
          const fileName = parts[parts.length - 1];
          const publicId = fileName.split(".")[0];

          if (publicId) {
            await cloudinary.uploader.destroy(`news_images/${publicId}`);
          }

          const { url } = await cloudinary.uploader.upload(
            files.image[0].filepath,
            { folder: "news_images" }
          );

          imageUrl = url;
        }

        await newsModel.findByIdAndUpdate(
          id,
          {
            title: title[0].trim(),
            slug: title[0].trim().split(" ").join("-"),
            description: description[0],
            image: imageUrl,
          },
          { new: true }
        );

        return res.status(200).json({
          message: "News updated successfully",
        });
      });
    } catch (error) {
      console.error("update_news Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  delete_news = async (req, res) => {
    try {
      const { id } = req.params;

      const news = await newsModel.findById(id);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }

      let imageUrl = news.image;

      const publicId = imageUrl.split("/").pop().split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`news_images/${publicId}`);
      }

      await newsModel.findByIdAndDelete(id);
      return res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
      console.error("delete_news Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  update_news_status = async (req, res) => {
    const { role } = req.userInfo;
    const { id } = req.params;
    const { status } = req.body;
    console.log(status);

    try {
      if (role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid news ID" });
      }

      const news = await newsModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }

      return res.status(200).json({
        message: `News status successfully updated to "${news.status}".`,
      });
    } catch (error) {
      console.error("update_news_status Error:", error);
      return res.status(500).json({ message: "Internal server error" });
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

      await form.parse(req, async (err, fields, files) => {
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
