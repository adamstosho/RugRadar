"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, AlertTriangle } from "lucide-react"

interface FlowVisualizerProps {
  isSafe: boolean
}

export default function FlowVisualizer({ isSafe }: FlowVisualizerProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center gap-2">
          {isSafe ? <TrendingUp className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
          Token Flow Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-32 flex items-center justify-center">
          {isSafe ? (
            // Safe Token Flow - Green flowing animation
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">BUY</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
              </div>

              {/* Flowing particles */}
              <div className="flex-1 relative h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
                <div
                  className="absolute top-0 left-0 w-4 h-2 bg-green-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="absolute top-0 left-8 w-3 h-2 bg-green-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute top-0 left-16 w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">SELL</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full animate-ping"></div>
              </div>
            </div>
          ) : (
            // Rug Pull Warning - Red funnel trap
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">BUY</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
              </div>

              {/* Trap funnel */}
              <div className="flex-1 relative h-16 flex items-center justify-center">
                <div className="relative">
                  <div className="w-24 h-16 bg-gradient-to-r from-red-600 to-red-800 transform rotate-45 rounded-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-xs transform -rotate-45">TRAP</span>
                  </div>
                  {/* Stuck particles */}
                  <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div
                    className="absolute bottom-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
              </div>

              <div className="relative opacity-50">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 font-bold text-xs">SELL?</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className={`text-sm font-semibold ${isSafe ? "text-green-400" : "text-red-400"}`}>
            {isSafe
              ? "✅ Healthy token flow detected - Normal buy/sell activity"
              : "🚨 Warning: Tokens may be entering but not exiting normally"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
