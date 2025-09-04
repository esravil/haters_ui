import React from "react";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = "medium",
  fullScreen = false,
  text = "Loading...",
}) => {
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    medium: "w-10 h-10 border-3",
    large: "w-16 h-16 border-4",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-background bg-opacity-80 z-50"
    : "flex flex-col items-center justify-center py-4";

  return (
    <div className={containerClasses}>
      <div
        className={`${sizeClasses[size]} rounded-full border-primary border-t-transparent animate-spin`}
      ></div>
      {text && <p className="mt-4 font-bold text-base">{text}</p>}
    </div>
  );
};

export default Loader;