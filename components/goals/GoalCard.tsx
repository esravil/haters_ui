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

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
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
        
        {goal.isMultiplayer && (
          <div className="bg-purple-500 text-white border-3 border-base px-3 py-1 font-bold text-sm">
            MULTIPLAYER
          </div>
        )}
        
        {goal.isPublic === false && (
          <div className="bg-gray-500 text-white border-3 border-base px-3 py-1 font-bold text-sm">
            PRIVATE
          </div>
        )}
        
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

      {/* Multiplayer Participants Info */}
      {goal.isMultiplayer && (
        <div className="mb-4 p-3 bg-gray-50 border-2 border-base">
          <p className="font-bold text-sm">
            Participants: {goal.participants || 1}/{goal.maxParticipants}
          </p>
          {goal.arbiterType && (
            <p className="text-sm text-gray-600">
              Arbiter: {goal.arbiterType === 'llm' ? 'AI Judge' : goal.arbiterType === 'designated' ? 'Designated Pool' : 'Self-Verification'}
            </p>
          )}
        </div>
      )}

      {/* Card Footer */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-sm">Staked</p>
          <p className="font-black text-xl">
            {goal.paymentToken === 'SOL' ? '◎' : '$'} {goal.stakeAmount}
            <span className="text-sm font-normal text-gray-600 ml-1">
              {goal.paymentToken || 'USDC'}
            </span>
          </p>
        </div>
        <div className="flex gap-2">
          {goal.isMultiplayer && goal.status === 'active' && (
            <Button variant="link" className="py-2 px-3 text-sm">
              Join
            </Button>
          )}
          <Link href={`/goals/${goal.id}`}>
            <Button variant="secondary" className="py-2 px-4">
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;