# 🔧 Environment Setup Guide

## Quick Fix for Static Data Issue

The static data you're seeing (1,000,000 transfers, 50,000 holders) is because the API calls are failing or returning empty data. Here's how to fix it:

### 1. Create Environment File

Create a file called `.env.local` in your project root (same folder as `package.json`):

```bash
# Copy this content to .env.local
NEXT_PUBLIC_MORALIS_API_KEY=your_actual_moralis_api_key_here
NEXT_PUBLIC_MORALIS_API_BASE=https://deep-index.moralis.io/api/v2
```

### 2. Get Your API Key

1. Go to [Moralis](https://moralis.io/)
2. Sign up/Login
3. Create a new project
4. Go to "Settings" → "API Keys"
5. Copy your API key
6. Replace `your_actual_moralis_api_key_here` with your real key

### 3. Restart Your Development Server

```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
```

### 4. Test with Real Token Addresses

Try these known tokens:

- **USDT**: `0xdAC17F958D2ee523a2206206994597C13D831ec7`
- **USDC**: `0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8C`
- **DAI**: `0x6B175474E89094C44Da98b954EedeAC495271d0F`

### 5. Use Debug Panel

After entering a token address, click "Show API Debug Panel" to see:
- ✅/❌ API key status
- ✅/❌ Each API endpoint status
- Raw response data
- Error messages

## Common Issues

### "API Key Not Configured"
- Make sure `.env.local` exists
- Make sure you replaced the placeholder with your real key
- Restart the development server

### "Token Not Found"
- Verify the contract address is correct
- Make sure it's an Ethereum mainnet address
- Try with known tokens first

### "Rate Limit Exceeded"
- Wait a few minutes
- Upgrade your Moralis plan if needed

## What Was Fixed

✅ **Real API Data**: Now fetches actual transfer counts and holder data
✅ **Better Error Handling**: Shows specific error messages
✅ **Debug Panel**: Helps troubleshoot API issues
✅ **Fallback Logic**: Uses real data when available, estimates when not

The static numbers you saw were hardcoded estimates. Now it will show real data from the blockchain! 