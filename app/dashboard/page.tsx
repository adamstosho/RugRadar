"use client"

import { useState } from "react"
import SearchBar from "@/components/search-bar"
import TokenOverview from "@/components/token-overview"
import RiskAnalysisCard from "@/components/risk-analysis-card"
import TransfersTable from "@/components/transfers-table"
import HoldersList from "@/components/holders-list"
import FlowVisualizer from "@/components/flow-visualizer"
import TokenAnalysisSkeleton from "@/components/token-analysis-skeleton"
import ErrorBoundary from "@/components/error-boundary"
import ApiDebugPanel from "@/components/api-debug-panel"
import { useTokenAnalysis } from "@/hooks/use-token-analysis"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Info, Bug, TestTube } from "lucide-react"
import { testAPIFromBrowser } from "@/lib/test-api"

export default function Dashboard() {
  const { tokenData, isLoading, error, analyzeToken, reset } = useTokenAnalysis()
  const [tokenAddress, setTokenAddress] = useState("")
  const [showDebug, setShowDebug] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)
  const [isTesting, setIsTesting] = useState(false)

  const handleSearch = async (address: string) => {
    setTokenAddress(address)
    await analyzeToken(address)
  }

  const handleReset = () => {
    reset()
    setTokenAddress("")
  }

  const handleTestAPI = async () => {
    setIsTesting(true)
    setTestResult(null)
    try {
      const result = await testAPIFromBrowser()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <ErrorBoundary>
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

          {/* API Key Warning */}
          {(!process.env.NEXT_PUBLIC_MORALIS_API_KEY || process.env.NEXT_PUBLIC_MORALIS_API_KEY === 'your_moralis_api_key_here') && (
            <div className="max-w-2xl mx-auto mb-8">
              <Alert className="bg-yellow-900/20 border-yellow-600/30">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-yellow-300">
                  Please configure your Moralis API key in the .env.local file to use this application.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* API Test Section */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-4 justify-center">
              <button
                onClick={handleTestAPI}
                disabled={isTesting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition-colors"
              >
                <TestTube className="h-4 w-4" />
                {isTesting ? 'Testing API...' : 'Test API Connection'}
              </button>
              
              <button
                onClick={() => setShowDebug(!showDebug)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <Bug className="h-4 w-4" />
                {showDebug ? 'Hide' : 'Show'} Debug Panel
              </button>
            </div>

            {/* Test Result */}
            {testResult && (
              <div className="mt-4">
                <Alert className={testResult.success ? "bg-green-900/20 border-green-600/30" : "bg-red-900/20 border-red-600/30"}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className={testResult.success ? "text-green-300" : "text-red-300"}>
                    {testResult.success ? '✅ API is working correctly!' : `❌ API Error: ${testResult.error}`}
                  </AlertDescription>
                </Alert>
              </div>
            )}
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

          {/* Debug Panel */}
          {showDebug && tokenAddress && (
            <div className="max-w-4xl mx-auto mb-8">
              <ApiDebugPanel tokenAddress={tokenAddress} />
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

              {/* Reset Button */}
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Analyze Another Token
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!tokenData && !isLoading && !error && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Analyze</h3>
                <p className="text-gray-400 mb-6">
                  Enter an ERC-20 token contract address above to start your security analysis
                </p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>• Get comprehensive risk assessment</p>
                  <p>• View holder distribution analysis</p>
                  <p>• Check recent transfer activity</p>
                  <p>• Identify potential rug pull indicators</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>Built with Moralis Web3 APIs • Always DYOR (Do Your Own Research)</p>
            <p className="text-sm mt-2">
              This tool is for educational purposes only. Not financial advice.
            </p>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  )
}
