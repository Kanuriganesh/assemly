import React, { useState, useEffect } from "react";
import ButtonElement from "./components/ButtonElement"; 
import "./index.css"
const App = () => {
  const tags = [
    { name: "HTML", color: "#E34C26" },
    { name: "CSS", color: "#264de4" },
    { name: "Javascript", color: "#F7DF1E", textColor: "#000" },
    { name: "React", color: "#61DAFB", textColor: "#000" },
    { name: "Typescript", color: "#3178C6" },
    { name: "Node.js", color: "#68A063" },
    { name: "Python", color: "#306998" },
    { name: "Ruby", color: "#CC342D" },
    { name: "Assembly", color: "#6E6E6E" },
  ];
  const words = [
    "MOUNTAIN", "ELEPHANT", "HOSPITAL", "LANGUAGE", "NOTEBOOK",
    "SOFTWARE", "SUNLIGHT", "TOMORROW", "BASEBALL", "VOLCANOES",
    "COLORFUL", "PURPLELY", "BACKBONE", "PASSWORD", "RAINBOWS",
    "PLANTING", "FIREFLIES", "CAMPFIRE", "AIRPLANE", "HAPPINESS"
  ];

  const lettersArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter, index) => ({
    id: index + 1,
    letter,
    correct: false,
    incorrect: false
  }));

  const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

  const [randomWord, setRandomWord] = useState("");
  const [buttonElements, setButtonElements] = useState(lettersArray);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    setRandomWord(getRandomWord());
  }, []);

  const updateButtonElement = (id) => {
  
       
    setButtonElements((prev) =>
      prev.map((btn) =>
        btn.id === id
          ? {
              ...btn,
              correct: randomWord.includes(btn.letter),
              incorrect: !randomWord.includes(btn.letter),
            }
          : btn
      )
    );

    if (!randomWord.includes(buttonElements.find((btn) => btn.id === id).letter)) {
      setIncorrectAttempts((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (incorrectAttempts >= 8) {
      setGameOver(true);
    }
  
    const allLettersGuessed = randomWord && randomWord.split("").every((char) =>
      buttonElements.find((btn) => btn.letter === char)?.correct
    );
  
    if (allLettersGuessed) {
      setGameWon(true);
    }
  }, [incorrectAttempts, buttonElements, randomWord]);
  

  const resetGame = () => {
    setRandomWord(getRandomWord());
    setButtonElements(lettersArray);
    setIncorrectAttempts(0);
    setGameOver(false);
    setGameWon(false);
  };
  console.log(randomWord)
  return (
    <div style={{ background: "#1a1a1a", color: "#fff", textAlign: "center", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "hidden", boxSizing: "border-box", padding: "20px" }}>
      <h1 style={{ margin: "10px 0" }}>Assembly: Endgame</h1>
      <p style={{ margin: "5px 0", maxWidth: "90%", textAlign: "center" }}>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", margin: "20px 0", maxWidth: "80%" }}>
        {tags.map((tag) => (
          <span key={tag.name} style={{ background: tag.color, color: tag.textColor || "#fff", padding: "5px 10px", borderRadius: "5px", fontWeight: "bold", fontSize: "14px" }}>{tag.name}</span>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap:"wrap", justifyContent: "center", gap: "10px", margin: "20px 0" }}>
        {randomWord.split("").map((char, index) => {
          const guessed = buttonElements.find((btn) => btn.letter === char)?.correct;
          return <div key={index} style={{ width: "40px", height: "40px", border: "2px solid #fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", fontWeight: "bold" }}>{guessed ? char : ""}</div>;
        })}
      </div>

      <p>Incorrect Attempts: {incorrectAttempts} / 8</p>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", maxWidth: "400px", gap: "10px" }}>
        {buttonElements.map((letter) => (
          <ButtonElement key={letter.id} updateButtonElement={updateButtonElement} letter={letter} />
        ))}
      </div>

      {gameWon && (
  <button 
    onClick={resetGame} 
    style={{
      marginTop: "20px", 
      padding: "10px 20px", 
      fontSize: "16px", 
      fontWeight: "bold", 
      background: "#28A745", // Green for success
      color: "#fff", 
      border: "none", 
      cursor: "pointer", 
      borderRadius: "5px"
    }}>
    New Game
  </button>
)}

    </div>
  );
};

export default App;
