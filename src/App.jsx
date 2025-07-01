import { useState, useEffect, useRef } from "react";
import "./App.css";
import Button from "./Button";
import { createWebSocketModuleRunnerTransport } from "vite/module-runner";
import CategoryBtn from "./CategoryBtn";

function App() {
  const info = {
    // prettier-ignore
    movies: ["The Godfather","Titanic","Inception","Gladiator","Casablanca","Psycho","Avatar","Jaws","Frozen",],

    // prettier-ignore
    tvShows: ["Breaking Bad","South Park","Game of Thrones","Bridgertons","The Sopranos","Friends","The Office","Sherlock","Black Mirror","The Crown","Westworld",],

    // prettier-ignore
    countries: ["Australia","Brazil","Canada","Egypt","France","Germany","Hungary","India",],

    // prettier-ignore
    animals: ["Elephant","Lion","Penguin","Dolphin","Tiger","Panda","Zebra","Polar Bear",],
  };

  const randomNum = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const [time, setTime] = useState(0);

  const [information, setInformation] = useState(info);

  const propertyNames = Object.getOwnPropertyNames(information);
  console.log(propertyNames);

  const category = useRef(propertyNames[0]);

  const [mode, setMode] = useState("easy");

  const wordToGuess = useRef(
    information[category.current][
      randomNum(0, information.movies.length)
    ].toUpperCase()
  );

  const [play, setPlay] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);

  function handleGuess(letter) {
    if (!wordToGuess.current.includes(letter)) {
      setWrongGuess((prev) => (prev !== 6 ? prev + 1 : prev - 6));
    }
    setGuessedLetters((prev) => {
      return [...prev, letter];
    });
  }

  const unique = [
    ...new Set(
      wordToGuess.current.split("").filter((letter) => letter !== " ")
    ),
  ];

  const win = unique.every((letter) => guessedLetters.includes(letter));

  let gameOver = wrongGuess === 6 || win;

  function reset() {
    setPlay(false);
    setWrongGuess(0);
    setGuessedLetters([]);
    wordToGuess.current =
      information.movies[
        randomNum(0, information[category.current].length)
      ].toUpperCase();
  }

  ///////////////////////////////////////////////////////////////////////
  // Timer Functioin
  let timer;
  const timerFunction = function () {
    let time = 60;

    const tick = function () {
      time--;

      let timeString = String(time).padStart(2, 0);
      setTime(timeString);

      console.log(time);

      if (time === 0) {
        clearInterval(timer);
      }
    };

    tick();
    timer = setInterval(tick, 1000);
  };
  ///////////////////////////////////////////////////////////////////////
  return (
    <>
      <nav>
        <p className="heading">Hangman. Do (or) Die</p>
        <p className="wrong-guesses">Guessed wrong: {wrongGuess}</p>
        {mode === "difficult" && !gameOver ? (
          <p className="timer-text"> Time left: 00:{time} </p>
        ) : (
          ""
        )}
        <button
          className="btn category-btn"
          onClick={() => {
            setPlay(false);
            reset();
          }}
        >
          Change Category
        </button>
      </nav>

      {!play && (
        <div className="overlay">
          <h2>Chose Mode:</h2>

          <div className="mode-container">
            <button
              className={`btn mode-btn ${
                mode === "easy" ? "active-mode" : ""
              } `}
              onClick={() => {
                setMode("easy");
              }}
            >
              Easy
            </button>
            <button
              className={`btn mode-btn ${mode !== "easy" ? "active-mode" : ""}`}
              onClick={() => setMode("difficult")}
            >
              Difficult
            </button>
          </div>

          <h2>Chose Category:</h2>

          <div className="category-container">
            {propertyNames.map((propertyName, index) => (
              <CategoryBtn key={index}>{propertyName}</CategoryBtn>
            ))}
          </div>

          <button
            className="btn category-btn"
            onClick={() => {
              if (mode === "difficult") {
                timerFunction();
              }
              setPlay(true);
            }}
          >
            Play
          </button>
        </div>
      )}

      <main>
        <div>
          <img className="image" src={`./${wrongGuess}wrongGuess.jpeg`} />

          <p className="text">{`Guess the ${category.current
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .toUpperCase()
            .slice(0, -1)}:`}</p>

          <p className="word"> {wordToGuess.current} </p>
          {/* {gameOver && <p className="word"> {wordToGuess.current} </p>} */}
          {!gameOver && (
            <p className="word">
              {" "}
              {wordToGuess.current.split("").map((letter) => {
                if (letter !== " ") {
                  return guessedLetters.includes(letter) ? (
                    <span className="guessed-letter">{letter}</span>
                  ) : (
                    "_"
                  );
                } else return " ";
              })}{" "}
            </p>
          )}
          {gameOver && (
            <p className="game-over-text">
              {" "}
              {/* get gameoverdisplaymessage */}
              {`YOU ${win ? "WON" : "LOST"}...`}{" "}
            </p>
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
