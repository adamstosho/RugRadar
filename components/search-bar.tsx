"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle } from "lucide-react"

interface SearchBarProps {
  onSearch: (address: string) => void
  isLoading?: boolean
}

export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [address, setAddress] = useState("")
  const [error, setError] = useState("")

  const validateAddress = (addr: string): boolean => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/
    return ethAddressRegex.test(addr)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!address.trim()) {
      setError("Please enter a token contract address")
      return
    }

    if (!validateAddress(address)) {
      setError("Please enter a valid Ethereum address (0x...)")
      return
    }

    onSearch(address)
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Enter ERC-20 token contract address (0x...)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 h-12 text-lg"
            disabled={isLoading}
          />
          {error && (
            <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 hover:bg-green-700 text-white h-12 px-8 text-lg font-semibold"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Analyzing...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Analyze Token
            </div>
          )}
        </Button>
      </form>
    </div>
  )
}
