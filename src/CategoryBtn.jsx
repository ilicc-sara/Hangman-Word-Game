import React from "react";

function CategoryBtn(props) {
  // prettier-ignore
  const { category, propertyName, handleClick } = props;
  return (
    <button
      className={`btn category-btn 
                  ${category === propertyName ? "active-category" : ""}
                  `}
      onClick={() => handleClick(propertyName)}
    >
      {" "}
      {propertyName.toUpperCase()}{" "}
    </button>
  );
}

export default CategoryBtn;
