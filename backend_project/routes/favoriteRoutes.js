const express = require("express");
const { getFavorites, addFavorite, removeFavorite } = require("../controllers/favoriteController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Lấy danh sách truyện yêu thích của người dùng theo userId (truyền qua URL params)
router.get("/:userId", authMiddleware, getFavorites);

// Thêm truyện vào danh sách yêu thích - cần xác thực
router.post("/", authMiddleware, addFavorite);

// Xóa truyện khỏi danh sách yêu thích - cần xác thực
router.delete("/", authMiddleware, removeFavorite);

module.exports = router;

