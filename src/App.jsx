import { useState, useRef } from "react";
import "./App.css";
import Button from "./Button";
import CategoryBtn from "./CategoryBtn";
import ModeBtn from "./ModeBtn";
import WordToGuess from "./WordToGuess";
import { info } from "./data";

function App() {
  const [time, setTime] = useState(0);
  const [information] = useState(info);
  const [category, setCategory] = useState("");
  const [mode, setMode] = useState("easy");
  const [wordToGuess, setWordToGuess] = useState("");
  const [wrongGuess, setWrongGuess] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const propertyNames = Object.getOwnPropertyNames(information);
  const win = wordToGuess
    .split("")
    .filter((letter) => letter !== " ")
    .every((letter) => guessedLetters.includes(letter));
  const gameOver = wrongGuess === 6 || win;

  const randomNum = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  function handleGuess(letter) {
    if (!wordToGuess.includes(letter)) {
      setWrongGuess((prev) => (prev !== 6 ? prev + 1 : prev - 6));
    }
    setGuessedLetters((prev) => {
      return [...prev, letter];
    });
  }

  const timer = useRef(null);
  const timerFunction = function () {
    let time1 = 60;

    const tick = function () {
      time1--;

      let timeString = String(time1).padStart(2, 0);
      setTime(timeString);
      console.log(timeString);

      if (time1 === 0) {
        setWrongGuess(6);
        clearInterval(timer.current);
      }
    };

    tick();
    timer.current = setInterval(tick, 1000);
  };

  const stopTimer = function () {
    clearInterval(timer.current);
  };

  const procesedWordToGuess = wordToGuess.split("");

  function reset() {
    stopTimer();
    setCategory("");
    setWrongGuess(0);
    setGuessedLetters([]);
    setWordToGuess("");
  }

  function handleChangeCategory(propertyName) {
    setCategory(propertyName);
    const word =
      information[propertyName][
        randomNum(0, information[propertyName].length)
      ].toUpperCase();
    setWordToGuess(word);

    if (mode === "hard") {
      timerFunction();
    }
  }

  function chooseCategoryAndMode() {
    stopTimer();
    setCategory("");
  }

  const getGameOverDisplayMessage = () => `YOU ${win ? "WON" : "LOST"}...`;

  return (
    <>
      <nav>
        <p className="heading">Hangman. Do (or) Die</p>
        <p className="wrong-guesses">Guessed wrong: {wrongGuess}</p>

        {mode === "hard" && !gameOver ? (
          <p className="timer-text"> Time left: 00:{time} </p>
        ) : (
          ""
        )}

        <button
          className="btn category-btn"
          onClick={() => chooseCategoryAndMode()}
        >
          Change Category
        </button>
      </nav>

      {!category && (
        <div className="overlay">
          <h2>Chose Mode:</h2>

          <div className="mode-container">
            <ModeBtn mode={mode} setMode={setMode} name={"easy"} />
            <ModeBtn mode={mode} setMode={setMode} name={"hard"} />
          </div>

          <h2>Chose Category:</h2>

          <div className="category-container">
            {propertyNames.map((propertyName, index) => (
              <CategoryBtn
                key={index}
                propertyName={propertyName}
                category={category}
                wordToGuess={wordToGuess}
                handleClick={handleChangeCategory}
              />
            ))}
          </div>
        </div>
      )}

      <main>
        <div>
          <img className="image" src={`./${wrongGuess}wrongGuess.jpeg`} />

          <p className="text">{`Guess the ${category.toUpperCase()}:`}</p>

          {gameOver && <p className="word"> {wordToGuess} </p>}
          {!gameOver && (
            <WordToGuess
              procesedWordToGuess={procesedWordToGuess}
              guessedLetters={guessedLetters}
            />
          )}
          {gameOver && (
            <p className="game-over-text"> {getGameOverDisplayMessage()} </p>
          )}
        </div>

        {!gameOver && (
          <div className="letter-buttons">
            {alphabet.map((letter, index) => (
              <Button
                key={index}
                variation={"letterBtn"}
                letter={letter}
                isClicked={letter.isClicked}
                disabled={guessedLetters.includes(letter)}
                handleClick={() => {
                  handleGuess(letter);
                }}
              />
            ))}
          </div>
        )}
        <button className="reset-btn btn" onClick={() => reset()}>
          Reset
        </button>
      </main>
    </>
  );
}

export default App;
