import React from "react";

function ModeBtn(props) {
  const { mode, setMode, name } = props;

  let modifierClassName;

  if (mode === name) {
    modifierClassName = "active-mode";
  }

  return (
    <button
      className={`btn mode-btn ${modifierClassName}`}
      onClick={() => {
        setMode(name);
      }}
    >
      {name.toUpperCase()}
    </button>
  );
}

export default ModeBtn;
