import { useState } from "react";
import "./App.css";
import Button from "./Button";
import CategoryBtn from "./CategoryBtn";
import ModeBtn from "./ModeBtn";
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

  // Timer Functioin
  let timer = null;
  const timerFunction = function () {
    let time1 = 60;

    const tick = function () {
      time1--;

      let timeString = String(time1).padStart(2, 0);
      setTime(timeString);

      // console.log("timeString", timeString);
      // console.log("stejt time", time);
      // console.log("time unutar funkcije", time1);

      if (time1 === 0) {
        clearInterval(timer);
      }
    };

    tick();
    timer = setInterval(tick, 1000);
  };
  // console.log("stejt time u global scope", time);

  const stopTimer = function () {
    setTime(0);
    clearInterval(timer);
  };

  const procesedWordToGuess = wordToGuess.split("");
  // .filter((letter) => letter !== " ");

  function reset() {
    setCategory("");
    setWrongGuess(0);
    setGuessedLetters([]);
    setWordToGuess("");
  }

  function handleChangeCategory(propertyName) {
    stopTimer();
    setCategory(propertyName);
    const word =
      information[propertyName][
        randomNum(0, information[propertyName].length)
      ].toUpperCase();
    setWordToGuess(word);

    if (mode === "hard") {
      stopTimer();
      timerFunction();
    }
  }

  function chooseCategoryAndMode() {
    stopTimer();
    setCategory("");
  }

  const getGameOverDisplayMessage = () => `YOU ${win ? "WON" : "LOST"}...`;

  // function displaySettingCategory() {
  //   setPlay(false);
  //   reset();
  // }
  // function displayTimer() {} // 141
  // function generateHiddenLetter(letter) {} // 197

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

          {/* <button className="btn category-btn" onClick={() => startGame()}>
            Play
          </button> */}
        </div>
      )}

      <main>
        <div>
          <img className="image" src={`./${wrongGuess}wrongGuess.jpeg`} />

          <p className="text">{`Guess the ${category.toUpperCase()}:`}</p>

          <p className="word"> {wordToGuess} </p>
          {/* {gameOver && <p className="word"> {wordToGuess.current} </p>} */}
          {!gameOver && (
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
// smanjiti app.jsx (podeliti na komponente)
// smanjiti imperativno programiranje (funkcije)
// alfabet ne mora biti stejt
// umesto querySelectorAll za kategorije napraviti pojedinacnu komponentu sa svojim stejtom
// clear interval
