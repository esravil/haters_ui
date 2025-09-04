'use client'

import React, { useState } from "react";
import Link from "next/link";
import { mockUserGoals } from "../utils/mockData";
import GoalCard from "./goals/GoalCard";
import CreateGoalCard from "./goals/CreateGoalCard";
import CreateGoalModal from "./goals/CreateGoalModal";
import SectionTitle from "./common/SectionTitle";
import Button from "./common/Button";

/**
 * Component for displaying the user's active goals section
 */
const UserActiveGoals: React.FC = () => {
  // Check if user is logged in (this would be replaced with actual auth check)
  const isLoggedIn = true;
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-background relative">
      <div className="container mx-auto px-4 relative">
        <div className="neo-container mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <SectionTitle className="mb-6 md:mb-0">
              Your Active Goals
            </SectionTitle>
            <Button
              variant="primary"
              animate={true}
              onClick={() => setShowCreateModal(true)}
            >
              Create New Goal
            </Button>
          </div>
        </div>

        {/* Cards Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center mx-auto">
          {mockUserGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}

          {/* Create New Goal Card */}
          <CreateGoalCard onClick={() => setShowCreateModal(true)} />
        </div>

        <div className="text-center mt-8">
          <Link href="/dashboard">
            <Button variant="link">View All Your Goals →</Button>
          </Link>
        </div>
      </div>
      
      {/* Create Goal Modal */}
      <CreateGoalModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </section>
  );
};

export default UserActiveGoals;