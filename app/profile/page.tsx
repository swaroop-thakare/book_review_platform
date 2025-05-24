"use client"
import { UserProfile } from "@/components/user-profile"
import { UserReviews } from "@/components/user-reviews"
import { LoadingSpinner } from "@/components/loading-spinner"
import { useAuth } from "@/hooks/use-auth"
import { useUserReviews } from "@/hooks/use-user-reviews"

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const { reviews, loading: reviewsLoading, deleteReview } = useUserReviews(user?.id)

  if (authLoading) return <LoadingSpinner />

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-20 md:pt-24 flex items-center justify-center">
        <div className="text-center text-white">Please log in to view your profile</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-20 md:pt-24 py-8 px-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-white">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UserProfile user={user} />
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6 text-white">My Reviews</h2>
            {reviewsLoading ? <LoadingSpinner /> : <UserReviews reviews={reviews} onDelete={deleteReview} />}
          </div>
        </div>
      </div>
    </div>
  )
}
