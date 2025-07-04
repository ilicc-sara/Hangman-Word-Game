import React from "react";

function Image({ wrongGuess }) {
  return (
    <img
      className="image"
      src={`/assets/${wrongGuess}wrongGuess.jpeg`}
      alt="wrong guess"
    />
  );
}

export default Image;
