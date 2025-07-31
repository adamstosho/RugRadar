// Moralis Web3 API Service
// Types and API functions for token analysis

export interface TokenMetadata {
  address: string
  name: string
  symbol: string
  decimals: number
  logo?: string
  logo_hash?: string
  thumbnail?: string
  block_number?: string
  validated?: number
  created_at?: string
  possible_spam?: boolean
  tokenLogo?: string
}

export interface TokenStats {
  total_transfers: number
  total_holders: number
  total_supply: string
  total_liquidity: number
  volume_24h: number
  price_change_24h: number
}

export interface TokenHolder {
  owner_address: string
  balance: string
  share: number
}

export interface TokenTransfer {
  from_address: string
  to_address: string
  value: string
  timestamp: string
  transaction_hash: string
  block_number: string
  gas_price: string
  gas_used: string
}

export interface TokenPrice {
  token_address: string
  usdPrice: number
  nativePrice: number
  exchangeAddress?: string
  exchangeName?: string
  price_change_24h?: number
  usd_price_24h?: number
  // Additional fields from the API response
  tokenName?: string
  tokenSymbol?: string
  tokenDecimals?: number
  possibleSpam?: boolean
  tokenLogo?: string
  usdPrice24hr?: number
  usdPrice24hrPercentChange?: number
  usdPriceFormatted?: string
  verifiedContract?: boolean
}

export interface TokenAnalysis {
  metadata: TokenMetadata
  stats: TokenStats
  holders: TokenHolder[]
  transfers: TokenTransfer[]
  price: TokenPrice
  riskScore: number
  riskFactors: string[]
}

