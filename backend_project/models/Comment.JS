const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  story_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Story", 
    required: true 
  },
  chapter_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Chapter" 
  },
  content: { 
    type: String, 
    required: true 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
