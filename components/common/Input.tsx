import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  name,
  error = "",
  className = "",
  required = false,
  ...props
}) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label htmlFor={name} className="block font-bold text-base mb-2">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        className={`input ${
          error ? "border-accent" : "focus:border-primary"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-accent font-bold mt-1 text-sm">{error}</p>}
    </div>
  );
};

export default Input;