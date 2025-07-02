import React from "react";

function WordToGuess(props) {
  const { procesedWordToGuess, guessedLetters } = props;

  return (
    <p className="word">
      {procesedWordToGuess.map((letter, index) => {
        if (letter !== " ") {
          return guessedLetters.includes(letter) ? (
            <span key={index} className="guessed-letter">
              {letter}
            </span>
          ) : (
            <span key={index}>_</span>
          );
        } else return " ";
      })}
    </p>
  );
}

export default WordToGuess;
