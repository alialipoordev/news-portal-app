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
}

module.exports = new AuthController();
