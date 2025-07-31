"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bug, RefreshCw, CheckCircle, XCircle } from "lucide-react"
import { moralisAPIFixed } from "@/lib/api-fixed"

interface ApiDebugPanelProps {
  tokenAddress: string
}

export default function ApiDebugPanel({ tokenAddress }: ApiDebugPanelProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [debugData, setDebugData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const runDebugTest = async () => {
    setIsLoading(true)
    setError(null)
    setDebugData(null)

    try {
      console.log('🔍 Starting API debug test for:', tokenAddress)
      
      const results = {
        metadata: null,
        stats: null,
        holders: null,
        transfers: null,
        price: null,
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY ? 'Configured' : 'Missing'
      }

      // Test metadata
      try {
        results.metadata = await moralisAPIFixed.getTokenMetadata(tokenAddress)
        console.log('✅ Metadata test passed')
      } catch (err) {
        console.error('❌ Metadata test failed:', err)
        results.metadata = { error: err instanceof Error ? err.message : 'Unknown error' }
      }

      // Test stats
      try {
        results.stats = await moralisAPIFixed.getTokenStats(tokenAddress)
        console.log('✅ Stats test passed')
      } catch (err) {
        console.error('❌ Stats test failed:', err)
        results.stats = { error: err instanceof Error ? err.message : 'Unknown error' }
      }

      // Test holders
      try {
        results.holders = await moralisAPIFixed.getTokenHolders(tokenAddress, 'eth', 3)
        console.log('✅ Holders test passed')
      } catch (err) {
        console.error('❌ Holders test failed:', err)
        results.holders = { error: err instanceof Error ? err.message : 'Unknown error' }
      }

      // Test transfers
      try {
        results.transfers = await moralisAPIFixed.getTokenTransfers(tokenAddress, 'eth', 5)
        console.log('✅ Transfers test passed')
      } catch (err) {
        console.error('❌ Transfers test failed:', err)
        results.transfers = { error: err instanceof Error ? err.message : 'Unknown error' }
      }

      // Test price
      try {
        results.price = await moralisAPIFixed.getTokenPrice(tokenAddress)
        console.log('✅ Price test passed')
      } catch (err) {
        console.error('❌ Price test failed:', err)
        results.price = { error: err instanceof Error ? err.message : 'Unknown error' }
      }

      setDebugData(results)
      console.log('📊 Debug test completed:', results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Debug test failed')
      console.error('❌ Debug test failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!tokenAddress) return null

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center gap-2">
          <Bug className="h-5 w-5" />
          API Debug Panel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={runDebugTest}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Testing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Bug className="h-4 w-4" />
                  Test API Calls
                </div>
              )}
            </Button>
            
            <span className="text-sm text-gray-400">
              Token: {tokenAddress.slice(0, 10)}...{tokenAddress.slice(-8)}
            </span>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-900/20 border-red-600/30">
              <XCircle className="h-4 w-4" />
              <AlertDescription className="text-red-300">{error}</AlertDescription>
            </Alert>
          )}

          {debugData && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* API Key Status */}
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {debugData.apiKey === 'Configured' ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className="text-sm font-semibold">API Key</span>
                  </div>
                  <p className="text-xs text-gray-400">{debugData.apiKey}</p>
                </div>

                {/* Metadata Status */}
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {debugData.metadata && !debugData.metadata.error ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className="text-sm font-semibold">Metadata</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {debugData.metadata?.error || `${debugData.metadata?.name || 'Unknown'} (${debugData.metadata?.symbol || 'N/A'})`}
                  </p>
                </div>

                {/* Stats Status */}
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {debugData.stats && !debugData.stats.error ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className="text-sm font-semibold">Stats</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {debugData.stats?.error || `Transfers: ${debugData.stats?.total_transfers?.toLocaleString() || 0}, Holders: ${debugData.stats?.total_holders?.toLocaleString() || 0}`}
                  </p>
                </div>

                {/* Holders Status */}
                <div className="bg-gray-900 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {debugData.holders && !debugData.holders.error ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className="text-sm font-semibold">Holders</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {debugData.holders?.error || `${debugData.holders?.length || 0} holders found`}
                  </p>
                </div>
              </div>

              {/* Raw Data (Collapsible) */}
              <details className="bg-gray-900 p-3 rounded-lg">
                <summary className="text-sm font-semibold text-gray-300 cursor-pointer">
                  Raw API Response Data
                </summary>
                <pre className="mt-2 text-xs text-gray-400 bg-gray-800 p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(debugData, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 