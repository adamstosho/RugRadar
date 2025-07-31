import { useState, useCallback } from 'react'
import { moralisAPIFixed } from '@/lib/api-fixed'
import { TokenAnalysis } from '@/lib/api'

interface UseTokenAnalysisReturn {
  tokenData: TokenAnalysis | null
  isLoading: boolean
  error: string | null
  analyzeToken: (address: string, chain?: string) => Promise<void>
  reset: () => void
}

export function useTokenAnalysis(): UseTokenAnalysisReturn {
  const [tokenData, setTokenData] = useState<TokenAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeToken = useCallback(async (address: string, chain: string = 'eth') => {
    setIsLoading(true)
    setError(null)
    setTokenData(null)

    try {
      const analysis = await moralisAPIFixed.analyzeToken(address, chain)
      setTokenData(analysis)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze token'
      setError(errorMessage)
      console.error('Token analysis error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setTokenData(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    tokenData,
    isLoading,
    error,
    analyzeToken,
    reset,
  }
} 