"use client"

import { motion } from 'framer-motion'
import { Shield, Radar, Zap } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
  className?: string
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  }

  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Logo Icon */}
      <div className="relative">
        {/* Outer ring - radar effect */}
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-2 border-blue-500/30 relative`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Middle ring */}
        <motion.div
          className={`${sizeClasses[size]} rounded-full border-2 border-purple-500/50 absolute inset-0`}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Inner shield */}
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center absolute inset-0 shadow-lg`}>
          <Shield className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
        </div>
        
        {/* Radar scan line */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59, 130, 246, 0.8) 90deg, transparent 180deg)'
          }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full shadow-sm" />
        </div>
      </div>

      {/* Text */}
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent ${textSizes[size]}`}>
          RugRadar
        </span>
      )}
    </motion.div>
  )
}

// Alternative simpler logo for smaller spaces
export function SimpleLogo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  }

  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Simple shield with radar icon */}
      <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg`}>
        <div className="relative">
          <Shield className={`${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-6 h-6'} text-white`} />
          <motion.div
            className="absolute -top-1 -right-1 w-1 h-1 bg-green-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {/* Text */}
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent ${textSizes[size]}`}>
          RugRadar
        </span>
      )}
    </motion.div>
  )
} 