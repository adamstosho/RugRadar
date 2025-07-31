# RugRadar 🛡️

**Advanced Web3 Security Platform for Detecting Rug Pulls Before They Happen**

RugRadar is a comprehensive Web3 analytics platform that protects your cryptocurrency investments by providing real-time security analysis and risk assessment for ERC-20 tokens. Our advanced algorithms analyze multiple data points to identify potential rug pulls and malicious token projects before they can harm investors.

##  Problem We Solve

The cryptocurrency market is filled with malicious token projects that can result in significant financial losses for investors. Rug pulls, where developers abandon projects and steal investor funds, are becoming increasingly common. RugRadar addresses this critical issue by:

- **Preventing Financial Losses**: Identify risky tokens before investing
- **Real-time Monitoring**: Detect suspicious activities as they happen
- **Data Transparency**: Provide clear, understandable risk assessments
- **Community Protection**: Help protect the entire Web3 community

##  Key Features

###  **Advanced Security Analysis**
- Comprehensive risk assessment using multiple data points
- AI-powered algorithms for pattern recognition
- Real-time threat detection and alerts

###  **Token Analytics Dashboard**
- **Risk Analysis Card**: Detailed risk scoring and factor breakdown
- **Token Overview**: Complete token information and metadata
- **Transfer History**: Real-time transaction monitoring
- **Holder Analysis**: Distribution and concentration analysis

###  **Risk Assessment Features**
- **Transfer Activity Analysis**: Monitor transaction patterns
- **Holder Concentration**: Identify whale dominance
- **Liquidity Analysis**: Assess market stability
- **Price Volatility**: Track suspicious price movements
- **24h Volume Tracking**: Monitor trading activity

###  **Modern User Interface**
- Beautiful, responsive design with dark theme
- Smooth animations and transitions
- Mobile-friendly interface
- Real-time data updates

##  Technology Stack

### **Frontend**
- **React 19** - Modern React with latest features
- **Next.js 15** - Full-stack React framework
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions

### **UI Components**
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Shadcn/ui** - Modern component library
- **React Hook Form** - Form handling and validation

### **Backend & APIs**
- **Moralis Web3 API** - Blockchain data and analytics
- **Ethereum Integration** - ERC-20 token analysis
- **Real-time Data** - Live blockchain monitoring

### **Development Tools**
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm
- Moralis API key (for blockchain data)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rugradar.git
   cd rugradar
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
   ```

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

## 📖 How to Use RugRadar

### **Step 1: Access the Dashboard**
- Visit the homepage and click "Start Analysis"
- Or navigate directly to `/dashboard`

### **Step 2: Enter Token Address**
- Paste any ERC-20 token contract address in the search bar
- Supported formats: `0x...` (Ethereum addresses)
- Click "Analyze Token" to begin

### **Step 3: Review Analysis Results**
The dashboard will display comprehensive analysis including:

#### **Risk Analysis Card**
- **Total Transfers**: Transaction activity level
- **Token Holders**: Distribution analysis
- **Total Liquidity**: Market stability assessment
- **24h Volume**: Recent trading activity
- **Risk Factors**: Detailed risk breakdown

#### **Token Overview**
- Token name, symbol, and logo
- Current price and 24h change
- Risk score (0-100 scale)
- Security status indicators

#### **Transfer History**
- Recent transactions
- Transaction details and timestamps
- Gas usage analysis

#### **Holder Analysis**
- Top token holders
- Concentration percentages
- Distribution patterns

### **Step 4: Interpret Results**
- **Green indicators**: Low risk, safe to consider
- **Yellow indicators**: Moderate risk, proceed with caution
- **Red indicators**: High risk, avoid investment
- **Data accuracy notices**: Understand estimation 

# Preview of the App Interface (Screenshot)

![screenshot](/public/screenshots/screencapture-rugradar-vercel-app-2025-07-31-18_45_15.png)
The app's landing page

![screenshot](/public/screenshots/screencapture-rugradar-vercel-app-dashboard-2025-07-31-18_45_28.png)
App interface before pasting the contract address

![screenshot](/public/screenshots/screencapture-rugradar-vercel-app-dashboard-2025-07-31-18_46_00.png)
App analysis showing the low risk of the coin

![screenshot](/public/screenshots/screencapture-rugradar-vercel-app-dashboard-2025-07-31-18_46_30.png)
App analysis showing the high risk of the coin

![screenshot](/public/screenshots/screencapture-rugradar-vercel-app-dashboard-2025-07-31-18_46_58.png)
Same as above


## 🔧 Project Structure

```
rugradar/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Main dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── risk-analysis-card.tsx
│   ├── token-overview.tsx
│   ├── transfers-table.tsx
│   └── search-bar.tsx
├── hooks/                # Custom React hooks
│   └── use-token-analysis.ts
├── lib/                  # Utility functions and APIs
│   ├── api.ts           # API types and interfaces
│   ├── api-fixed.ts     # Moralis API implementation
│   └── utils.ts         # Helper functions
├── public/              # Static assets
└── styles/              # Additional stylesheets
```

##  Data Accuracy & Limitations

### **Real Data Available**
- Token metadata (name, symbol, decimals)
- Recent transfers (last 100 transactions)
- Price data (when available)
- 24h price changes

### **Estimated Data**
- Total transfer counts (when > 1000)
- Holder counts (always estimated)
- 24h volume (calculated from samples)

### **Unavailable Data**
- Real-time liquidity (requires DEX integration)
- Total supply (not easily accessible)
- Real-time holder balances

**Note**: RugRadar clearly indicates when data is estimated vs. real to ensure transparency.

##  Deployment

### **Vercel (Recommended)**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### **Other Platforms**
- **Netlify**: Compatible with Next.js
- **Railway**: Easy deployment with environment variables
- **AWS/GCP**: Use Docker containers

##  Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **Moralis** for providing excellent Web3 APIs
- **Next.js team** for the amazing framework
- **Vercel** for seamless deployment
- **Web3 community** for inspiration and feedback

##  Support

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check this README and code comments
- **Community**: Join our discussions and share feedback

## 🔮 Roadmap

- [ ] DEX integration for real liquidity data
- [ ] Multi-chain support (BSC, Polygon, etc.)
- [ ] Advanced AI risk prediction
- [ ] Community-driven risk reports
- [ ] Mobile app development
- [ ] API for third-party integrations

---

**Built with ❤️ by ART_Redox for the Web3 community**

*Protect your investments. Detect rug pulls before they happen.* 