import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDeadline } from "../../utils/dateUtils";
import ProgressBar from "../common/ProgressBar";
import Button from "../common/Button";
import { Goal } from "../../utils/mockData";

interface GoalCardProps {
  goal: Goal
}

/**
 * Component for displaying an individual goal card
 */
const GoalCard: React.FC<GoalCardProps> = ({ goal }) => {
  // Use a unique placeholder image per goal for visual variety
  const placeholderImg = `https://picsum.photos/400/250?random=${goal.id}`;

  return (
    <div className="flex-shrink-0 w-full max-w-sm card bg-white card-hover">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-xl">{goal.description}</h3>
      </div>

      {/* Card Image */}
      <div className="mb-4 border-3 border-base overflow-hidden">
        <Image
          src={placeholderImg}
          alt="Goal visual"
          width={400}
          height={250}
          className="w-full h-40 object-cover"
        />
      </div>

      {/* Status Badge and Haters Count */}
      <div className="flex justify-between items-center mb-4">
        <div
          className={`inline-block px-3 py-1 font-bold border-3 border-base ${
            goal.status === "completed"
              ? "bg-green-500 text-white"
              : goal.status === "failed"
              ? "bg-accent text-white"
              : "bg-primary text-white"
          }`}
        >
          {goal.status === "completed"
            ? "COMPLETED"
            : goal.status === "failed"
            ? "FAILED"
            : "ACTIVE"}
        </div>
        <div className="bg-accent text-white border-3 border-base px-3 py-1 font-bold">
          {goal.haters} Haters
        </div>
      </div>

      {/* Time Remaining Bar */}
      <div className="mb-6">
        <ProgressBar
          progress={goal.progress}
          days={parseInt(formatDeadline(goal.deadline))}
        />
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-sm">Staked</p>
          <p className="font-black text-xl">
            <span className="text-primary">$</span> {goal.stakeAmount}
          </p>
        </div>
        <Link href={`/goals/${goal.id}`}>
          <Button variant="secondary" className="py-2 px-4">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GoalCard;