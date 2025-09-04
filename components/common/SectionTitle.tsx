import React from "react";

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
}

/**
 * Reusable section title component with underline
 */
const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = "" }) => {
  return (
    <h2 className={`section-title ${className}`}>
      {children}
      <div className="section-title-underline"></div>
    </h2>
  );
};

export default SectionTitle;