import React from "react";

interface DecorativeElement {
  position: string;
  size: string;
  color: string;
  rotation?: string;
}

interface DecorativeElementsProps {
  elements: DecorativeElement[];
}

const DecorativeElements: React.FC<DecorativeElementsProps> = ({ elements }) => {
  return (
    <>
      {elements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.position} hidden md:block`}
        >
          <div
            className={`w-${element.size} h-${element.size} ${element.color} border-3 border-base ${element.rotation || ''}`}
          ></div>
        </div>
      ))}
    </>
  );
};

export default DecorativeElements;