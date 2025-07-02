const clientNewsController = require("../controllers/clientNewsController");
const router = require("express").Router();

router.get("/api/public/all/news", clientNewsController.getAllNews);
router.get("/api/public/popular/news", clientNewsController.getPopularNews);
router.get("/api/public/latest/news", clientNewsController.getLatestNews);
router.get("/api/public/headlines", clientNewsController.getHeadlines);

module.exports = router;
