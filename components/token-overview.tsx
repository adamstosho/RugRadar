"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, ExternalLink } from "lucide-react"
import Image from "next/image"
import { TokenAnalysis } from "@/lib/api"

interface TokenOverviewProps {
  tokenData: TokenAnalysis
}

export default function TokenOverview({ tokenData }: TokenOverviewProps) {
  const { metadata, price, riskScore } = tokenData
  const isSafe = riskScore < 50
  
  // Debug log to see the metadata structure
  console.log('TokenOverview metadata:', metadata)
  console.log('Token logo URL:', metadata.tokenLogo)

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Token Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Token Info */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={metadata.tokenLogo || "/placeholder.svg"}
                alt={`${metadata.name} logo`}
                width={64}
                height={64}
                className="rounded-full border-2 border-gray-700"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{metadata.name}</h3>
              <p className="text-gray-300 text-lg">{metadata.symbol}</p>
              <p className="text-gray-400 text-sm font-mono">
                {metadata.address.slice(0, 10)}...{metadata.address.slice(-8)}
              </p>
            </div>
          </div>

          {/* Price Info */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">USD Price</p>
              <p className="text-white text-2xl font-bold">
                ${price.usdPrice > 0 ? price.usdPrice.toLocaleString() : 'N/A'}
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Native Price</p>
              <p className="text-white text-2xl font-bold">
                {price.nativePrice > 0 ? `${(price.nativePrice).toFixed(6)} ETH` : 'N/A'}
              </p>
            </div>
          </div>

          {/* Safety Status */}
          <div className="flex flex-col items-center justify-center">
            <Badge
              variant={isSafe ? "default" : "destructive"}
              className={`text-lg px-6 py-2 ${
                isSafe ? "bg-green-600 hover:bg-green-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {isSafe ? (
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />✅ Looks Safe
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />🚨 High Risk
                </div>
              )}
            </Badge>
            <p className="mt-2 text-gray-400 text-sm">Risk Score: {riskScore}/100</p>
            <a 
              href={`https://etherscan.io/token/${metadata.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
            >
              View on Etherscan
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
