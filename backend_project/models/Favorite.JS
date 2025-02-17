const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
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
  created_at: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
