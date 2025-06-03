const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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
}

module.exports = new AuthController();
