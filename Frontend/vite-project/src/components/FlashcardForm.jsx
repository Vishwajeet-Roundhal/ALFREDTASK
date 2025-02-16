import React, { useState } from "react";
import { addFlashcard } from "../api/flashcardApi";
import "../styles/FlashcardForm.css"

const FlashcardForm = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addFlashcard(question, answer);
    window.location.reload(); // Refresh list
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
      <input type="text" placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
      <button type="submit">Add Flashcard</button>
    </form>
  );
};

export default FlashcardForm;