class MoralisAPI {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_MORALIS_API_BASE || 'https://deep-index.moralis.io/api/v2'
    this.apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY || ''
  }

  private async makeRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-API-Key': this.apiKey,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ API Error: ${response.status} - ${errorText}`)
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  }

  // Get token metadata - using transfers to get basic info
  async getTokenMetadata(address: string, chain: string = 'eth'): Promise<TokenMetadata> {
    try {
      // Try to get metadata from transfers endpoint
      const transfers = await this.makeRequest<{ result: any[] }>(`/erc20/${address}/transfers?chain=${chain}&limit=1`)
      
      if (transfers.result && transfers.result.length > 0) {
        const transfer = transfers.result[0]
        console.log('Transfer data for metadata:', transfer)
        return {
          address,
          name: transfer.token_name || transfer.tokenName || 'Unknown Token',
          symbol: transfer.token_symbol || transfer.tokenSymbol || 'UNKNOWN',
          decimals: transfer.token_decimals || transfer.tokenDecimals || 18,
          possible_spam: false,
        }
      }
      
      // Fallback
      return {
        address,
        name: 'Unknown Token',
        symbol: 'UNKNOWN',
        decimals: 18,
        possible_spam: false,
      }
    } catch (error) {
      console.warn('Failed to get metadata from transfers:', error)
      return {
        address,
        name: 'Unknown Token',
        symbol: 'UNKNOWN',
        decimals: 18,
        possible_spam: false,
      }
    }
  }

  // Get token statistics - using transfers to get basic stats
  async getTokenStats(address: string, chain: string = 'eth'): Promise<TokenStats> {
    try {
      // Get transfers to count total - use a larger limit to get more accurate data
      const transfers = await this.makeRequest<{ total: number, result: any[] }>(`/erc20/${address}/transfers?chain=${chain}&limit=100`)
      
      console.log('Raw transfers response for stats:', transfers)
      
      // Calculate 24h volume from recent transfers
      let volume24h = 0
      if (transfers.result && transfers.result.length > 0) {
        const now = Date.now()
        const oneDayAgo = now - (24 * 60 * 60 * 1000)
        
        transfers.result.forEach(transfer => {
          const transferTime = new Date(transfer.block_timestamp || transfer.blockTimestamp || transfer.timestamp || 0).getTime()
          if (transferTime > oneDayAgo) {
            volume24h += parseFloat(transfer.value || '0')
          }
        })
      }
      
      // Estimate holders from transfer data
      let estimatedHolders = 0
      if (transfers.total && transfers.total > 0) {
        // Rough estimation: more transfers usually means more holders
        estimatedHolders = Math.min(transfers.total / 50, 1000000) // Cap at 1M holders
      }
      
      return {
        total_transfers: transfers.total || 0,
        total_holders: Math.floor(estimatedHolders),
        total_supply: "0", // Will be updated if we can get it
        total_liquidity: 0, // Will be updated if we can get it
        volume_24h: volume24h,
        price_change_24h: 0, // Will be updated if we can get it
      }
    } catch (error) {
      console.warn('Failed to get stats, using defaults:', error)
      return {
        total_transfers: 0,
        total_holders: 0,
        total_supply: "0",
        total_liquidity: 0,
        volume_24h: 0,
        price_change_24h: 0,
      }
    }
  }

  // Get token holders - using transfers to estimate holders
  async getTokenHolders(address: string, chain: string = 'eth', limit: number = 5): Promise<TokenHolder[]> {
    try {
      // Since holders endpoint doesn't work, we'll use transfers to get some holder info
      const transfers = await this.makeRequest<{ result: any[] }>(`/erc20/${address}/transfers?chain=${chain}&limit=${limit * 4}`)
      
      const holders = new Map<string, { balance: string, count: number, value: number }>()
      
      if (transfers.result) {
        transfers.result.forEach(transfer => {
          // Count unique addresses and sum their transfer values
          const fromAddr = transfer.from_address || transfer.fromAddress
          const toAddr = transfer.to_address || transfer.toAddress
          const value = parseFloat(transfer.value || '0')
          
          if (fromAddr && fromAddr !== '0x0000000000000000000000000000000000000000') {
            const current = holders.get(fromAddr) || { balance: '0', count: 0, value: 0 }
            holders.set(fromAddr, { 
              ...current, 
              count: current.count + 1,
              value: current.value + value
            })
          }
          
          if (toAddr && toAddr !== '0x0000000000000000000000000000000000000000') {
            const current = holders.get(toAddr) || { balance: '0', count: 0, value: 0 }
            holders.set(toAddr, { 
              ...current, 
              count: current.count + 1,
              value: current.value + value
            })
          }
        })
      }
      
      // Convert to TokenHolder format
      const holderArray = Array.from(holders.entries())
        .sort((a, b) => b[1].value - a[1].value) // Sort by total value transferred
        .slice(0, limit)
        .map(([address, data], index) => ({
          owner_address: address,
          balance: data.value.toString(),
          share: ((data.value / Math.max(Array.from(holders.values()).reduce((sum, h) => sum + h.value, 0), 1)) * 100)
        }))
      
      return holderArray
    } catch (error) {
      console.warn('Failed to get holders, using empty array:', error)
      return []
    }
  }

  // Get token transfers
  async getTokenTransfers(address: string, chain: string = 'eth', limit: number = 20): Promise<TokenTransfer[]> {
    try {
      const response = await this.makeRequest<{ result: any[] }>(`/erc20/${address}/transfers?chain=${chain}&limit=${limit}`)
      console.log('Raw transfers response:', response)
      
      if (response.result) {
        return response.result.map(transfer => ({
          from_address: transfer.from_address || transfer.fromAddress || '',
          to_address: transfer.to_address || transfer.toAddress || '',
          value: transfer.value || '0',
          timestamp: transfer.block_timestamp || transfer.blockTimestamp || transfer.timestamp || '',
          transaction_hash: transfer.transaction_hash || transfer.transactionHash || '',
          block_number: transfer.block_number || transfer.blockNumber || '',
          gas_price: transfer.gas_price || transfer.gasPrice || '',
          gas_used: transfer.gas_used || transfer.gasUsed || '',
        }))
      }
      
      return []
    } catch (error) {
      console.warn('Failed to get transfers, using empty array:', error)
      return []
    }
  }

  // Get token price - using a different approach since prices endpoint has issues
  async getTokenPrice(address: string, chain: string = 'eth'): Promise<TokenPrice[]> {
    try {
      // Try to get price from token info endpoint
      const tokenInfo = await this.makeRequest<any>(`/erc20/${address}?chain=${chain}`)
      
      console.log('Token info for price:', tokenInfo)
      
      // If we have price data in the token info
      if (tokenInfo && (tokenInfo.usdPrice || tokenInfo.price)) {
        return [{
          token_address: address,
          usdPrice: tokenInfo.usdPrice || tokenInfo.price || 0,
          nativePrice: tokenInfo.nativePrice || 0,
        }]
      }
      
      // Fallback: try the prices endpoint with correct format
      try {
        const response = await this.makeRequest<{ data: TokenPrice[] }>('/erc20/prices', {
          method: 'POST',
          body: JSON.stringify({
            tokens: [address],
            chain: chain,
          }),
        })
        return response.data || []
      } catch (priceError) {
        console.warn('Prices endpoint failed:', priceError)
        return [{
          token_address: address,
          usdPrice: 0,
          nativePrice: 0,
        }]
      }
    } catch (error) {
      console.warn('Failed to get price, using default:', error)
      return [{
        token_address: address,
        usdPrice: 0,
        nativePrice: 0,
      }]
    }
  }

  // Comprehensive token analysis
  async analyzeToken(address: string, chain: string = 'eth'): Promise<TokenAnalysis> {
    try {
      console.log('🔍 Starting token analysis for:', address)
      
      // Fetch data with error handling for each endpoint
      let metadata: TokenMetadata | null = null
      let stats: TokenStats | null = null
      let holders: TokenHolder[] = []
      let transfers: TokenTransfer[] = []
      let priceData: TokenPrice[] = []

      // Try to get metadata
      try {
        metadata = await this.getTokenMetadata(address, chain)
        console.log('✅ Metadata:', metadata)
      } catch (error) {
        console.warn('Failed to fetch metadata:', error)
        metadata = {
          address,
          name: 'Unknown Token',
          symbol: 'UNKNOWN',
          decimals: 18,
          possible_spam: false,
        }
      }

      // Try to get stats
      try {
        stats = await this.getTokenStats(address, chain)
        console.log('✅ Stats:', stats)
      } catch (error) {
        console.warn('Failed to fetch stats:', error)
        stats = {
          total_transfers: 0,
          total_holders: 0,
          total_supply: "0",
          total_liquidity: 0,
          volume_24h: 0,
          price_change_24h: 0,
        }
      }

      // Try to get holders
      try {
        holders = await this.getTokenHolders(address, chain, 5)
        console.log('✅ Holders:', holders)
      } catch (error) {
        console.warn('Failed to fetch holders:', error)
        holders = []
      }

      // Try to get transfers
      try {
        transfers = await this.getTokenTransfers(address, chain, 20)
        console.log('✅ Transfers count:', transfers.length)
      } catch (error) {
        console.warn('Failed to fetch transfers:', error)
        transfers = []
      }

      // Try to get price
      try {
        priceData = await this.getTokenPrice(address, chain)
        console.log('✅ Price data:', priceData)
      } catch (error) {
        console.warn('Failed to fetch price:', error)
        priceData = []
      }

      const price = priceData[0] || { token_address: address, usdPrice: 0, nativePrice: 0 }

      // Calculate risk score and factors
      const { riskScore, riskFactors } = this.calculateRiskScore({
        metadata: metadata!,
        stats: stats!,
        holders,
        transfers,
        price,
      })

      console.log('✅ Final risk score:', riskScore, 'Factors:', riskFactors)

      return {
        metadata: metadata!,
        stats: stats!,
        holders,
        transfers,
        price,
        riskScore,
        riskFactors,
      }
    } catch (error) {
      console.error('Error analyzing token:', error)
      throw error
    }
  }

  // Calculate risk score based on various factors
  private calculateRiskScore(data: {
    metadata: TokenMetadata
    stats: TokenStats
    holders: TokenHolder[]
    transfers: TokenTransfer[]
    price: TokenPrice
  }): { riskScore: number; riskFactors: string[] } {
    const { metadata, stats, holders, transfers, price } = data
    let riskScore = 0
    const riskFactors: string[] = []

    // Check for spam indicators
    if (metadata.possible_spam) {
      riskScore += 30
      riskFactors.push('Token flagged as possible spam')
    }

    // Check holder concentration
    const topHolderShare = holders[0]?.share || 0
    if (topHolderShare > 50) {
      riskScore += 25
      riskFactors.push('High concentration in top holder')
    } else if (topHolderShare > 20) {
      riskScore += 15
      riskFactors.push('Moderate concentration in top holder')
    }

    // Check total holders - adjust for well-known tokens
    const isWellKnownToken = ['USDT', 'USDC', 'DAI', 'WETH', 'WBTC'].includes(metadata.symbol?.toUpperCase() || '')
    
    if (isWellKnownToken) {
      // Well-known tokens get a bonus (lower risk)
      riskScore = Math.max(0, riskScore - 20)
      if (riskScore < 20) {
        riskFactors.push('Well-known stablecoin/token - lower risk')
      }
    } else {
      // For unknown tokens, check holder count
      if (stats.total_holders < 100) {
        riskScore += 20
        riskFactors.push('Very few token holders')
      } else if (stats.total_holders < 1000) {
        riskScore += 10
        riskFactors.push('Low number of token holders')
      }
    }

    // Check liquidity - adjust for well-known tokens
    if (!isWellKnownToken) {
      if (stats.total_liquidity < 10000) {
        riskScore += 20
        riskFactors.push('Very low liquidity')
      } else if (stats.total_liquidity < 100000) {
        riskScore += 10
        riskFactors.push('Low liquidity')
      }
    }

    // Check transfer activity - well-known tokens have high activity
    if (isWellKnownToken) {
      // Well-known tokens typically have high transfer activity
      if (stats.total_transfers > 1000000) {
        riskScore = Math.max(0, riskScore - 10)
        riskFactors.push('High transfer activity - typical for established tokens')
      }
    } else {
      if (stats.total_transfers < 100) {
        riskScore += 15
        riskFactors.push('Very low transfer activity')
      } else if (stats.total_transfers < 1000) {
        riskScore += 8
        riskFactors.push('Low transfer activity')
      }
    }

    // Check price volatility (if price data available)
    if (price.usdPrice > 0 && Math.abs(stats.price_change_24h) > 50) {
      riskScore += 15
      riskFactors.push('High price volatility')
    }

    // Normalize risk score to 0-100
    riskScore = Math.min(riskScore, 100)

    return { riskScore, riskFactors }
  }
}

// Export singleton instance
export const moralisAPI = new MoralisAPI() 