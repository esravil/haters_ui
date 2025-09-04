import React, { useState, useEffect } from "react";

interface AlertProps {
  type?: "info" | "success" | "error" | "warning";
  message: string;
  isVisible?: boolean;
  autoClose?: boolean;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  type = "info",
  message,
  isVisible = true,
  autoClose = false,
  duration = 5000,
  onClose,
  className = "",
}) => {
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    setVisible(isVisible);

    let timer: NodeJS.Timeout;
    if (autoClose && isVisible) {
      timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, duration, onClose]);

  if (!visible) return null;

  const typeStyles = {
    success: {
      bg: "bg-green-500",
      border: "border-base",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    error: {
      bg: "bg-accent",
      border: "border-base",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    },
    warning: {
      bg: "bg-yellow-500",
      border: "border-base",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
    },
    info: {
      bg: "bg-primary",
      border: "border-base",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  };

  const { bg, border, icon } = typeStyles[type];

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  return (
    <div
      className={`${bg} text-white p-4 border-3 ${border} shadow-brutal mb-4 animate-slight-bounce ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3 flex-1">
          <p className="font-bold">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="ml-auto flex-shrink-0 bg-white text-base border-3 border-base w-6 h-6 flex items-center justify-center hover:bg-gray-100"
        >
          <span className="sr-only">Close</span>
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;