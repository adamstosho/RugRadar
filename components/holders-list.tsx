"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Crown, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TokenAnalysis } from "@/lib/api"

interface HoldersListProps {
  tokenData: TokenAnalysis
}

export default function HoldersList({ tokenData }: HoldersListProps) {
  const { holders, metadata } = tokenData

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: string) => {
    const num = Number.parseFloat(balance) / Math.pow(10, metadata.decimals)
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Top Token Holders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {holders.map((holder, index) => (
            <div key={holder.owner_address} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-bold text-sm">
                  #{index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-mono text-sm">{truncateAddress(holder.owner_address)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(holder.owner_address)}
                      className="h-6 w-6 p-0 hover:bg-gray-700"
                    >
                      <Copy className="h-3 w-3 text-gray-400" />
                    </Button>
                  </div>
                  <p className="text-gray-400 text-xs">{formatBalance(holder.balance)} tokens</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">{(holder.share).toFixed(6)}%</p>
                <div className="w-16 h-2 bg-gray-700 rounded-full mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                    style={{ width: `${(Math.min(holder.share * 2, 100))}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}

          {/* Concentration Warning */}
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
            <p className="text-yellow-400 text-sm font-semibold">⚠ Concentration Analysis</p>
            <p className="text-gray-300 text-sm mt-1">
              Top 5 holders control {holders.reduce((sum, holder) => sum + holder.share, 0).toFixed(1)}% of total supply
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
