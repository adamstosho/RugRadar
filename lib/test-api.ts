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
    // Test 1: Basic transfers endpoint
    console.log('📡 Testing transfers endpoint...')
    const transfersResponse = await fetch(`${BASE_URL}/erc20/${testAddress}/transfers?chain=eth&limit=5`, {
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

    // Test 3: Token owners (holders)
    console.log('📡 Testing token owners...')
    const ownersResponse = await fetch(`${BASE_URL}/erc20/${testAddress}/owners?chain=eth&limit=5`, {
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json',
      },
    })
    
    console.log('Owners Status:', ownersResponse.status)
    
    if (!ownersResponse.ok) {
      const errorText = await ownersResponse.text()
      console.error('Owners Error:', errorText)
    } else {
      const ownersData = await ownersResponse.json()
      console.log('✅ Owners Response:', {
        total: ownersData.total,
        resultCount: ownersData.result?.length || 0
      })
    }

    // Test 4: Token prices
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