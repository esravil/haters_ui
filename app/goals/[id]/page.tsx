'use client'

import React, { useState } from "react";
import { useParams } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";
import ProgressBar from "@/components/common/ProgressBar";
import { mockUserGoals } from "@/utils/mockData";
import { formatDeadline } from "@/utils/dateUtils";
import Image from "next/image";

/**
 * Goal details page component for displaying and interacting with a specific goal
 */
export default function GoalDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const [showProofForm, setShowProofForm] = useState(false);
  const [proofText, setProofText] = useState("");
  const [proofImage, setProofImage] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);

  // Find the goal by ID (in a real app, this would be an API call)
  const goal = mockUserGoals.find((g) => g.id === parseInt(id)) || mockUserGoals[0];

  // Handle proof submission
  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    console.log("Submitting proof:", { proofText, proofImage, isPublic });
    alert("Proof submitted successfully!");
    setShowProofForm(false);
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofImage(e.target.files[0]);
    }
  };

  return (
    <MainLayout>
      <section className="py-16 md:py-20 bg-background relative">
        <div className="container mx-auto px-4 relative">
          <div className="neo-container mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <SectionTitle className="mb-4 md:mb-0">Goal Details</SectionTitle>
              <Button variant="secondary" onClick={() => window.history.back()}>
                Back to Goals
              </Button>
            </div>
          </div>

          {/* Goal Details Card */}
          <div className="neo-container mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Goal Info */}
              <div className="md:w-2/3">
                <h2 className="font-black text-3xl mb-4">{goal.description}</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="bg-primary text-white border-3 border-base px-4 py-2 font-bold">
                    {formatDeadline(goal.deadline)}
                  </div>
                  <div className="bg-accent text-white border-3 border-base px-4 py-2 font-bold">
                    {goal.haters} Haters
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-2">Progress</h3>
                  <ProgressBar progress={goal.progress} />
                </div>

                <div className="mb-8">
                  <h3 className="font-bold text-xl mb-2">Stake Amount</h3>
                  <p className="font-black text-3xl">
                    {goal.stakeAmount}{" "}
                    <span className="text-primary">USDC</span>
                  </p>
                </div>

                {/* Goal Image */}
                <div className="mb-8">
                  <div className="border-3 border-base overflow-hidden">
                    <Image
                      src={`https://picsum.photos/800/400?random=${goal.id}`}
                      alt="Goal visual"
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Actions */}
              <div className="md:w-1/3">
                <div className="bg-white border-3 border-base p-6 shadow-brutal mb-6">
                  <h3 className="font-bold text-xl mb-4">Goal Status</h3>
                  <div className="bg-primary text-white border-3 border-base p-3 font-bold text-center mb-6">
                    {goal.status.toUpperCase()}
                  </div>

                  {goal.status === "active" && (
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => setShowProofForm(!showProofForm)}
                    >
                      {showProofForm ? "Cancel Submission" : "Submit Proof"}
                    </Button>
                  )}

                  {goal.status === "completed" && (
                    <div className="text-center">
                      <p className="font-bold text-green-500 mb-4">
                        Congratulations! You&apos;ve completed this goal.
                      </p>
                      <Button variant="secondary" className="w-full">
                        View Proof
                      </Button>
                    </div>
                  )}

                  {goal.status === "failed" && (
                    <div className="text-center">
                      <p className="font-bold text-accent mb-4">
                        Unfortunately, you didn&apos;t complete this goal in time.
                      </p>
                      <Button variant="secondary" className="w-full">
                        Try Again
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Proof Submission Form */}
          {showProofForm && (
            <div className="neo-container">
              <h3 className="font-bold text-2xl mb-6">Submit Proof</h3>
              <form onSubmit={handleSubmitProof}>
                <div className="mb-6">
                  <label htmlFor="proofText" className="block font-bold text-base mb-2">
                    Proof Description
                    <span className="text-accent ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="proofText"
                    name="proofText"
                    value={proofText}
                    onChange={(e) => setProofText(e.target.value)}
                    placeholder="Describe how you completed your goal..."
                    required
                    className="input"
                  />
                </div>

                <div className="mb-6">
                  <label className="block font-bold text-base mb-2">
                    Upload Image Proof
                    <span className="text-accent ml-1">*</span>
                  </label>
                  <div className="border-3 border-base p-4 bg-white">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={() => setIsPublic(!isPublic)}
                      className="mr-2 h-5 w-5"
                    />
                    <span className="font-bold">
                      Make this proof public (if goal is public)
                    </span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" variant="primary" animate={true}>
                    Submit Proof
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowProofForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}