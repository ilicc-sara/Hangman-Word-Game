import React from "react";

function CategoryBtn(props) {
  // prettier-ignore
  const { category, propertyName, handleClick, activeCategory, setActiveCategory } = props;
  return (
    <button
      className={`btn category-btn 
                  ${activeCategory === propertyName ? "active-category" : ""}
                  `}
      onClick={() => {
        setActiveCategory(propertyName);
        handleClick(propertyName);
      }}
    >
      {" "}
      {propertyName.toUpperCase()}{" "}
    </button>
  );
}

export default CategoryBtn;
