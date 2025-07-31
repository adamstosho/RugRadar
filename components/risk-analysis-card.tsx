"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Activity, AlertTriangle } from "lucide-react"
import { TokenAnalysis } from "@/lib/api"

interface RiskAnalysisCardProps {
  tokenData: TokenAnalysis
}

export default function RiskAnalysisCard({ tokenData }: RiskAnalysisCardProps) {
  const { stats, riskFactors } = tokenData

  const getRiskLevel = (value: number, thresholds: { low: number; medium: number }) => {
    if (value < thresholds.low) return "high"
    if (value < thresholds.medium) return "medium"
    return "low"
  }

  const holdersRisk = getRiskLevel(stats.total_holders || 0, { low: 100, medium: 1000 })
  const liquidityRisk = getRiskLevel(stats.total_liquidity || 0, { low: 10000, medium: 100000 })

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Risk Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Total Transfers */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300">Total Transfers</p>
                <p className="text-white text-2xl font-bold">{(stats.total_transfers || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className={`text-sm font-semibold ${
              (stats.total_transfers || 0) > 1000000 ? "text-green-400" : 
              (stats.total_transfers || 0) > 100000 ? "text-yellow-400" : "text-red-400"
            }`}>
              {(stats.total_transfers || 0) > 1000000 ? "✓ Very High Activity" :
               (stats.total_transfers || 0) > 100000 ? "✓ High Activity" :
               (stats.total_transfers || 0) > 10000 ? "⚠ Moderate Activity" : "🚨 Low Activity"}
            </div>
          </div>

          {/* Holders */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300">Token Holders</p>
                <p className="text-white text-2xl font-bold">{(stats.total_holders || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className={`text-sm font-semibold ${getRiskColor(holdersRisk)}`}>
              {holdersRisk === "low"
                ? "✓ Well Distributed"
                : holdersRisk === "medium"
                  ? "⚠ Moderate Risk"
                  : "🚨 High Risk"}
            </div>
          </div>

          {/* Liquidity */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-gray-300">Total Liquidity</p>
                <p className="text-white text-2xl font-bold">
                  {(stats.total_liquidity || 0) > 0 ? `$${(stats.total_liquidity || 0).toLocaleString()}` : 'N/A'}
                </p>
              </div>
            </div>
            <div className={`text-sm font-semibold ${getRiskColor(liquidityRisk)}`}>
              {(stats.total_liquidity || 0) > 0 ? (
                liquidityRisk === "low"
                  ? "✓ High Liquidity"
                  : liquidityRisk === "medium"
                    ? "⚠ Moderate Liquidity"
                    : "🚨 Low Liquidity"
              ) : "⚠ Data Unavailable"}
            </div>
          </div>

          {/* 24h Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
            <div>
              <p className="text-gray-400 text-sm">24h Volume</p>
              <p className="text-white text-lg font-semibold">
                {(stats.volume_24h || 0) > 0 ? `$${(stats.volume_24h || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}` : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">24h Change</p>
              <p className={`text-lg w-40 truncate font-semibold ${(stats.price_change_24h || 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
                {stats.price_change_24h !== 0 && stats.price_change_24h !== null && stats.price_change_24h !== undefined ? (
                  `${(stats.price_change_24h || 0) >= 0 ? "+" : ""}${Number(stats.price_change_24h).toFixed(6)}%`
                ) : 'N/A'}
              </p>
            </div>
          </div>

          {/* Risk Factors */}
          {riskFactors.length > 0 && (
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <p className="text-yellow-400 text-sm font-semibold">Risk Factors</p>
              </div>
              <div className="space-y-2">
                {riskFactors.map((factor, index) => (
                  <div key={index} className="text-gray-300 text-sm bg-gray-900/50 p-2 rounded">
                    • {factor}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
