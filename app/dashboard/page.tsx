"use client"

import { useState } from "react"
import SearchBar from "@/components/search-bar"
import TokenOverview from "@/components/token-overview"
import RiskAnalysisCard from "@/components/risk-analysis-card"
import TransfersTable from "@/components/transfers-table"
import HoldersList from "@/components/holders-list"
import FlowVisualizer from "@/components/flow-visualizer"
import TokenAnalysisSkeleton from "@/components/token-analysis-skeleton"
import { useTokenAnalysis } from "@/hooks/use-token-analysis"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { testMoralisEndpoints, testPriceEndpoints } from "@/lib/api-debug"

export default function Home() {
  const { tokenData, isLoading, error, analyzeToken, reset } = useTokenAnalysis()
  const [tokenAddress, setTokenAddress] = useState("")

  const handleSearch = async (address: string) => {
    setTokenAddress(address)
    await analyzeToken(address)
  }

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            RugRadar
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Analyze ERC-20 tokens for potential security risks and rug pull indicators using advanced Web3 analytics
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />      
        </div>

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <Alert variant="destructive" className="bg-red-900/20 border-red-600/30">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-300">
                {error}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <TokenAnalysisSkeleton />}

        {/* Results Section */}
        {tokenData && !isLoading && (
          <div className="space-y-8">
            {/* Token Overview */}
            <TokenOverview tokenData={tokenData} />

            {/* Flow Visualizer */}
            <FlowVisualizer isSafe={tokenData.riskScore < 50} />

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RiskAnalysisCard tokenData={tokenData} />
              <HoldersList tokenData={tokenData} />
            </div>

            {/* Transfers Table */}
            <TransfersTable tokenData={tokenData} />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>Built with Moralis Web3 APIs • Always DYOR (Do Your Own Research)</p>
        </footer>
      </div>
    </div>
  )
}
