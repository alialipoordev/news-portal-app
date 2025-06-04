const newsController = require("../controllers/newsController");
const middleware = require("../middlewares/middleware");

const router = require("express").Router();

router.post("/api/news/add", middleware.auth, newsController.add_news);

module.exports = router;
