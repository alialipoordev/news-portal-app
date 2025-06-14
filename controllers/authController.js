const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const { formidable } = require("formidable");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

class AuthController {
  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required." });
      }

      const user = await authModel.findOne({ email }).select("+password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "There is no user with this email." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "The password is incorrect." });
      }

      const userInfo = {
        id: user.id,
        name: user.name,
        category: user.category,
        role: user.role,
      };

      const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
      });

      res.status(200).json({
        message: "Login was successful.",
        token,
      });
    } catch (error) {
      console.log(error);
    }
  };

  add_writer = async (req, res) => {
    const { name, password, category, email } = req.body;
    if (!name?.trim() || !password?.trim() || !category || !email?.trim())
      return res.status(404).json({ message: "All fields are required" });

    try {
      const writer = await authModel.findOne({ email });
      if (writer)
        return res.status(409).json({ message: "Writer already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newWriter = await authModel.create({
        name,
        password: hashedPassword,
        category,
        email,
        role: "writer",
      });

      return res.status(201).json({
        message: "Writer added successfully",
        writer: newWriter,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  };

  get_writers = async (req, res) => {
    try {
      const writers = await authModel
        .find({ role: "writer" })
        .sort({ createdAt: -1 });

      return res.status(200).json({ writers });
    } catch (error) {
      console.error("Error in get_writers:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  get_writerById = async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const writer = await authModel
        .findById(id)
        .select("name email role category -_id");
      if (!writer) return res.status(404).json({ message: "Writer not found" });

      return res.status(200).json({ writer });
    } catch (error) {
      console.error("Error in get_writerById:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  update_writer = async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid writer ID" });
      }

      const writer = await authModel.findById(id);

      if (!writer) {
        return res.status(404).json({ message: "Writer not found" });
      }

      const { name, email, category, role } = req.body;

      if (!name?.trim() || !email?.trim() || !category?.trim() || !role?.trim())
        return res.status(400).json({ message: "All fields are required" });

      writer.name = name;
      writer.email = email;
      writer.category = category;
      writer.role = role;

      await writer.save();

      return res.status(200).json({
        message: "Writer updated successfully",
      });
    } catch (error) {
      console.error("Error in update_writer:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  delete_writer = async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid writer ID" });
      }

      const writer = await authModel.findByIdAndDelete(id);
      if (!writer) return res.status(404).json({ message: "Writer not found" });

      return res.status(200).json({ message: "Writer deleted successfully" });
    } catch (error) {
      console.error("Error in delete_writer:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  get_profile = async (req, res) => {
    try {
      const userId = req.userInfo?.id;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID." });
      }

      const user = await authModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error("Get Profile Error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };

  update_profile = async (req, res) => {
    const { id } = req.userInfo;
    const form = formidable({ multiples: true });

    await form.parse(req, async (err, fields, files) => {
      if (err) return res.status(400).json({ message: "Form parsing failed" });

      try {
        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const email = Array.isArray(fields.email)
          ? fields.email[0]
          : fields.email;
        const imageFile = Array.isArray(files.image)
          ? files.image[0]
          : files.image;

        if (!name || !email)
          return res.status(400).json({ message: "Please fill all fields" });

        const user = await authModel.findById(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        if (imageFile && imageFile.filepath) {
          if (user.image) {
            const publicId = user.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(`news_images/${publicId}`);
          }

          const { url } = await cloudinary.uploader.upload(imageFile.filepath, {
            folder: "news_images",
          });

          user.image = url;
        }

        user.name = name.toString();
        user.email = email.toString();

        await user.save();

        return res.status(200).json({ message: "Profile updated" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
      }
    });
  };

  delete_profile_img = async (req, res) => {
    try {
      const { id } = req.userInfo;

      const user = await authModel.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.image) {
        return res.status(400).json({ message: "No profile image to delete" });
      }

      const publicId = user.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`news_images/${publicId}`);

      user.image = "";
      await user.save();

      return res.status(200).json({
        message: "Profile image deleted successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  change_password = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.userInfo;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Both old and new password are required." });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters long." });
    }

    try {
      const user = await authModel.findById(id).select("+password");
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });

      if (oldPassword === newPassword)
        return res.status(400).json({
          message: "New password must be different from the old password.",
        });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
      console.error("Error while updating password:", err);
      return res
        .status(500)
        .json({ message: "An error occurred while changing the password." });
    }
  };
}

module.exports = new AuthController();
