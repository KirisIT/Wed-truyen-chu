const express = require("express");
const { getChapters, createChapter } = require("../controllers/chapterController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Lấy danh sách chương của một truyện theo storyId (truyền qua URL params)
router.get("/:storyId", authMiddleware, getChapters);

// Tạo chương mới cho truyện - cần xác thực
router.post("/", authMiddleware, createChapter);

module.exports = router;
