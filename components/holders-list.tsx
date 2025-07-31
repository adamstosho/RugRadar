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

  const getProgressWidthClass = (share: number) => {
    const width = Math.min(share * 2, 100)
    if (width <= 10) return 'w-[10%]'
    if (width <= 20) return 'w-[20%]'
    if (width <= 30) return 'w-[30%]'
    if (width <= 40) return 'w-[40%]'
    if (width <= 50) return 'w-[50%]'
    if (width <= 60) return 'w-[60%]'
    if (width <= 70) return 'w-[70%]'
    if (width <= 80) return 'w-[80%]'
    if (width <= 90) return 'w-[90%]'
    return 'w-full'
  }

  const truncateAddress = (address: string) => {
    if (!address) return 'Unknown'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatBalance = (balance: string) => {
    if (!balance || !metadata?.decimals) return '0'
    try {
      const num = Number.parseFloat(balance) / Math.pow(10, metadata.decimals)
      return num.toLocaleString(undefined, { maximumFractionDigits: 2 })
    } catch (error) {
      console.warn('Error formatting balance:', balance, error)
      return '0'
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      // You could add a toast notification here
    } catch (error) {
      console.warn('Failed to copy to clipboard:', error)
    }
  }

  // Handle empty holders
  if (!holders || holders.length === 0) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <Crown className="h-5 w-5" />
            Top Token Holders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-400">No holder data available for this token</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalShare = holders.reduce((sum, holder) => sum + (holder.share || 0), 0)

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white text-xl flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Top Token Holders ({holders.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {holders.map((holder, index) => (
            <div key={holder.owner_address || index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
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
                <p className="text-white font-semibold">{(holder.share || 0).toFixed(6)}%</p>
                <div className="w-16 h-2 bg-gray-700 rounded-full mt-1">
                  <div
                    className={`h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full ${getProgressWidthClass(holder.share || 0)}`}
                  ></div>
                </div>
              </div>
            </div>
          ))}

          {/* Concentration Warning */}
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
            <p className="text-yellow-400 text-sm font-semibold">⚠ Concentration Analysis</p>
            <p className="text-gray-300 text-sm mt-1">
              Top {holders.length} holders control {totalShare.toFixed(1)}% of total supply
            </p>
            {totalShare > 80 && (
              <p className="text-red-400 text-xs mt-1">
                ⚠️ High concentration detected - potential risk factor
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
