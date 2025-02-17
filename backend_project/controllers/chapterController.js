const Chapter = require("../models/Chapter.JS");
const mongoose = require("mongoose");

// Lấy danh sách chương của một truyện theo storyId (truyền qua params)
exports.getChapters = async (req, res) => {
  try {
    const { storyId } = req.params;
    const chapters = await Chapter.find({ story_id: storyId })
      .sort({ chapter_number: 1 });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Tạo một chương mới cho một truyện
exports.createChapter = async (req, res) => {
  try {
    const { story_id, title, content, chapter_number } = req.body;
    const newChapter = new Chapter({
      story_id,
      title,
      content,
      chapter_number,
      created_at: new Date()
    });
    await newChapter.save();
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
