import { useState, useEffect, useRef } from "react";
import "./App.css";
import Button from "./Button";
import { createWebSocketModuleRunnerTransport } from "vite/module-runner";

function App() {
  const info = {
    // prettier-ignore
    movies: [{name: "The Godfather", selected: false, }, {name: "Titanic", selected: false,},{name: "Inception",selected: false,}, 
             {name: "Gladiator", selected: false,}, {name: "Casablanca", selected: false,}, {name: "Psycho", selected: false,},
             {name: "Avatar", selected: false,}, {name: "Jaws", selected: false,}, {name: "Frozen", selected: false,},
             {name: "The Matrix", selected: false, }, {name: "Braveheart", selected: false,},
             {name: "Fight Club", selected: false,},
             {name: "The Lion King", selected: false,},
             {name: "Blade Runner", selected: false,}, {name: "Star Wars", selected: false,}, 
             {name: "The Big Lebowski", selected: false,}, 
             {name: "Toy Story", selected: false,}, {name: "Alien", selected: false,}, 
             {name: "Interstellar", selected: false,}, {name: "La La Land", selected: false,}, 
            ],

    // prettier-ignore
    tvShows: [{name: "Breaking Bad", selected: false,}, {name: "South Park", selected: false,}, {name: "Game of Thrones",selected: false,}, 
              {name: "Bridgertons", selected: false,}, {name: "The Sopranos", selected: false,}, 
              {name: "Friends", selected: false,}, {name: "The Office", selected: false,}, {name: "Sherlock", selected: false,}, 
              {name: "Black Mirror", selected: false,}, {name: "The Crown", selected: false,}, {name: "Westworld", selected: false,}, 
              {name: "Better Call Saul", selected: false,}, {name: "The Simpsons", selected: false,}, 
              {name: "Arrested Development", selected: false,}, {name: "Succession", selected: false,},
              {name: "Mad Men", selected: false,}, {name: "Dexter", selected: false,}, 
              {name: "Rick and Morty", selected: false,}, {name: "Lost", selected: false,}, {name: "Doctor Who", selected: false,}, 
              {name: "The Walking Dead", selected: false,}, {name: "Peaky Blinders", selected: false,}, 
              {name: "Buffy the Vampire Slayer", selected: false,}, {name: "The Big Bang Theory", selected: false,}, 
              {name: "True Detective", selected: false,}, 
             ],

    // prettier-ignore
    countries: [{name: "Australia", selected: false,}, {name: "Brazil", selected: false,}, {name: "Canada", selected: false,}, 
                {name: "Egypt", selected: false,}, {name: "France", selected: false,}, 
                {name: "Germany", selected: false,}, {name: "Hungary", selected: false,}, {name: "India", selected: false,}, 
                {name: "Japan", selected: false,}, {name: "Kenya", selected: false,},
                {name: "Mexico", selected: false,}, 
                {name: "Peru", selected: false,}, {name: "Qatar", selected: false,}, {name: "Russia", selected: false,}, 
                {name: "Spain", selected: false,}, {name: "Thailand", selected: false,}, {name: "United Kingdom", selected: false,}, 
                {name: "Italy", selected: false,},
                {name: "China", selected: false,}, {name: "South Africa", selected: false,}, {name: "New Zealand", selected: false,}, 
                {name: "Argentina", selected: false,}, {name: "Chile", selected: false,}, 
              ],

    // prettier-ignore
    animals: [{name: "Elephant", selected: false,}, {name: "Lion", selected: false,}, {name: "Penguin", selected: false,}, 
              {name: "Dolphin", selected: false,}, {name: "Tiger", selected: false,}, {name: "Panda", selected: false,}, 
              {name: "Zebra", selected: false,}, {name: "Polar Bear", selected: false,}, {name: "Cheetah", selected: false,}, 
              {name: "Buffalo", selected: false,}, {name: "Koala", selected: false,}, {name: "Gorilla", selected: false,}, 
              {name: "Flamingo", selected: false,}, {name: "Peacock", selected: false,}, {name: "Jaguar", selected: false,}, 
              {name: "Leopard", selected: false,}, {name: "Wolf", selected: false,}, {name: "Bald Eagle", selected: false,}, 
              {name: "Owl", selected: false,}, {name: "Frog", selected: false,}, {name: "Octopus", selected: false,},  
             ],
  };

  const randomNum = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
    return { letter, isClicked: false };
  });

  const [time, setTime] = useState(0);

  const [information, setInformation] = useState(info);

  const propertyNames = Object.getOwnPropertyNames(information);

  const [alphabet, setAlphabet] = useState(alfabet);

  const category = useRef(propertyNames[0]);

  const [mode, setMode] = useState("easy");

  const wordToGuess = useRef(
    information[category.current][
      randomNum(0, information.movies.length)
    ].name.toUpperCase()
  );

  const [play, setPlay] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState([]);

  function changeBtnState(letter) {
    setAlphabet((prev) => {
      return prev.map((btn) => {
        if (btn.letter === letter) {
          return { ...btn, isClicked: true };
        } else return btn;
      });
    });
  }

  function handleGuess(letter) {
    changeBtnState(letter);
    if (wordToGuess.current.includes(letter)) {
      setGuessedLetters((prev) => {
        return [...prev, letter];
      });
    } else {
      setWrongGuess((prev) => (prev !== 6 ? prev + 1 : prev - 6));
    }
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
    setAlphabet((prev) => {
      return prev.map((btn) => {
        return { ...btn, isClicked: false };
      });
    });
    wordToGuess.current =
      information.movies[
        randomNum(0, information[category.current].length)
      ].name.toUpperCase();
  }

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
    const timer = setInterval(tick, 1000);
  };

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
              <button
                key={index}
                className={`btn category-btn 
                  ${category.current === propertyName ? "active-category" : ""}
                  `}
                onClick={(e) => {
                  category.current = propertyName;
                  wordToGuess.current =
                    information[category.current][
                      randomNum(0, information[category.current].length)
                    ].name.toUpperCase();
                  document
                    .querySelectorAll(".category-btn")
                    .forEach((btn) => btn.classList.remove("active-category"));
                  e.target.classList.contains("category-btn")
                    ? e.target.classList.add("active-category")
                    : e.target;
                }}
              >
                {" "}
                {propertyName
                  .replace(/([a-z])([A-Z])/g, "$1 $2")
                  .toUpperCase()}{" "}
              </button>
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
          {!gameOver && (
            <p className="word">
              {" "}
              {wordToGuess.current.split("").map((letter) => {
                if (letter !== " ") {
                  return guessedLetters.includes(letter) ? (
                    <p className="guessed-letter">{letter}</p>
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
                letter={letter.letter}
                isClicked={letter.isClicked}
                handleClick={() => {
                  handleGuess(letter.letter);
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
