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
             {name: "The Matrix", selected: false, }, {name: "Goodfellas", selected: false,}, {name: "Braveheart", selected: false,},
             {name: "Fight Club", selected: false,}, {name: "Pulp Fiction", selected: false,}, {name: "Forrest Gump", selected: false,}, 
             {name: "The Lion King", selected: false,}, {name: "Back to the Future", selected: false,}, {name: "Jurassic Park", selected: false,}, 
             {name: "Blade Runner", selected: false,}, {name: "Star Wars", selected: false,}, {name: "The Dark Knight", selected: false,}, 
             {name: "The Big Lebowski", selected: false,}, {name: "The Wizard of Oz", selected: false,}, {name: "Schindler's List", selected: false,}, 
             {name: "Toy Story", selected: false,}, {name: "The Silence of the Lambs", selected: false,}, {name: "Alien", selected: false,}, 
             {name: "Interstellar", selected: false,}, {name: "Raiders of the Lost Ark", selected: false,}, {name: "La La Land", selected: false,}, 
            ],

    // prettier-ignore
    tvShows: [{name: "Breaking Bad", selected: false,}, {name: "South Park", selected: false,}, {name: "Game of Thrones",selected: false,}, 
              {name: "Stranger Things", selected: false,}, {name: "Bridgertons", selected: false,}, {name: "The Sopranos", selected: false,}, 
              {name: "Friends", selected: false,}, {name: "The Office", selected: false,}, {name: "Sherlock", selected: false,}, 
              {name: "Black Mirror", selected: false,}, {name: "The Crown", selected: false,}, {name: "Westworld", selected: false,}, 
              {name: "Better Call Saul", selected: false,}, {name: "Orange Is the New Black", selected: false,}, {name: "The Simpsons", selected: false,}, 
              {name: "Arrested Development", selected: false,}, {name: "Succession", selected: false,}, {name: "Fargo", selected: false,}, 
              {name: "Mad Men", selected: false,}, {name: "The West Wing", selected: false,}, {name: "Dexter", selected: false,}, 
              {name: "Rick and Morty", selected: false,}, {name: "Lost", selected: false,}, {name: "Doctor Who", selected: false,}, 
              {name: "The Walking Dead", selected: false,}, {name: "Peaky Blinders", selected: false,}, 
              {name: "Buffy the Vampire Slayer", selected: false,}, {name: "The Big Bang Theory", selected: false,}, 
              {name: "Curb Your Enthusiasm", selected: false,}, {name: "Ted Lasso", selected: false,}, {name: "True Detective", selected: false,}, 
             ],

    // prettier-ignore
    countries: [{name: "Australia", selected: false,}, {name: "Brazil", selected: false,}, {name: "Canada", selected: false,}, 
                {name: "Denmark", selected: false,}, {name: "Egypt", selected: false,}, {name: "France", selected: false,}, 
                {name: "Germany", selected: false,}, {name: "Hungary", selected: false,}, {name: "India", selected: false,}, 
                {name: "Japan", selected: false,}, {name: "Kenya", selected: false,}, {name: "Luxembourg", selected: false,}, 
                {name: "Mexico", selected: false,}, {name: "Netherlands", selected: false,}, {name: "Oman", selected: false,}, 
                {name: "Peru", selected: false,}, {name: "Qatar", selected: false,}, {name: "Russia", selected: false,}, 
                {name: "Spain", selected: false,}, {name: "Thailand", selected: false,}, {name: "United Kingdom", selected: false,}, 
                {name: "Vietnam", selected: false,}, {name: "Italy", selected: false,}, {name: "United States", selected: false,}, 
                {name: "China", selected: false,}, {name: "South Africa", selected: false,}, {name: "New Zealand", selected: false,}, 
                {name: "Argentina", selected: false,}, {name: "Belgium", selected: false,}, {name: "Chile", selected: false,}, 
              ],

    // prettier-ignore
    capitalCities: [{name: "Tokyo", selected: false,}, {name: "Paris", selected: false,}, {name: "London", selected: false,}, 
                    {name: "Kuala Lumpur", selected: false,}, {name: "Berlin", selected: false,}, {name: "Ottawa", selected: false,}, 
                    {name: "Canberra", selected: false,}, {name: "Moscow", selected: false,}, {name: "Beijing", selected: false,}, 
                    {name: "New Delhi", selected: false,}, {name: "Copenhagen", selected: false,}, {name: "Cairo", selected: false,}, 
                    {name: "Madrid", selected: false,}, {name: "Rome", selected: false,}, {name: "Buenos Aires", selected: false,}, 
                    {name: "Bangkok", selected: false,}, {name: "Vienna", selected: false,}, {name: "Seoul", selected: false,}, 
                    {name: "Jakarta", selected: false,}, {name: "Lisbon", selected: false,}, {name: "Riyadh", selected: false,}, 
                    {name: "Helsinki", selected: false,}, {name: "Oslo", selected: false,}, {name: "Stockholm", selected: false,}, 
                    {name: "Athens", selected: false,}, {name: "Dublin", selected: false,}, {name: "Prague", selected: false,}, 
                    {name: "Budapest", selected: false,}, {name: "Warsaw", selected: false,}, {name: "Amsterdam", selected: false,}, 
                  ],

    // prettier-ignore
    animals: [{name: "Elephant", selected: false,}, {name: "Lion", selected: false,}, {name: "Giraffe", selected: false,}, {name: "Penguin", selected: false,}, 
              {name: "Dolphin", selected: false,}, {name: "Tiger", selected: false,}, {name: "Kangaroo", selected: false,}, {name: "Panda", selected: false,}, 
              {name: "Zebra", selected: false,}, {name: "Polar Bear", selected: false,}, {name: "Cheetah", selected: false,}, {name: "Rhino", selected: false,}, 
              {name: "Buffalo", selected: false,}, {name: "Koala", selected: false,}, {name: "Gorilla", selected: false,}, {name: "Chimpanzee", selected: false,}, 
              {name: "Crocodile", selected: false,}, {name: "Flamingo", selected: false,}, {name: "Peacock", selected: false,}, {name: "Jaguar", selected: false,}, 
              {name: "Leopard", selected: false,}, {name: "Wolf", selected: false,}, {name: "Fox", selected: false,}, {name: "Bald Eagle", selected: false,}, 
              {name: "Owl", selected: false,}, {name: "Frog", selected: false,}, {name: "Shark", selected: false,}, {name: "Octopus", selected: false,}, 
              {name: "Turtle", selected: false,}, {name: "Snake", selected: false,}, 
             ],

    //  prettier-ignore
    sports: [{name: "Soccer", selected: false,}, {name: "Basketball", selected: false,}, {name: "Tennis", selected: false,}, 
             {name: "Baseball", selected: false,}, {name: "Rock Climbing", selected: false,}, {name: "Swimming", selected: false,}, 
             {name: "Volleyball", selected: false,}, {name: "Table Tennis", selected: false,}, {name: "Badminton", selected: false,}, 
             {name: "Rugby", selected: false,}, {name: "Cricket", selected: false,}, {name: "Hockey", selected: false,}, 
             {name: "Boxing", selected: false,}, {name: "Martial Arts", selected: false,}, {name: "Fencing", selected: false,}, 
             {name: "Archery", selected: false,}, {name: "Skiing", selected: false,}, {name: "Bobsleigh", selected: false,}, 
             {name: "Cycling", selected: false,}, {name: "Curling", selected: false,}, {name: "Surfing", selected: false,}, 
             {name: "Diving", selected: false,}, {name: "Gymnastics", selected: false,}, {name: "Athletics", selected: false,}, 
             {name: "Rowing", selected: false,}, {name: "Sailing", selected: false,}, {name: "Canoeing", selected: false,}, 
             {name: "Ice Hockey", selected: false,}, {name: "Triathlon", selected: false,}, {name: "American Football", selected: false,},
            ],

    // prettier-ignore
    minecraft: [{name: "Creeper", selected: false,}, {name: "Steve", selected: false,}, {name: "Enderman", selected: false,}, {name: "Zombie", selected: false,}, 
                {name: "Diamond", selected: false,}, {name: "Redstone", selected: false,}, {name: "Lush Cave", selected: false,}, {name: "Pickaxe", selected: false,}, 
                {name: "Crafting Table", selected: false,}, {name: "Ender Dragon", selected: false,}, {name: "Nether", selected: false,}, {name: "Ghast", selected: false,}, 
                {name: "Blaze", selected: false,}, {name: "Villager", selected: false,}, {name: "Ender Pearl", selected: false,}, {name: "Obsidian", selected: false,}, 
                {name: "Enchantment Table", selected: false,}, {name: "Nether Portal", selected: false,}, {name: "Armadillo", selected: false,},  
                {name: "Sniffer", selected: false,}, {name: "Trial Chamber", selected: false,}, {name: "Cherry Grove", selected: false,}, {name: "Vault", selected: false,}, 
                {name: "Ominous bottle", selected: false,}, {name: "Woodland mansion", selected: false,}, {name: "Wind charge", selected: false,}, 
                {name: "Fire aspect", selected: false,}, {name: "Orange terracotta", selected: false,}, {name: "Minecraft", selected: false,}, 
              ],
  };

  const randomNum = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
    return { letter, isClicked: false };
  });

  const [information, setInformation] = useState(info);

  const propertyNames = Object.getOwnPropertyNames(information);

  const [alphabet, setAlphabet] = useState(alfabet);

  const category = useRef(propertyNames[0]);

  const wordToGuess = useRef(
    information[category.current][
      randomNum(0, information.movies.length)
    ].name.toUpperCase()
  );

  const [play, setPlay] = useState(false);

  const [wrongGuess, setWrongGuess] = useState(0);
  const [word, setWord] = useState(wordToGuess);
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

  const gameOver = wrongGuess === 6 || win;

  function reset() {
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

  // const sara = "sara"
  //   .replace(/([a-z])([A-Z])/g, "$1 $2")
  //   .toLowerCase();

  // const sara1 = sara.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();

  // console.log(sara);

  return (
    <>
      <nav>
        <p className="heading">Hangman. Do (or) Die</p>
        <p className="wrong-guesses">Guessed wrong: {wrongGuess}</p>
        <button className="btn category-btn" onClick={() => setPlay(false)}>
          Change category
        </button>
      </nav>

      {!play && (
        <div className="overlay">
          <h2>Chose Category:</h2>
          {propertyNames.map((propertyName) => (
            <button
              className="btn category-btn"
              onClick={() => {
                category.current = propertyName;
                wordToGuess.current =
                  information[category.current][
                    randomNum(0, information[category.current].length)
                  ].name.toUpperCase();
              }}
            >
              {" "}
              {propertyName
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .toUpperCase()}{" "}
            </button>
          ))}

          <button className="btn category-btn" onClick={() => setPlay(true)}>
            Play
          </button>
        </div>
      )}

      <main>
        <div>
          <img className="image" src={`./${wrongGuess}wrongGuess.jpeg`} />

          <p className="text">Guess the movie:</p>

          <p className="word"> {wordToGuess.current} </p>
          {!gameOver && (
            <p className="word">
              {" "}
              {wordToGuess.current
                .split("")
                .filter((letter) => letter !== "'")
                .map((letter) => {
                  if (letter !== " ") {
                    return guessedLetters.includes(letter) ? letter : "_";
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
                // className={"letter-btn btn"}
                letter={letter.letter}
                isClicked={letter.isClicked}
                handleClick={() => {
                  handleGuess(letter.letter);
                }}
              />
              // <button
              //   className="btn letter-btn"
              //   onClick={() => handleGuess(letter.letter)}
              // >
              //   {" "}
              //   {letter.letter}{" "}
              // </button>
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
