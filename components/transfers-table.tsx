"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, Filter } from "lucide-react"
import { TokenAnalysis } from "@/lib/api"

interface TransfersTableProps {
  tokenData: TokenAnalysis
}

export default function TransfersTable({ tokenData }: TransfersTableProps) {
  const { transfers, metadata } = tokenData

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const formatValue = (value: string) => {
    const num = Number.parseFloat(value) / Math.pow(10, metadata.decimals)
    return num.toLocaleString(undefined, { maximumFractionDigits: 4 })
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      // Handle different timestamp formats
      if (!timestamp) return 'Unknown'
      
      // If it's a number (Unix timestamp), convert to milliseconds
      if (typeof timestamp === 'number') {
        return new Date(timestamp * 1000).toLocaleString()
      }
      
      // If it's a string, try to parse it
      let date: Date
      
      // Handle ISO string format
      if (timestamp.includes('T') || timestamp.includes('Z')) {
        date = new Date(timestamp)
      } else {
        // Handle Unix timestamp as string
        const timestampNum = parseInt(timestamp)
        if (!isNaN(timestampNum)) {
          date = new Date(timestampNum * 1000)
        } else {
          date = new Date(timestamp)
        }
      }
      
      if (isNaN(date.getTime())) {
        console.warn('Invalid timestamp:', timestamp)
        return 'Invalid Date'
      }
      
      return date.toLocaleString()
    } catch (error) {
      console.warn('Error formatting timestamp:', timestamp, error)
      return 'Invalid Date'
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-xl flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Recent Transfers
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 text-sm font-semibold py-3">From</th>
                <th className="text-center text-gray-400 text-sm font-semibold py-3"></th>
                <th className="text-left text-gray-400 text-sm font-semibold py-3">To</th>
                <th className="text-right text-gray-400 text-sm font-semibold py-3">Amount</th>
                <th className="text-right text-gray-400 text-sm font-semibold py-3">Time</th>
                <th className="text-center text-gray-400 text-sm font-semibold py-3">Tx</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer, index) => (
                <tr key={transfer.transaction_hash +" "+index} className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="py-4">
                    <div className="font-mono text-sm text-white">{truncateAddress(transfer.from_address)}</div>
                  </td>
                  <td className="py-4 text-center">
                    <ArrowRight className="h-4 w-4 text-gray-400 mx-auto" />
                  </td>
                  <td className="py-4">
                    <div className="font-mono text-sm text-white">{truncateAddress(transfer.to_address)}</div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="text-white font-semibold">{formatValue(transfer.value)}</div>
                  </td>
                  <td className="py-4 text-right">
                    <div className="text-gray-300 text-sm">{formatTimestamp(transfer.timestamp)}</div>
                  </td>
                  <td className="py-4 text-center">
                    <a
                      href={`https://etherscan.io/tx/${transfer.transaction_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-700">
                        <ExternalLink className="h-4 w-4 text-blue-400" />
                      </Button>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
            View More Transfers
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
