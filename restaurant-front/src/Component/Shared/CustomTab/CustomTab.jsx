import React, { useState } from "react";

const CustomTab = ({ children }) => {
  // State to keep track of the active button
  const [activeButton, setActiveButton] = useState(null);

  // Function to handle button click
  const handleButtonClick = (index) => {
    setActiveButton(index); // Set the clicked button as active
  };

  return (
    <div className="flex space-x-4">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          onClick: () => handleButtonClick(index),
          className: `${
            activeButton === index
              ? " text-red-500 border-b-2 border-red-500"
              : " text-white"
          } ${child.props.className || ""}`,
        })
      )}
    </div>
  );
};

export default CustomTab;
