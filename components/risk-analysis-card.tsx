"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Activity, AlertTriangle, Info } from "lucide-react"
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

  // More conservative and realistic risk calculations
  const holdersRisk = getRiskLevel(stats.total_holders || 0, { low: 100, medium: 500 })
  const liquidityRisk = getRiskLevel(stats.total_liquidity || 0, { low: 25000, medium: 100000 })
  
  // Calculate transfer activity risk with more realistic thresholds
  const transferActivityRisk = (() => {
    const transfers = stats.total_transfers || 0
    if (transfers < 50) return "high"
    if (transfers < 200) return "medium"
    return "low"
  })()

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

  // Helper to determine if data is estimated
  const isEstimatedData = (value: number, type: string) => {
    // Transfer counts above 1000 are likely estimated (Moralis limit is 100)
    if (type === 'transfers' && value > 1000) return true
    // Holder counts are always estimated since Moralis doesn't provide real holder data
    if (type === 'holders') return true
    // Liquidity is always 0 from Moralis
    if (type === 'liquidity' && value === 0) return true
    return false
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
                <div className="flex items-center gap-2">
                  <p className="text-gray-300">Total Transfers</p>
                  {isEstimatedData(stats.total_transfers || 0, 'transfers') && (
                    <Info className="h-4 w-4 text-yellow-400" />
                  )}
                </div>
                <p className="text-white text-2xl font-bold">
                  {(stats.total_transfers || 0).toLocaleString()}
                  {isEstimatedData(stats.total_transfers || 0, 'transfers') && (
                    <span className="text-yellow-400 text-sm ml-2">(est.)</span>
                  )}
                </p>
              </div>
            </div>
            <div className={`text-sm font-semibold ${getRiskColor(transferActivityRisk)}`}>
              {transferActivityRisk === "low" ? "✓ High Activity" :
               transferActivityRisk === "medium" ? "⚠ Moderate Activity" : "🚨 Low Activity"}
            </div>
          </div>

          {/* Holders */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-gray-300">Token Holders</p>
                  <Info className="h-4 w-4 text-yellow-400" />
                </div>
                <p className="text-white text-2xl font-bold">
                  {(stats.total_holders || 0).toLocaleString()}
                  <span className="text-yellow-400 text-sm ml-2">(est.)</span>
                </p>
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
                <div className="flex items-center gap-2">
                  <p className="text-gray-300">Total Liquidity</p>
                  <Info className="h-4 w-4 text-yellow-400" />
                </div>
                <p className="text-white text-2xl font-bold">
                  {(stats.total_liquidity || 0) > 0 ? `$${(stats.total_liquidity || 0).toLocaleString()}` : 'N/A'}
                  {(stats.total_liquidity || 0) === 0 && (
                    <span className="text-yellow-400 text-sm ml-2">(unavailable)</span>
                  )}
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
                {(stats.volume_24h || 0) === 0 && (
                  <span className="text-yellow-400 text-sm ml-1">(est.)</span>
                )}
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

          {/* Data Accuracy Notice */}
          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <p className="text-yellow-400 text-sm font-semibold">Data Accuracy Notice</p>
            </div>
            <div className="text-gray-300 text-sm bg-gray-900/50 p-3 rounded space-y-2">
              <p>• <strong>Transfer counts</strong> above 1,000 are estimated due to API limits</p>
              <p>• <strong>Holder counts</strong> are always estimated (Moralis doesn't provide real holder data)</p>
              <p>• <strong>Liquidity data</strong> is not available from Moralis API</p>
              <p>• <strong>24h volume</strong> is calculated from recent transfer samples</p>
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
