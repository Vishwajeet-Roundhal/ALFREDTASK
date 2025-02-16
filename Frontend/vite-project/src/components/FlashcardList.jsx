import React, { useEffect, useState } from "react";
import { fetchFlashcards } from "../api/flashcardApi";
import FlashcardCard from "./FlashcardCard";
import "../styles/list.css"

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        const data = await fetchFlashcards();
        setFlashcards(data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    loadFlashcards();
  }, []);

  const removeFlashcard = (id) => {
    setFlashcards((prev) => prev.filter((card) => card._id !== id));
  };

  return (
    <div>
      <h2>Your flashcards</h2>
      {flashcards.map((flashcard) => (
        <FlashcardCard key={flashcard._id} flashcard={flashcard} onRemove={removeFlashcard}/>
      ))}
    </div>
  );
};

export default FlashcardList;
