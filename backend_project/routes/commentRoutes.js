const express = require("express");
const { getComments, createComment } = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Lấy danh sách bình luận theo query (storyId, chapterId) - cần xác thực
router.get("/", authMiddleware, getComments);

// Tạo bình luận mới - cần xác thực
router.post("/", authMiddleware, createComment);

module.exports = router;
