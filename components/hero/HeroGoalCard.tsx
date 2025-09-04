import React from "react";
import ProgressBar from "../common/ProgressBar";
import Button from "../common/Button";
import Image from "next/image";

/**
 * Example goal card component for the hero section
 */
const HeroGoalCard: React.FC = () => {
  return (
    <div className="card max-w-md w-full card-hover p-4">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-black text-2xl">Run a marathon</h3>
      </div>

      {/* Card Image */}
      <div className="mb-4 border-3 border-base overflow-hidden">
        <Image
          src="https://picsum.photos/400/250?random=hero"
          alt="Goal visual"
          width={400}
          height={250}
          className="w-full h-40 object-cover"
        />
      </div>

      {/* Status Badge and Haters Count */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-primary text-white border-3 border-base px-3 py-1 font-bold">
          ACTIVE
        </div>
        <div className="bg-accent text-white border-3 border-base px-3 py-1 font-bold">
          7 Haters
        </div>
      </div>

      <p className="font-bold text-lg mb-4">in 100 days</p>

      {/* Time Remaining Bar */}
      <div className="mb-6">
        <ProgressBar progress={65} />
      </div>

      {/* Card Footer */}
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-sm">Staked</p>
          <p className="font-black text-2xl">
            500 <span className="text-accent">USDC</span>
          </p>
        </div>
        <Button variant="primary" className="py-2">
          View
        </Button>
      </div>
    </div>
  );
};

export default HeroGoalCard;