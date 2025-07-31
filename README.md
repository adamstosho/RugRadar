# 🚀 RugRadar

**Advanced Rug Pull Detection Platform**

A comprehensive Web3 token analysis tool built with Next.js, TypeScript, and Moralis Web3 API to detect potential rug pull risks in ERC-20 tokens using advanced AI algorithms and real-time blockchain data analysis.

## ✨ Features

- **Real-time Token Analysis**: Analyze any ERC-20 token using Moralis Web3 API
- **Risk Scoring**: Advanced algorithm to calculate rug pull risk scores
- **Token Metadata**: Complete token information including name, symbol, logo, and decimals
- **Holder Analysis**: Top token holders with concentration analysis
- **Transfer History**: Recent token transfers with transaction details
- **Price Data**: Real-time USD and native token prices
- **Risk Factors**: Detailed breakdown of identified risk factors
- **Beautiful UI**: Modern, responsive design with dark theme

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **API**: Moralis Web3 Data API
- **State Management**: React hooks with custom useTokenAnalysis hook
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Moralis API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rug-pull-detector
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_MORALIS_API_KEY=your_moralis_api_key_here
   NEXT_PUBLIC_MORALIS_API_BASE=https://deep-index.moralis.io/api/v2
   ```

   **Get your Moralis API key:**
   - Sign up at [Moralis](https://moralis.io/)
   - Create a new project
   - Copy your API key from the project settings

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 API Integration

The project uses Moralis Web3 Data API with the following endpoints:

### Token Metadata
```
GET /erc20/{address}/metadata?chain=eth
```
Returns token name, symbol, logo, decimals, and spam indicators.

### Token Statistics
```
GET /erc20/{address}/stats?chain=eth
```
Provides total transfers, holders, liquidity, volume, and price change data.

### Token Holders
```
GET /erc20/{address}/owners?chain=eth&limit=5
```
Returns top token holders with balance and share percentage.

### Token Transfers
```
GET /erc20/{address}/transfers?chain=eth&limit=20
```
Fetches recent token transfers with transaction details.

### Token Price
```
POST /erc20/prices
```
Returns current USD and native token prices.

## 🧠 Risk Analysis Algorithm

The risk scoring system evaluates multiple factors:

- **Spam Detection**: Tokens flagged as possible spam (+30 points)
- **Holder Concentration**: Top holder percentage analysis (+15-25 points)
- **Total Holders**: Number of unique token holders (+10-20 points)
- **Liquidity**: Total liquidity assessment (+10-20 points)
- **Transfer Activity**: Transaction volume analysis (+8-15 points)
- **Price Volatility**: 24h price change analysis (+15 points)

**Risk Levels:**
- **0-30**: Low Risk (Green)
- **31-70**: Medium Risk (Yellow)
- **71-100**: High Risk (Red)

## 🎯 Usage

1. **Enter Token Address**: Paste any ERC-20 token contract address
2. **Analyze**: Click "Analyze Token" to fetch comprehensive data
3. **Review Results**: Examine the risk score, factors, and detailed metrics
4. **Investigate Further**: Use provided Etherscan links for additional research

## 📁 Project Structure

```
rug-pull-detector/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── search-bar.tsx    # Token search interface
│   ├── token-overview.tsx # Token metadata display
│   ├── risk-analysis-card.tsx # Risk metrics
│   ├── holders-list.tsx  # Top holders analysis
│   ├── transfers-table.tsx # Transfer history
│   └── flow-visualizer.tsx # Visual risk indicator
├── hooks/                # Custom React hooks
│   └── use-token-analysis.ts # API state management
├── lib/                  # Utility libraries
│   ├── api.ts           # Moralis API service
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## 🔧 Customization

### Adding New Risk Factors

Edit the `calculateRiskScore` method in `lib/api.ts`:

```typescript
// Add new risk factor
if (someCondition) {
  riskScore += points
  riskFactors.push('Description of risk factor')
}
```

### Modifying API Endpoints

Update the Moralis API service in `lib/api.ts`:

```typescript
async getCustomData(address: string, chain: string = 'eth') {
  return this.makeRequest(`/custom/endpoint?chain=${chain}`)
}
```

### Styling Changes

The project uses Tailwind CSS with a dark theme. Modify `app/globals.css` or component classes for styling updates.

## 🚨 Disclaimer

This tool is for educational and research purposes only. Always conduct your own research (DYOR) before making investment decisions. The risk analysis is based on available data and should not be considered financial advice.

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check the [Moralis documentation](https://docs.moralis.com/)
- Review the API integration guide above

---

**Built with ❤️ using Next.js and Moralis Web3 API** 