const express = require("express");
const { getStories, createStory, getStoryById, searchStories, getStoriesByCategory } = require("../controllers/storyController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getStories);
router.post("/", authMiddleware, createStory);
router.get("/search", searchStories);
router.get("/category/:categoryId", getStoriesByCategory);
router.get("/:id", getStoryById);

module.exports = router;
