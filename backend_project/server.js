require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const commentRoutes = require("./routes/commentRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/favorites", favoriteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
