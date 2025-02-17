const Category = require("../models/Category");

// Lấy danh sách danh mục
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Tạo danh mục mới
exports.createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thêm hàm getCategoryById
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Không tìm thấy thể loại" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
