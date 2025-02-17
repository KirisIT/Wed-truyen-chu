const Story = require("../models/Story");
const mongoose = require("mongoose");
const Category = require("../models/Category");

exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().populate("categories"); 
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.createStory = async (req, res) => {
  const { title, author, image, content, categories } = req.body;

  try {
    // Kiểm tra categories có dữ liệu không
    let categoryIds = [];

    if (categories && categories.length > 0) {
      // Chuyển đổi các category ID thành ObjectId
      categoryIds = categories.map((id) => new mongoose.Types.ObjectId(id));

      // Kiểm tra xem tất cả category ID có tồn tại trong database không
      const existingCategories = await Category.find({ _id: { $in: categoryIds } });

      if (existingCategories.length !== categoryIds.length) {
        return res.status(400).json({ message: "Có ID danh mục không hợp lệ!" });
      }
    }

    // Tạo truyện mới
    const newStory = new Story({
      title,
      author,
      image,
      content,
      categories: categoryIds,
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    console.error("Lỗi khi tạo truyện:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Không tìm thấy truyện" });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.searchStories = async (req, res) => {
  const { q } = req.query;
  try {
    const stories = await Story.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { author: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ]
    }).populate("categories");

    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getStoriesByCategory = async (req, res) => {
  try {
    const stories = await Story.find({ categories: req.params.categoryId }).populate("categories");
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
