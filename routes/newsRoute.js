const newsController = require("../controllers/newsController");
const middleware = require("../middlewares/middleware");

const router = require("express").Router();

router.get("/api/news", middleware.auth, newsController.get_news);
router.get("/api/news/:id", middleware.auth, newsController.get_news_edit);
router.put("/api/news/update/:id", middleware.auth, newsController.update_news);
router.post("/api/news/add", middleware.auth, newsController.add_news);
router.get("/api/gallery/images", middleware.auth, newsController.get_images);
router.post(
  "/api/gallery/images/add",
  middleware.auth,
  newsController.add_images
);

module.exports = router;
