const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  box: { type: Number, default: 1 }, // Leitner Box (1-5)
  nextReview: { type: Date, default: Date.now }, // Next review date
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User reference
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
