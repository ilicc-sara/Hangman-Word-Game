import React, { useState } from "react";
const wordToGuess = "SARA MALA CIGANKA";

const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function App() {
  const [word, setWord] = useState(wordToGuess);
  const [guessedLetters, setGuessedLetters] = useState([]);

  function handleGuess(letter) {
    setGuessedLetters((prev) => {
      return [...prev, letter];
    });
  }
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <p className="word">
        {" "}
        {word.split("").map((letter) => {
          if (letter !== " ") {
            return guessedLetters.includes(letter) ? letter : "_";
          } else return " ";
        })}{" "}
      </p>
      <br />
      <br />
      <br />
      <br />
      {/* ako guessLetters sadrzi ne slovo, disable dugme */}

      {alfabet.map((letter) => (
        <button className="btn" onClick={() => handleGuess(letter)}>
          {" "}
          {letter}{" "}
        </button>
      ))}
    </div>
  );
}
// uraditi: moze se odabrati kategorija (po 5 reci u 3 kategorije)
// staviti easy, medium, hard mode
// staviti na hard mode timer (1 min ima za pogoditi rec)
// animacija za slova

export default App;
