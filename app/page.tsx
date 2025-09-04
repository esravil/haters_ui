import MainLayout from '@/components/layout/MainLayout'
import HeroSection from '@/components/HeroSection'
import PublicGoalsFeed from '@/components/PublicGoalsFeed'
import UserActiveGoals from '@/components/UserActiveGoals'

export default function HomePage() {
  // Check if user is logged in (this would be replaced with actual auth check)
  const isLoggedIn = true

  return (
    <MainLayout>
      <HeroSection />
      {isLoggedIn && <UserActiveGoals />}
      <PublicGoalsFeed />
    </MainLayout>
  )
}