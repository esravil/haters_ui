'use client'

import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import GoalCard from "@/components/goals/GoalCard";
import { mockUserGoals } from "@/utils/mockData";

/**
 * Dashboard page component for displaying user's goals
 */
export default function DashboardPage() {
  // State
  const [activeFilter, setActiveFilter] = useState("active");

  // Filter goals based on selected filter
  const filteredGoals = mockUserGoals.filter((goal) => {
    if (activeFilter === "all") return true;
    return goal.status === activeFilter;
  });

  return (
    <MainLayout>
      <section className="py-16 md:py-20 bg-background relative">
        <div className="container mx-auto px-4 relative">
          <div className="neo-container mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <SectionTitle className="mb-6 md:mb-0">Your Goals</SectionTitle>
              <Button
                variant="primary"
                animate={true}
                onClick={() => {/* Handle create goal */}}
              >
                Create New Goal
              </Button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
            <Button
              variant={activeFilter === "all" ? "primary" : "secondary"}
              className="py-2 px-4"
              onClick={() => setActiveFilter("all")}
            >
              All
            </Button>
            <Button
              variant={activeFilter === "active" ? "primary" : "secondary"}
              className="py-2 px-4"
              onClick={() => setActiveFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={activeFilter === "completed" ? "primary" : "secondary"}
              className="py-2 px-4"
              onClick={() => setActiveFilter("completed")}
            >
              Completed
            </Button>
            <Button
              variant={activeFilter === "failed" ? "primary" : "secondary"}
              className="py-2 px-4"
              onClick={() => setActiveFilter("failed")}
            >
              Failed
            </Button>
          </div>

          {/* Goals Grid */}
          {filteredGoals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center mx-auto">
              {filteredGoals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 neo-container">
              <p className="text-xl font-bold mb-6">
                No goals found for this filter.
              </p>
              <Button
                variant="primary"
                animate={true}
                onClick={() => {/* Handle create goal */}}
              >
                Create Your First Goal
              </Button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}