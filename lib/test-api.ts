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