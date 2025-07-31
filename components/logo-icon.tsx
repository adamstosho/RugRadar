"use client"

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

interface LogoIconProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
}

export default function LogoIcon({ size = 'md', className = '', animated = true }: LogoIconProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  }

  const LogoComponent = animated ? motion.div : 'div'

  return (
    <LogoComponent 
      className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ${className}`}
      {...(animated && {
        whileHover: { scale: 1.05 },
        transition: { type: "spring", stiffness: 300 }
      })}
    >
      <div className="relative">
        <Shield className={`${iconSizes[size]} text-white`} />
        {animated && (
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
        )}
      </div>
    </LogoComponent>
  )
} 