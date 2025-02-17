const Favorite = require("../models/Favorite.JS");
const mongoose = require("mongoose");
// Lấy danh sách truyện yêu thích của người dùng
exports.getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ user_id: userId })
      .populate("story_id", "title cover_image")
      .sort({ created_at: -1 });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Thêm truyện vào danh sách yêu thích
exports.addFavorite = async (req, res) => {
  try {
    const { user_id, story_id } = req.body;
    // Kiểm tra xem đã tồn tại chưa
    const exists = await Favorite.findOne({ user_id, story_id });
    if (exists) {
      return res.status(400).json({ message: "Truyện đã được thêm vào danh sách yêu thích" });
    }
    const favorite = new Favorite({
      user_id,
      story_id,
      created_at: new Date()
    });
    await favorite.save();
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Xóa truyện khỏi danh sách yêu thích
exports.removeFavorite = async (req, res) => {
  try {
    const { user_id, story_id } = req.body;
    await Favorite.deleteOne({ user_id, story_id });
    res.json({ message: "Đã xóa khỏi danh sách yêu thích" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
