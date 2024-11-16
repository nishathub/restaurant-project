import React, { useState } from "react";

const CustomTab = ({ children, setDisplayMenuItems}) => {
  // State to keep track of the active button
  const [activeButton, setActiveButton] = useState(null);

  // Function to handle button click
  const handleButtonClick = (index, item) => {
    setActiveButton(index); // Set the clicked button as active
    setDisplayMenuItems(item);
  };

  return (
    <div className="flex space-x-4">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          onClick: () => handleButtonClick(index, child.props.item),
          className: `${
            activeButton === index
              ? " text-red-500 border-b-2 border-red-500"
              : " text-black"
          } ${child.props.className || ""}`,
        })
      )}
    </div>
  );
};

export default CustomTab;
