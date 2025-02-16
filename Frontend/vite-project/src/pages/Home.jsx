import React from "react";
import FlashcardForm from "../components/FlashcardForm";
import FlashcardList from "../components/FlashcardList";
import "../styles/home.css"

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <FlashcardForm />
      <FlashcardList />
    </div>
  );
};

export default Home;
