# Data Accuracy and API Limitations

## Overview
This document explains the data accuracy improvements made to the Risk Analysis Card and the limitations of the Moralis API.

## Issues Found and Fixed

### 1. **Transfer Count Estimation**
**Problem:** The original code was using unrealistic multipliers (50x for well-known tokens, 10x for unknown tokens) which created wildly inaccurate numbers.

**Fix:** 
- More conservative estimation: 20x for well-known tokens, 5x for unknown tokens
- Clear indication when data is estimated vs. real
- Better logging to show estimation process

### 2. **Holder Count Fabrication**
**Problem:** Moralis API doesn't provide real holder counts, so the code was completely fabricating these numbers.

**Fix:**
- More conservative holder-to-transfer ratios
- Clear labeling that holder counts are always estimated
- Better documentation of the estimation process

### 3. **Liquidity Data**
**Problem:** Moralis API doesn't provide liquidity data, so it was always showing $0.

**Fix:**
- Clear indication that liquidity data is unavailable
- Suggestion to integrate with DEX APIs for real liquidity data

### 4. **Risk Assessment Thresholds**
**Problem:** Risk thresholds were too lenient, not catching truly risky tokens.

**Fix:**
- More conservative risk thresholds
- Better differentiation between well-known and unknown tokens
- More accurate risk scoring

## Current Data Sources

### ✅ Real Data (When Available)
- **Token Metadata:** Name, symbol, decimals from transfers endpoint
- **Recent Transfers:** Last 100 transfers (Moralis limit)
- **Price Data:** When available from prices endpoint
- **24h Price Change:** When available from price data

### ⚠️ Estimated Data
- **Total Transfers:** Estimated when > 100 (API limit)
- **Holder Counts:** Always estimated (no real endpoint available)
- **24h Volume:** Calculated from recent transfer samples

### ❌ Unavailable Data
- **Liquidity:** Not provided by Moralis API
- **Total Supply:** Not easily accessible
- **Real-time Holder Balances:** No endpoint available

## API Limitations

### Moralis Free Tier Limits
- **Transfer History:** Maximum 100 transfers per request
- **Rate Limits:** Limited API calls per minute
- **Data Availability:** Some endpoints may not work for all tokens

### Missing Endpoints
- **Token Holders:** No `/owners` or similar endpoint
- **Liquidity Data:** No DEX integration
- **Total Supply:** Not directly accessible

## Recommendations for Better Data

### 1. **DEX Integration**
To get real liquidity data, integrate with:
- Uniswap V3 API
- SushiSwap API
- PancakeSwap API (for BSC tokens)

### 2. **Alternative APIs**
Consider using:
- **Etherscan API:** For more detailed transaction data
- **CoinGecko API:** For price and market data
- **DexTools API:** For DEX-specific data

### 3. **Blockchain RPC**
For real-time data:
- Direct blockchain queries
- Event listening for transfers
- Balance tracking

## Risk Assessment Improvements

### More Conservative Thresholds
- **Transfer Activity:** < 20 (high risk), < 100 (medium risk)
- **Holder Count:** < 100 (high risk), < 500 (medium risk)
- **Liquidity:** < $25k (high risk), < $100k (medium risk)

### Better Token Classification
- **Well-known tokens:** USDT, USDC, DAI, WETH, WBTC, AAVE
- **Special handling:** Reduced risk scores for established tokens
- **Unknown tokens:** More stringent risk assessment

## User Interface Improvements

### Data Transparency
- **Info Icons:** Indicate estimated vs. real data
- **Labels:** "(est.)" for estimated values
- **Explanations:** Clear documentation of data sources

### Risk Communication
- **Conservative Estimates:** Better safe than sorry
- **Clear Warnings:** When data is unavailable
- **Educational Content:** Help users understand limitations

## Conclusion

The updated Risk Analysis Card now provides:
1. **More accurate data** when available
2. **Clear indication** of estimated vs. real data
3. **Conservative estimates** to avoid false confidence
4. **Better risk assessment** with realistic thresholds
5. **Transparent communication** about API limitations

This ensures users make informed decisions based on the best available data while understanding the limitations of the current API integration. 