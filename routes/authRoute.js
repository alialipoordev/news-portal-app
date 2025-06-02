const authController = require("../controllers/authController");
const middleware = require("../middlewares/middleware");

const router = require("express").Router();

router.post("/api/login", authController.login);

router.post(
  "/api/writer/add",
  middleware.auth,
  middleware.role,
  authController.add_writer
);

router.get(
  "/api/news/writers",
  middleware.auth,
  middleware.role,
  authController.get_writers
);

module.exports = router;
