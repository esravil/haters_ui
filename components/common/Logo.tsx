import React from "react";

interface LogoProps {
  size?: 'default' | 'large'
  showDot?: boolean
}

/**
 * Reusable logo component with neo-brutalist styling
 */
const Logo: React.FC<LogoProps> = ({ size = "default", showDot = true }) => {
  // Increased text sizes for both default and large options
  const textSizeClass = size === "large" ? "text-6xl" : "text-5xl";

  return (
    <h1
      className={`${textSizeClass} font-black text-primary relative`}
      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "2px" }}
    >
      haters
      {showDot && (
        <span
          className="inline-block w-4 h-4 bg-accent border-3 border-base"
          style={{
            display: "inline-block",
            position: "relative",
            top: "0px",
            margin: "0 3px",
          }}
        ></span>
      )}
      me
    </h1>
  );
};

export default Logo;