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

router.get(
  "/api/news/writer/:id",
  middleware.auth,
  middleware.role,
  authController.get_writerById
);

router.put(
  "/api/update/writer/:id",
  middleware.auth,
  middleware.role,
  authController.update_writer
);

router.delete(
  "/api/delete/writer/:id",
  middleware.auth,
  middleware.role,
  authController.delete_writer
);

router.get(
  "/api/profile",
  middleware.auth,
  middleware.role,
  authController.get_profile
);

router.put(
  "/api/profile/update",
  middleware.auth,
  middleware.role,
  authController.update_profile
);

router.delete(
  "/api/profile/image",
  middleware.auth,
  middleware.role,
  authController.delete_profile_img
);

module.exports = router;
