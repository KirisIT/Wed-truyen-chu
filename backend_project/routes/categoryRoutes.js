const express = require("express");
const { getCategories, createCategory, getCategoryById } = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getCategories);
router.post("/", authMiddleware, createCategory);
router.get("/:id", getCategoryById);

module.exports = router;
