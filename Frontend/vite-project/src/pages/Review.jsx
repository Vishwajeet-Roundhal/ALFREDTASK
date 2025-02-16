import React, { useState, useEffect } from "react";
import axios from "axios";

const Review = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/flashcards", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFlashcards(res.data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleAnswer = async (isCorrect) => {
    if (!flashcards.length) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/flashcards/${flashcards[currentIndex]._id}`,
        { correct: isCorrect },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowAnswer(false);
      if (currentIndex + 1 < flashcards.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        alert("All flashcards reviewed!");
        fetchFlashcards();
      }
    } catch (error) {
      console.error("Error updating flashcard:", error);
    }
  };

  if (!flashcards.length) return <h2 className="text-center mt-5">No flashcards to review!</h2>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-lg w-96 text-center">
        <h2 className="text-xl font-bold">{flashcards[currentIndex].question}</h2>

        {showAnswer && (
          <p className="mt-4 text-gray-700">{flashcards[currentIndex].answer}</p>
        )}

        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => handleAnswer(false)}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Got it Wrong
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Got it Right
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
