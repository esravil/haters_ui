import React from "react";
import { mockPublicGoals } from "../utils/mockData";
import PublicGoalCard from "./goals/PublicGoalCard";
import SectionTitle from "./common/SectionTitle";
import Button from "./common/Button";

/**
 * Component for displaying the public goals feed section
 */
const PublicGoalsFeed: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <SectionTitle className="inline-block">Public Goals</SectionTitle>
          <p className="text-xl font-bold max-w-2xl mx-auto mt-6">
            Check out what others are working towards. Get inspired by their
            journeys and{" "}
            <span className="text-accent">create your own goal</span> to join
            the community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          {mockPublicGoals.map((goal, index) => (
            <PublicGoalCard key={goal.id} goal={goal} index={index} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="primary" animate={true} className="btn-accent">
            View More Goals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PublicGoalsFeed;