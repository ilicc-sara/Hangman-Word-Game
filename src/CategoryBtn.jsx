import React from "react";

function CategoryBtn(props) {
  return (
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
      {propertyName.replace(/([a-z])([A-Z])/g, "$1 $2").toUpperCase()}{" "}
    </button>
  );
}

export default CategoryBtn;
