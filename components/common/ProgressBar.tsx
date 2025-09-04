import React from "react";

interface ProgressBarProps {
  progress: number
  days?: number
  showPercentage?: boolean
  progressBarColor?: string
}

/**
 * Reusable progress bar component
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  days,
  showPercentage = true,
  progressBarColor = "bg-accent",
}) => {
  return (
    <div className="mb-6">
      {showPercentage && (
        <div className="flex justify-between mb-2">
          <span className="font-bold">Time Remaining</span>
          <span className="font-bold ">{days} days</span>
        </div>
      )}
      <div className="w-full h-6 border-3 border-base bg-white">
        <div
          className={`${progressBarColor} h-full border-r-3 border-base`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;