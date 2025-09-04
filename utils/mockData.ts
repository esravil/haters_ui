/**
 * Mock data for goals
 * In a real application, this would come from an API
 */

// Helper function to generate random number of haters between 2-10
const getRandomHaters = () => Math.floor(Math.random() * 9) + 2; // Random number between 2-10

export interface Goal {
  id: number
  description: string
  deadline: Date
  stakeAmount: number
  status: string
  progress: number
  haters: number
}

// User's goals (active, completed, and failed)
export const mockUserGoals: Goal[] = [
  {
    id: 101,
    description: "Complete a triathlon",
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    stakeAmount: 800,
    status: "active",
    progress: 55,
    haters: getRandomHaters(),
  },
  {
    id: 102,
    description: "Read 20 books",
    deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120 days from now
    stakeAmount: 400,
    status: "active",
    progress: 30,
    haters: getRandomHaters(),
  },
  {
    id: 103,
    description: "Build a mobile app",
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    stakeAmount: 1200,
    status: "active",
    progress: 40,
    haters: getRandomHaters(),
  },
  {
    id: 104,
    description: "Learn to play the piano",
    deadline: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    stakeAmount: 600,
    status: "completed",
    progress: 100,
    haters: getRandomHaters(),
  },
  {
    id: 105,
    description: "Write a novel",
    deadline: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    stakeAmount: 1000,
    status: "completed",
    progress: 100,
    haters: getRandomHaters(),
  },
  {
    id: 106,
    description: "Lose 10 pounds",
    deadline: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    stakeAmount: 500,
    status: "failed",
    progress: 60,
    haters: getRandomHaters(),
  },
  {
    id: 107,
    description: "Run a marathon",
    deadline: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    stakeAmount: 750,
    status: "failed",
    progress: 75,
    haters: getRandomHaters(),
  },
];

// Public goals feed
export const mockPublicGoals: Goal[] = [
  {
    id: 1,
    description: "Run a marathon",
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    stakeAmount: 500,
    status: "active",
    progress: 65,
    haters: getRandomHaters(),
  },
  {
    id: 2,
    description: "Learn to play the guitar",
    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    stakeAmount: 300,
    status: "active",
    progress: 40,
    haters: getRandomHaters(),
  },
  {
    id: 3,
    description: "Write a novel",
    deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120 days from now
    stakeAmount: 1000,
    status: "active",
    progress: 25,
    haters: getRandomHaters(),
  },
  {
    id: 4,
    description: "Lose 20 pounds",
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    stakeAmount: 750,
    status: "active",
    progress: 50,
    haters: getRandomHaters(),
  },
  {
    id: 5,
    description: "Launch a podcast",
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    stakeAmount: 400,
    status: "active",
    progress: 75,
    haters: getRandomHaters(),
  },
  {
    id: 6,
    description: "Learn Spanish",
    deadline: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 180 days from now
    stakeAmount: 600,
    status: "active",
    progress: 15,
    haters: getRandomHaters(),
  },
];