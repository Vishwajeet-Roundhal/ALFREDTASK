import React, { useEffect, useState } from "react";
import { getFlashcards, updateFlashcard } from "../api/flashcardApi";

const FlashcardReview = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const res = await getFlashcards();
      setFlashcards(res.data.filter((card) => new Date(card.nextReview) <= new Date()));
    } catch (error) {
      console.error("Error fetching flashcards", error);
    }
  };

  const handleResponse = async (correct) => {
    if (flashcards.length > 0) {
      await updateFlashcard(flashcards[currentIndex]._id, correct);
      fetchFlashcards();
      setShowAnswer(false);
      setCurrentIndex((prev) => (prev + 1) % flashcards.length);
    }
  };

  if (flashcards.length === 0) {
    return <div className="p-4 text-center">No flashcards due for review.</div>;
  }

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold">Review Flashcards</h2>
      <div className="border p-4 my-2">
        <h3 className="text-lg font-semibold">{flashcards[currentIndex].question}</h3>
        {showAnswer && <p className="text-gray-600">{flashcards[currentIndex].answer}</p>}
        <button onClick={() => setShowAnswer(true)} className="bg-gray-500 text-white px-4 py-2 m-2">
          Show Answer
        </button>
        <button onClick={() => handleResponse(true)} className="bg-green-500 text-white px-4 py-2 m-2">
          Got it Right
        </button>
        <button onClick={() => handleResponse(false)} className="bg-red-500 text-white px-4 py-2 m-2">
          Got it Wrong
        </button>
      </div>
    </div>
  );
};

export default FlashcardReview;
