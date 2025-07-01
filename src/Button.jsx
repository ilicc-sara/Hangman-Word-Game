import React from "react";

function Button(props) {
  const { variation, letter, disabled, handleClick } = props;

  const baseClassName = "btn";

  let modifierClassName;

  if (variation === "letterBtn") {
    modifierClassName = "letter-btn";
  }

  return (
    <button
      className={`${baseClassName} ${modifierClassName} ${
        disabled ? "clicked" : ""
      }`}
      disabled={disabled}
      onClick={() => handleClick(letter)}
    >
      <span className="word-text">{letter} </span>
    </button>
  );
}

export default Button;
