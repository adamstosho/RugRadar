// Simple API test to verify Moralis endpoints
const API_KEY = process.env.NEXT_PUBLIC_MORALIS_API_KEY
const BASE_URL = 'https://deep-index.moralis.io/api/v2'

export async function testMoralisAPI() {
  console.log('🔍 Testing Moralis API...')
  console.log('API Key:', API_KEY ? 'Configured' : 'Missing')
  
  if (!API_KEY) {
    throw new Error('API key not configured')
  }

  const testAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7' // USDT
  
  try {
    // Test 1: Basic transfers endpoint (limit 100 - max allowed)
    console.log('📡 Testing transfers endpoint...')
    const transfersResponse = await fetch(`${BASE_URL}/erc20/${testAddress}/transfers?chain=eth&limit=100`, {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    })
    
    console.log('Transfers Status:', transfersResponse.status)
    
    if (!transfersResponse.ok) {
      const errorText = await transfersResponse.text()
      console.error('Transfers Error:', errorText)
      throw new Error(`Transfers failed: ${transfersResponse.status} ${errorText}`)
    }
    
    const transfersData = await transfersResponse.json()
    console.log('✅ Transfers Response:', {
      total: transfersData.total,
      resultCount: transfersData.result?.length || 0,
      firstTransfer: transfersData.result?.[0] ? 'Found' : 'None'
    })

    // Test 2: Token metadata
    console.log('📡 Testing token metadata...')
    const metadataResponse = await fetch(`${BASE_URL}/erc20/${testAddress}?chain=eth`, {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    })
    
    console.log('Metadata Status:', metadataResponse.status)
    
    if (!metadataResponse.ok) {
      const errorText = await metadataResponse.text()
      console.error('Metadata Error:', errorText)
    } else {
      const metadataData = await metadataResponse.json()
      console.log('✅ Metadata Response:', {
        name: metadataData.name,
        symbol: metadataData.symbol,
        decimals: metadataData.decimals
      })
    }

    // Test 3: Token prices
    console.log('📡 Testing token prices...')
    const pricesResponse = await fetch(`${BASE_URL}/erc20/prices`, {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokens: [{
          token_address: testAddress,
          chain: 'eth'
        }]
      }),
    })
    
    console.log('Prices Status:', pricesResponse.status)
    
    if (!pricesResponse.ok) {
      const errorText = await pricesResponse.text()
      console.error('Prices Error:', errorText)
    } else {
      const pricesData = await pricesResponse.json()
      console.log('✅ Prices Response:', {
        count: pricesData.length,
        firstPrice: pricesData[0]?.usdPrice || 'N/A'
      })
    }

    console.log('🎉 All API tests completed!')
    return {
      success: true,
      message: 'API is working correctly'
    }

  } catch (error) {
    console.error('❌ API test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Detailed test to check transfer and holder data accuracy
export async function testTransferAndHolderAccuracy() {
  console.log('🔍 Testing transfer and holder data accuracy...')
  
  if (!API_KEY) {
    throw new Error('API key not configured')
  }

  const testAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7' // USDT
  
  try {
    // Test transfers with different limits to see what we get
    console.log('📡 Testing transfers with different limits...')
    
    const limits = [10, 50, 100]
    for (const limit of limits) {
      console.log(`\n--- Testing with limit ${limit} ---`)
      
      const response = await fetch(`${BASE_URL}/erc20/${testAddress}/transfers?chain=eth&limit=${limit}`, {
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log(`Limit ${limit}:`, {
          total: data.total,
          resultCount: data.result?.length || 0,
          hasTotal: !!data.total,
          sampleTransfer: data.result?.[0] ? {
            from: data.result[0].from_address,
            to: data.result[0].to_address,
            value: data.result[0].value,
            timestamp: data.result[0].block_timestamp
          } : 'None'
        })
      } else {
        console.log(`Limit ${limit} failed:`, response.status)
      }
    }

    // Test holder estimation logic
    console.log('\n📊 Testing holder estimation logic...')
    const transfersResponse = await fetch(`${BASE_URL}/erc20/${testAddress}/transfers?chain=eth&limit=100`, {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    })
    
    if (transfersResponse.ok) {
      const transfersData = await transfersResponse.json()
      
      // Simulate the holder estimation logic
      const holders = new Map<string, { value: number, count: number }>()
      
      if (transfersData.result) {
        transfersData.result.forEach((transfer: any) => {
          const fromAddr = transfer.from_address
          const toAddr = transfer.to_address
          const value = parseFloat(transfer.value || '0')
          
          if (fromAddr && fromAddr !== '0x0000000000000000000000000000000000000000') {
            const current = holders.get(fromAddr) || { value: 0, count: 0 }
            holders.set(fromAddr, { value: current.value + value, count: current.count + 1 })
          }
          
          if (toAddr && toAddr !== '0x0000000000000000000000000000000000000000') {
            const current = holders.get(toAddr) || { value: 0, count: 0 }
            holders.set(toAddr, { value: current.value + value, count: current.count + 1 })
          }
        })
      }
      
      console.log('Holder estimation results:', {
        uniqueAddresses: holders.size,
        totalTransfers: transfersData.total || transfersData.result?.length || 0,
        topHolders: Array.from(holders.entries())
          .sort((a, b) => b[1].value - a[1].value)
          .slice(0, 5)
          .map(([addr, data]) => ({
            address: addr.slice(0, 10) + '...',
            value: data.value,
            count: data.count
          }))
      })
    }

    return {
      success: true,
      message: 'Transfer and holder accuracy test completed'
    }

  } catch (error) {
    console.error('❌ Transfer and holder accuracy test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Test function that can be called from browser
export async function testAPIFromBrowser() {
  try {
    const result = await testMoralisAPI()
    console.log('Test Result:', result)
    return result
  } catch (error) {
    console.error('Browser test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
} 

// Test the improved holder and risk analysis calculations
export async function testImprovedAnalysis() {
  console.log('🔍 Testing improved holder and risk analysis...')

  if (!API_KEY) {
    throw new Error('API key not configured')
  }

  const testAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7' // USDT

  try {
    // Test the improved holder calculation
    console.log('\n📊 Testing improved holder calculation...')
    
    const transfersResponse = await fetch(`${BASE_URL}/erc20/${testAddress}/transfers?chain=eth&limit=100`, {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (transfersResponse.ok) {
      const transfersData = await transfersResponse.json()

      // Simulate the improved holder calculation logic
      const balances = new Map<string, { balance: number, lastActivity: number }>()

      if (transfersData.result) {
        transfersData.result.forEach((transfer: any) => {
          const fromAddr = transfer.from_address
          const toAddr = transfer.to_address
          const value = parseFloat(transfer.value || '0')
          
          // Parse timestamp
          let transferTime = 0
          if (transfer.block_timestamp) {
            transferTime = new Date(transfer.block_timestamp).getTime()
          }

          // Update sender balance (decrease)
          if (fromAddr && fromAddr !== '0x0000000000000000000000000000000000000000') {
            const current = balances.get(fromAddr) || { balance: 0, lastActivity: 0 }
            balances.set(fromAddr, { 
              balance: Math.max(0, current.balance - value),
              lastActivity: Math.max(current.lastActivity, transferTime)
            })
          }
          
          // Update receiver balance (increase)
          if (toAddr && toAddr !== '0x0000000000000000000000000000000000000000') {
            const current = balances.get(toAddr) || { balance: 0, lastActivity: 0 }
            balances.set(toAddr, { 
              balance: current.balance + value,
              lastActivity: Math.max(current.lastActivity, transferTime)
            })
          }
        })
      }

      // Filter and sort holders
      const now = Date.now()
      const oneMonthAgo = now - (30 * 24 * 60 * 60 * 1000)
      
      const activeHolders = Array.from(balances.entries())
        .filter(([_, data]) => data.balance > 0 && data.lastActivity > oneMonthAgo)
        .sort((a, b) => b[1].balance - a[1].balance)
        .slice(0, 5)
      
      const totalBalance = activeHolders.reduce((sum, [_, data]) => sum + data.balance, 0)
      
      const holderArray = activeHolders.map(([address, data]) => ({
        owner_address: address,
        balance: data.balance.toString(),
        share: totalBalance > 0 ? (data.balance / totalBalance) * 100 : 0
      }))

      console.log('Improved holder analysis results:', {
        totalUniqueAddresses: balances.size,
        activeAddresses: activeHolders.length,
        totalBalance: totalBalance,
        topHolders: holderArray.map(h => ({
          address: h.owner_address.slice(0, 10) + '...',
          balance: h.balance,
          share: h.share.toFixed(2) + '%'
        })),
        topHolderShare: holderArray[0]?.share || 0,
        top5HolderShare: holderArray.reduce((sum, h) => sum + h.share, 0)
      })

      // Test risk analysis
      console.log('\n📊 Testing improved risk analysis...')
      
      const mockStats = {
        total_transfers: transfersData.total || transfersData.result?.length || 0,
        total_holders: activeHolders.length,
        total_liquidity: 0,
        volume_24h: 0,
        price_change_24h: 0
      }

      const mockMetadata = {
        symbol: 'USDT',
        possible_spam: false
      }

      // Simulate risk calculation
      let riskScore = 0
      const riskFactors: string[] = []

      // Check holder concentration
      if (holderArray.length > 0) {
        const topHolderShare = holderArray[0]?.share || 0
        const top5HolderShare = holderArray.reduce((sum, h) => sum + h.share, 0)
        
        if (topHolderShare > 50) {
          riskScore += 35
          riskFactors.push(`Extremely high concentration: Top holder controls ${topHolderShare.toFixed(1)}%`)
        } else if (topHolderShare > 20) {
          riskScore += 25
          riskFactors.push(`High concentration: Top holder controls ${topHolderShare.toFixed(1)}%`)
        }
        
        if (top5HolderShare > 80) {
          riskScore += 20
          riskFactors.push(`Top 5 holders control ${top5HolderShare.toFixed(1)}% - Very concentrated`)
        }
      }

      // Well-known token reduction
      if (mockMetadata.symbol === 'USDT') {
        riskScore = Math.max(0, riskScore - 40)
        riskFactors.push('Well-known token - significantly lower risk')
      }

      console.log('Improved risk analysis results:', {
        finalScore: Math.min(riskScore, 100),
        factors: riskFactors,
        holderConcentration: holderArray[0]?.share || 0
      })

      return {
        success: true,
        message: 'Improved analysis test completed successfully',
        holderAnalysis: {
          totalHolders: activeHolders.length,
          topHolderShare: holderArray[0]?.share || 0,
          top5HolderShare: holderArray.reduce((sum, h) => sum + h.share, 0)
        },
        riskAnalysis: {
          score: Math.min(riskScore, 100),
          factors: riskFactors
        }
      }
    }

    return {
      success: false,
      error: 'Failed to fetch transfer data'
    }

  } catch (error) {
    console.error('❌ Improved analysis test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
} 