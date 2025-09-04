import React from "react";
import Link from "next/link";
import SectionTitle from "./common/SectionTitle";
import Button from "./common/Button";
import HeroGoalCard from "./hero/HeroGoalCard";

/**
 * Hero section component for the homepage
 */
const HeroSection: React.FC = () => {
  return (
    <section className="py-10 md:py-16 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div className="mb-6">
              <h1 className="section-title mb-2">
                <span className="text-primary">Believe</span> in yourself
                <div className="section-title-underline"></div>
              </h1>
              <p className="text-xl md:text-2xl font-bold mt-6 mb-6 max-w-lg">
                You can accomplish any goal. Just hold yourself
                <span className="text-accent"> accountable.</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button variant="primary" animate={true}>
                  Create a Goal
                </Button>
              </Link>
              <Button variant="primary" className="btn-accent">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column - Goal Card Example */}
          <div className="md:w-1/2 flex justify-center">
            <HeroGoalCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;