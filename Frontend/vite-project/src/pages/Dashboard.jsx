import React, { useEffect, useState } from "react";
import { fetchFlashcards } from "../api/flashcardApi"; // API function to fetch flashcards
import "../styles/Dashboard.css"

const Dashboard = () => {
  const [flashcardsByBox, setFlashcardsByBox] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  });

  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        const data = await fetchFlashcards();
        console.log(data);
        
        // Group flashcards by box (1-5)
        const groupedFlashcards = { 1: [], 2: [], 3: [], 4: [], 5: [] };
        data.forEach((card) => {
          groupedFlashcards[card.box].push(card);
        });
        console.log(groupedFlashcards);
        

        setFlashcardsByBox(groupedFlashcards);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    loadFlashcards();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <h2>Your Progress</h2>

      {Object.keys(flashcardsByBox).map((box) => (
        <div key={box} className="box-section">
          <h3>📦 Box {box} ({flashcardsByBox[box].length} cards)</h3>

          {flashcardsByBox[box].length === 0 ? (
            <p>No flashcards in this box.</p>
          ) : (
            flashcardsByBox[box].map((card) => (
              <div key={card._id} className="flashcard">
                <p><strong>Q:</strong> {card.question}</p>
                <p><strong>Next Review:</strong> {new Date(card.nextReview).toDateString()}</p>
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
