import React from "react";
import Button from "../common/Button";

interface CreateGoalCardProps {
  onClick?: () => void
}

/**
 * Component for displaying the "Create New Goal" card
 */
const CreateGoalCard: React.FC<CreateGoalCardProps> = ({ onClick }) => {
  return (
    <div className="w-full max-w-sm card bg-accent text-white card-hover">
      <div className="flex flex-col items-center justify-center h-full py-8">
        <div className="w-20 h-20 bg-white border-3 border-base flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <p className="font-black text-xl text-center mb-6">
          Create a new goal to track your progress
        </p>
        <Button variant="secondary" onClick={onClick}>
          Create Goal
        </Button>
      </div>
    </div>
  );
};

export default CreateGoalCard;