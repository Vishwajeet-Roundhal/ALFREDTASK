import React, { useState } from "react";
import { updateFlashcard, deleteFlashcard } from "../api/flashcardApi";
import "../styles/card.css";

const FlashcardCard = ({ flashcard, onRemove }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false); // Track if the card is answered

  const handleResponse = async (correct) => {
    await updateFlashcard(flashcard._id, correct);
    setIsAnswered(true); // Mark the card as answered to hide it
  };

  const handleDelete = async () => {
    await deleteFlashcard(flashcard._id);
    onRemove(flashcard._id); // Remove card from UI
  };

  if (isAnswered) return null; // Hide the card after answering

  return (
    <div className="flashcard">
      <p>Q: {flashcard.question}</p>
      {showAnswer ? <p>A: {flashcard.answer}</p> : <button onClick={() => setShowAnswer(true)}>Show Answer</button>}
      
      {showAnswer && (
        <>
          <button onClick={() => handleResponse(true)}>Got it Right</button>
          <button onClick={() => handleResponse(false)}>Got it Wrong</button>
        </>
      )}
      
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default FlashcardCard;
