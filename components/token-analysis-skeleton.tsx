import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function TokenAnalysisSkeleton() {
  return (
    <div className="space-y-8">
      {/* Token Overview Skeleton */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Token Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Token Info Skeleton */}
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" style={{ animationDelay: '0ms' }} />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" style={{ animationDelay: '100ms' }} />
                <Skeleton className="h-6 w-24" style={{ animationDelay: '200ms' }} />
                <Skeleton className="h-4 w-32" style={{ animationDelay: '300ms' }} />
              </div>
            </div>

            {/* Price Info Skeleton */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                <Skeleton className="h-4 w-20" style={{ animationDelay: '150ms' }} />
                <Skeleton className="h-8 w-24" style={{ animationDelay: '250ms' }} />
              </div>
              <div className="bg-gray-900 p-4 rounded-lg space-y-2">
                <Skeleton className="h-4 w-24" style={{ animationDelay: '175ms' }} />
                <Skeleton className="h-8 w-20" style={{ animationDelay: '275ms' }} />
              </div>
            </div>

            {/* Safety Status Skeleton */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <Skeleton className="h-10 w-32 rounded-full" style={{ animationDelay: '200ms' }} />
              <Skeleton className="h-4 w-24" style={{ animationDelay: '300ms' }} />
              <Skeleton className="h-4 w-28" style={{ animationDelay: '400ms' }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flow Visualizer Skeleton */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Security Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-16 h-16 rounded-full" style={{ animationDelay: '0ms' }} />
              <Skeleton className="w-8 h-1" style={{ animationDelay: '100ms' }} />
              <Skeleton className="w-16 h-16 rounded-full" style={{ animationDelay: '200ms' }} />
              <Skeleton className="w-8 h-1" style={{ animationDelay: '300ms' }} />
              <Skeleton className="w-16 h-16 rounded-full" style={{ animationDelay: '400ms' }} />
              <Skeleton className="w-8 h-1" style={{ animationDelay: '500ms' }} />
              <Skeleton className="w-16 h-16 rounded-full" style={{ animationDelay: '600ms' }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Analysis Card Skeleton */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" style={{ animationDelay: '0ms' }} />
                <Skeleton className="h-6 w-full" style={{ animationDelay: '100ms' }} />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" style={{ animationDelay: '200ms' }} />
                <Skeleton className="h-6 w-full" style={{ animationDelay: '300ms' }} />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" style={{ animationDelay: '400ms' }} />
                <Skeleton className="h-6 w-full" style={{ animationDelay: '500ms' }} />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" style={{ animationDelay: '600ms' }} />
                <Skeleton className="h-6 w-full" style={{ animationDelay: '700ms' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Holders List Skeleton */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Top Holders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-8 h-8 rounded-full" style={{ animationDelay: `${i * 100}ms` }} />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32" style={{ animationDelay: `${i * 100 + 50}ms` }} />
                      <Skeleton className="h-3 w-24" style={{ animationDelay: `${i * 100 + 100}ms` }} />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-20" style={{ animationDelay: `${i * 100 + 150}ms` }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transfers Table Skeleton */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl">Recent Transfers</CardTitle>
        </CardHeader>
        <CardContent>
                      <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-full" style={{ animationDelay: `${i * 120}ms` }} />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-36" style={{ animationDelay: `${i * 120 + 60}ms` }} />
                      <Skeleton className="h-3 w-24" style={{ animationDelay: `${i * 120 + 120}ms` }} />
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Skeleton className="h-4 w-20" style={{ animationDelay: `${i * 120 + 180}ms` }} />
                    <Skeleton className="h-3 w-16" style={{ animationDelay: `${i * 120 + 240}ms` }} />
                  </div>
                </div>
              ))}
            </div>
        </CardContent>
      </Card>
    </div>
  )
} 