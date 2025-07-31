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
    // Validate API key
    const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY
    if (!apiKey || apiKey === 'your_moralis_api_key_here') {
      setError('Moralis API key not configured. Please add your API key to .env.local')
      return
    }

    // Validate address format
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
    if (!ethAddressRegex.test(address)) {
      setError('Invalid Ethereum address format')
      return
    }

    setIsLoading(true)
    setError(null)
    setTokenData(null)

    try {
      // Add timeout to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 30000)
      )
      
      const analysisPromise = moralisAPIFixed.analyzeToken(address, chain)
      
      const analysis = await Promise.race([analysisPromise, timeoutPromise]) as TokenAnalysis
      
      // Validate the response
      if (!analysis || !analysis.metadata) {
        throw new Error('Invalid response from API')
      }
      
      setTokenData(analysis)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze token'
      
      // Provide more specific error messages
      if (errorMessage.includes('401')) {
        setError('Invalid API key. Please check your Moralis API key.')
      } else if (errorMessage.includes('404')) {
        setError('Token not found. Please verify the contract address.')
      } else if (errorMessage.includes('timeout')) {
        setError('Request timed out. Please try again.')
      } else if (errorMessage.includes('rate limit')) {
        setError('Rate limit exceeded. Please wait a moment and try again.')
      } else {
        setError(`Analysis failed: ${errorMessage}`)
      }
      
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