  const mongoose = require("mongoose");

  const StorySchema = new mongoose.Schema({
    title: String,
    author: String,
    image: String,
    content: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    views: { type: Number, default: 0 }
  });
  

  module.exports = mongoose.model("Story", StorySchema);
