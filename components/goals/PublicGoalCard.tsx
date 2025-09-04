import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDeadline } from "../../utils/dateUtils";
import ProgressBar from "../common/ProgressBar";
import Button from "../common/Button";
import { Goal } from "../../utils/mockData";

interface PublicGoalCardProps {
  goal: Goal
  index: number
}

/**
 * Component for displaying a public goal card with alternating colors
 */
const PublicGoalCard: React.FC<PublicGoalCardProps> = ({ goal, index }) => {
  // Use a unique placeholder image per goal for visual variety
  const placeholderImg = `https://picsum.photos/400/250?random=${goal.id}`;

  // Alternate between primary and accent for cards
  const isAccent = index % 2 === 1;
  const cardBg = isAccent ? "bg-accent" : "bg-primary";
  const textColor = "text-white";
  const progressBarColor = isAccent ? "bg-primary" : "bg-accent";

  return (
    <div className={`card ${cardBg} ${textColor} card-hover w-full max-w-sm`}>
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
        <div className="bg-white text-base border-3 border-base px-3 py-1 font-bold">
          ACTIVE
        </div>
        <div className="bg-white text-base border-3 border-base px-3 py-1 font-bold">
          {goal.haters} Haters
        </div>
      </div>

      {/* Time Remaining Bar */}
      <div className="mb-6">
        <ProgressBar
          progress={goal.progress}
          days={parseInt(formatDeadline(goal.deadline))}
          progressBarColor={progressBarColor}
        />
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-sm">Staked</p>
          <p className="font-black text-xl">
            <span>$</span> {goal.stakeAmount}
          </p>
        </div>
        <Link href={`/goals/${goal.id}`}>
          <Button variant={isAccent ? "primary" : "secondary"}>View</Button>
        </Link>
      </div>
    </div>
  );
};

export default PublicGoalCard;