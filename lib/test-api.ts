// Test file to verify Moralis API integration
// Run with: npx tsx lib/test-api.ts

import { moralisAPI } from './api'

async function testAPI() {
  try {
    console.log('🧪 Testing Moralis API Integration...')
    
    // Test with USDT token address
    const testAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7' // USDT
    
    console.log(`📊 Analyzing token: ${testAddress}`)
    
    const analysis = await moralisAPI.analyzeToken(testAddress)
    
    console.log('✅ API Test Successful!')
    console.log('📋 Results:')
    console.log(`- Token: ${analysis.metadata.name} (${analysis.metadata.symbol})`)
    console.log(`- Risk Score: ${analysis.riskScore}/100`)
    console.log(`- Total Holders: ${analysis.stats.total_holders.toLocaleString()}`)
    console.log(`- Total Transfers: ${analysis.stats.total_transfers.toLocaleString()}`)
    console.log(`- USD Price: $${analysis.price.usdPrice}`)
    console.log(`- Risk Factors: ${analysis.riskFactors.length}`)
    
    if (analysis.riskFactors.length > 0) {
      console.log('⚠️  Risk Factors:')
      analysis.riskFactors.forEach((factor, index) => {
        console.log(`  ${index + 1}. ${factor}`)
      })
    }
    
  } catch (error) {
    console.error('❌ API Test Failed:', error)
    console.log('💡 Make sure your .env.local file contains the correct Moralis API key')
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testAPI()
}

export { testAPI } 