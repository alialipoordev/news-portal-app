const jwt = require("jsonwebtoken");

class Middleware {
  auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer "))
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });

    try {
      const token = authorization.split("Bearer ")[1];
      const userInfo = jwt.verify(token, process.env.JWT_SECRET);
      req.userInfo = userInfo;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };

  role = async (req, res, next) => {
    const { userInfo } = req;

    if (!userInfo || !["admin", "writer"].includes(userInfo.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    next();
  };
}

module.exports = new Middleware();
