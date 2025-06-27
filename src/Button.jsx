import React from "react";

function Button(props) {
  const { variation, letter, isClicked, handleClick } = props;

  const baseClassName = "btn";

  let modifierClassName;

  if (variation === "letterBtn") {
    modifierClassName = "letter-btn";
  }

  return (
    <button
      className={`${baseClassName} ${modifierClassName} ${
        isClicked ? "clicked" : ""
      }`}
      disabled={isClicked}
      onClick={() => handleClick(letter)}
    >
      {" "}
      {letter}{" "}
    </button>
  );
}

export default Button;
