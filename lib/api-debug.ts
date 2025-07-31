// Debug API to test different Moralis endpoint structures

export async function testMoralisEndpoints(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY || ''
  const baseUrl = 'https://deep-index.moralis.io/api/v2'
  
  console.log('🔍 Testing Moralis API endpoints...')
  console.log(`Address: ${address}`)
  console.log(`API Key: ${apiKey.slice(0, 20)}...`)
  
  const headers = {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json',
  }

  const endpoints = [
    {
      name: 'Token Transfers (Working)',
      url: `${baseUrl}/erc20/${address}/transfers?chain=eth&limit=5`,
      method: 'GET'
    },
    {
      name: 'Token Transfers with Metadata',
      url: `${baseUrl}/erc20/${address}/transfers?chain=eth&limit=1`,
      method: 'GET'
    },
    {
      name: 'Token Transfers - More Data',
      url: `${baseUrl}/erc20/${address}/transfers?chain=eth&limit=20`,
      method: 'GET'
    }
  ]

  for (const endpoint of endpoints) {
    try {
      console.log(`\n📡 Testing: ${endpoint.name}`)
      console.log(`URL: ${endpoint.url}`)
      
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers,
        body: endpoint.body
      })
      
      console.log(`Status: ${response.status} ${response.statusText}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log(`✅ Success:`, JSON.stringify(data, null, 2).slice(0, 200) + '...')
      } else {
        const errorText = await response.text()
        console.log(`❌ Error:`, errorText.slice(0, 200))
      }
    } catch (error) {
      console.log(`💥 Exception:`, error)
    }
  }
}

// Test price endpoints specifically
export async function testPriceEndpoints(address: string) {
  const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY || ''
  const baseUrl = 'https://deep-index.moralis.io/api/v2'
  
  console.log('💰 Testing Price Endpoints...')
  console.log(`Address: ${address}`)
  
  const headers = {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json',
  }

  const priceEndpoints = [
    {
      name: 'Prices - tokens as objects format',
      url: `${baseUrl}/erc20/prices`,
      method: 'POST',
      body: JSON.stringify({
        tokens: [{
          token_address: address,
          chain: 'eth'
        }]
      })
    },
    {
      name: 'Prices - token_addresses format',
      url: `${baseUrl}/erc20/prices`,
      method: 'POST',
      body: JSON.stringify({
        token_addresses: [address],
        chain: 'eth'
      })
    },
    {
      name: 'Token Info (might have price)',
      url: `${baseUrl}/erc20/${address}?chain=eth`,
      method: 'GET'
    }
  ]

  for (const endpoint of priceEndpoints) {
    try {
      console.log(`\n💰 Testing: ${endpoint.name}`)
      console.log(`URL: ${endpoint.url}`)
      if (endpoint.body) {
        console.log(`Body: ${endpoint.body}`)
      }
      
      const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers,
        body: endpoint.body
      })
      
      console.log(`Status: ${response.status} ${response.statusText}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log(`✅ Success:`, JSON.stringify(data, null, 2).slice(0, 300) + '...')
      } else {
        const errorText = await response.text()
        console.log(`❌ Error:`, errorText.slice(0, 200))
      }
    } catch (error) {
      console.log(`💥 Exception:`, error)
    }
  }
}

// Test with USDT
if (typeof window !== 'undefined') {
  // Only run in browser
  window.testMoralisAPI = () => {
    testMoralisEndpoints('0xdAC17F958D2ee523a2206206994597C13D831ec7')
  }
  
  window.testPriceAPI = () => {
    testPriceEndpoints('0xdAC17F958D2ee523a2206206994597C13D831ec7')
  }
} 