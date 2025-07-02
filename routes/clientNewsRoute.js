const clientNewsController = require("../controllers/clientNewsController");
const router = require("express").Router();

router.get("/api/public/all/news", clientNewsController.getAllNews);
router.get("/api/public/popular/news", clientNewsController.getPopularNews);

module.exports = router;
