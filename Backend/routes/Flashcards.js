const express = require("express");
const router = express.Router();
const Flashcard = require("../models/Flashcard");
const authMiddleware = require("../middleware/auth");

const getNextReviewDate = (box) => {
  const intervals = [1, 3, 7, 14, 30]; 
  return new Date(Date.now() + intervals[box - 1] * 24 * 60 * 60 * 1000);
};

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFlashcard = new Flashcard({ question, answer, userId: req.user.id });
    await newFlashcard.save();
    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ userId: req.user.id }).sort({ box: 1 });
    
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { correct } = req.body;
    const flashcard = await Flashcard.findById(req.params.id);

    if (!flashcard) return res.status(404).json({ error: "Flashcard not found" });

    // Move to next box or reset to Box 1
    flashcard.box = correct ? Math.min(5, flashcard.box + 1) : 1;
    flashcard.nextReview = getNextReviewDate(flashcard.box);

    await flashcard.save();
    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: "Flashcard deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
