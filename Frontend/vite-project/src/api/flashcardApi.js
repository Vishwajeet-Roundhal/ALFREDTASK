import axios from "axios";


const API_URL = "http://localhost:5000/api/flashcards";
const token = localStorage.getItem("token");

// Fetch Due Flashcards
export const fetchFlashcards = async () => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Add a Flashcard
export const addFlashcard = async (question, answer) => {
  const res = await axios.post(API_URL, { question, answer }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update Flashcard (Correct/Wrong)
export const updateFlashcard = async (id, correct) => {
  const res = await axios.put(`${API_URL}/${id}`, { correct }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete Flashcard
export const deleteFlashcard = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
