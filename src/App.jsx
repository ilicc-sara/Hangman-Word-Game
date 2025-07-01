import { useState, useEffect, useRef } from "react";
import "./App.css";
import Button from "./Button";
import CategoryBtn from "./CategoryBtn";
import ModeBtn from "./ModeBtn";

function App() {
  const info = {
    // prettier-ignore
    movie: ["The Godfather","Titanic","Inception","Gladiator","Casablanca","Psycho","Avatar","Jaws","Frozen",],

    // prettier-ignore
    tvShow: ["Breaking Bad","South Park","Game of Thrones","Bridgertons","The Sopranos","Friends","The Office","Sherlock","Black Mirror","The Crown","Westworld",],

    // prettier-ignore
    country: ["Australia","Brazil","Canada","Egypt","France","Germany","Hungary","India",],

    // prettier-ignore
    animal: ["Elephant","Lion","Penguin","Dolphin","Tiger","Panda","Zebra","Polar Bear",],
  };

  const randomNum = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const [time, setTime] = useState(0);

  const [information, setInformation] = useState(info);

  const propertyNames = Object.getOwnPropertyNames(information);
  console.log(propertyNames);

  let category = useRef(propertyNames[0]);

  const [activeCategory, setActiveCategory] = useState(category);

  const [mode, setMode] = useState("easy");

  const generateWordToGuess =
    information[category.current][
      randomNum(0, information.movie.length)
    ].toUpperCase();

  const wordToGuess = useRef(generateWordToGuess);

  const [play, setPlay] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);

  const unique = [
    ...new Set(
      wordToGuess.current.split("").filter((letter) => letter !== " ")
    ),
  ];

  const win = unique.every((letter) => guessedLetters.includes(letter));

  let checkGameOver = wrongGuess === 6 || win;
  const [gameOver, setGameOver] = useState(checkGameOver);

  function handleGuess(letter) {
    if (!wordToGuess.current.includes(letter)) {
      setWrongGuess((prev) => (prev !== 6 ? prev + 1 : prev - 6));
    }
    setGuessedLetters((prev) => {
      return [...prev, letter];
    });
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
        setGameOver(true);
      }
    };

    tick();
    timer = setInterval(tick, 1000);
  };
  ///////////////////////////////////////////////////////////////////////

  function reset() {
    setPlay(false);
    setWrongGuess(0);
    setGuessedLetters([]);
    wordToGuess.current =
      information.movie[
        randomNum(0, information[category.current].length)
      ].toUpperCase();
    if (mode === "hard") {
      clearInterval(timer);
    }
  }

  function handleChangeCategory(propertyName) {
    category.current = propertyName;
    wordToGuess.current =
      information[category.current][
        randomNum(0, information[category.current].length)
      ].toUpperCase();

    setActiveCategory(propertyName);
  }

  function displaySettingCategory() {
    setPlay(false);
    reset();
  }

  const getGameOverDisplayMessage = () => `YOU ${win ? "WON" : "LOST"}...`;

  function startGame() {
    if (mode === "hard") {
      timerFunction();
    }
    setPlay(true);
  }

  function displayTimer() {} // 141
  function generateHiddenLetter(letter) {} // 197

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
          onClick={() => displaySettingCategory()}
        >
          Change Category
        </button>
      </nav>

      {!play && (
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
                category={category.current}
                wordToGuess={wordToGuess.current}
                handleClick={handleChangeCategory}
              />
            ))}
          </div>

          <button className="btn category-btn" onClick={() => startGame()}>
            Play
          </button>
        </div>
      )}

      <main>
        <div>
          <img className="image" src={`./${wrongGuess}wrongGuess.jpeg`} />

          <p className="text">{`Guess the ${category.current.toUpperCase()}:`}</p>

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
