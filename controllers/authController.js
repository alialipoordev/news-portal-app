const authModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
}

module.exports = new AuthController();
