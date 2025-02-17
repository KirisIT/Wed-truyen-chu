const Comment = require("../models/Comment.JS");
const mongoose = require("mongoose");

// Lấy danh sách bình luận theo điều kiện (story và/hoặc chapter)
exports.getComments = async (req, res) => {
  try {
    // Có thể lấy story_id và chapter_id từ query string, 
    const { storyId, chapterId } = req.query;
    const filter = {};
    if (storyId) filter.story_id = storyId;
    if (chapterId) filter.chapter_id = chapterId;

    // Populate thông tin người dùng (user_id) nếu cần
    const comments = await Comment.find(filter)
      .populate("user_id", "name")
      .sort({ created_at: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Tạo bình luận mới
exports.createComment = async (req, res) => {
  try {
    const { user_id, story_id, chapter_id, content } = req.body;
    const newComment = new Comment({
      user_id,
      story_id,
      chapter_id,
      content,
      created_at: new Date()
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
