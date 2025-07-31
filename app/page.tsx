'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Shield, Zap, Eye, TrendingUp, Users, BarChart3, CheckCircle, Star, ArrowDown, Menu, X, Globe, Lock, Activity, Target } from 'lucide-react'
import Logo from '@/components/logo'
import Link from 'next/link'

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Advanced Security Analysis",
      description: "Comprehensive risk assessment using multiple data points and AI-powered algorithms",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-time Monitoring",
      description: "Instant detection of suspicious activities and potential rug pull indicators",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Market Intelligence",
      description: "Deep insights into token performance, liquidity, and holder distribution",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Protection",
      description: "Protect yourself and your community from malicious token projects",
              color: "from-orange-500 to-red-500"
    }
  ]

  const stats = [
    { number: "10K+", label: "Tokens Analyzed", icon: <BarChart3 className="w-6 h-6" /> },
    { number: "99.8%", label: "Accuracy Rate", icon: <CheckCircle className="w-6 h-6" /> },
    { number: "50K+", label: "Users Protected", icon: <Users className="w-6 h-6" /> },
    { number: "24/7", label: "Real-time Monitoring", icon: <Activity className="w-6 h-6" /> }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      {/* Animated Background with Mouse Follow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x - 160 + 100,
            y: mousePosition.y - 160 - 100,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 25 }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-green-500/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x - 144 - 100,
            y: mousePosition.y - 144 + 100,
          }}
          transition={{ type: "spring", stiffness: 45, damping: 22 }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Logo size="lg" className="text-2xl" />
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center space-x-8"
        >
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105">
            Dashboard
          </Link>
          <button onClick={() => scrollToSection('features')} className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105">
            Features
          </button>
          <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105">
            About
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute right-0 top-0 h-full w-80 bg-gray-900/95 backdrop-blur-md border-l border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <Logo size="md" className="text-lg" />
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                    title="Close menu"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>

                <nav className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link 
                      href="/dashboard" 
                      className="block py-3 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false)
                        setTimeout(() => scrollToSection('features'), 300)
                      }}
                      className="block w-full text-left py-3 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                    >
                      Features
                    </button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false)
                        setTimeout(() => scrollToSection('about'), 300)
                      }}
                      className="block w-full text-left py-3 px-4 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
                    >
                      About
                    </button>
                  </motion.div>
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <p className="text-gray-400 text-sm mb-4">
                      Ready to protect your investments?
                    </p>
                    <Link href="/dashboard">
                      <button
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        Start Analysis
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Globe className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Web3 Security Platform</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              Detect
            </span>
            <br />
            <span className="text-white">Rug Pulls</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-400 bg-clip-text text-transparent">
              Before They Happen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Advanced Web3 analytics platform that protects your investments with real-time 
            security analysis and risk assessment for ERC-20 tokens
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold flex items-center space-x-3 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                <span>Start Analysis</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-600 text-gray-300 px-10 py-4 rounded-full text-lg font-semibold hover:border-gray-400 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-gray-700/50"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                    {stat.icon}
                  </div>
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Advanced Features</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Why Choose <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">RugRadar</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our advanced platform combines cutting-edge technology with comprehensive data analysis 
              to provide you with the most accurate risk assessment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 group"
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 py-32 bg-gray-800/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Activity className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Simple Process</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              How It <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Get comprehensive token analysis in just three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Enter Token Address",
                description: "Paste any ERC-20 token contract address to begin analysis",
                icon: <Globe className="w-8 h-8" />
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our advanced algorithms analyze multiple risk factors in real-time",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Get Results",
                description: "Receive detailed risk assessment and security insights instantly",
                icon: <Shield className="w-8 h-8" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative group"
              >
                {index < 2 && (
                  <motion.div
                    className="hidden md:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform translate-x-4"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                )}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  {item.step}
                </motion.div>
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="text-blue-400">
                    {item.icon}
                  </div>
                </motion.div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="relative z-10 py-32 bg-gray-800/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">About Us</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">RugRadar</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to make the Web3 ecosystem safer for everyone by providing 
              transparent, accurate, and real-time risk assessment tools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                description: "To protect investors from malicious token projects by providing advanced analytics and real-time risk assessment.",
                icon: <Shield className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Advanced Technology",
                description: "Built with cutting-edge AI algorithms and comprehensive blockchain data analysis for maximum accuracy.",
                icon: <Zap className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Community Driven",
                description: "Created by the community, for the community. We believe in transparency and open collaboration.",
                icon: <Users className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 group"
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <div className="text-white">
                    {item.icon}
                  </div>
                </motion.div>
                <h3 className="text-xl font-semibold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Ready to Start?</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to Protect Your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Investments</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who trust RugRadar to analyze their token investments 
              and avoid potential rug pulls
            </p>
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-5 rounded-full text-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                Start Free Analysis
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-gray-800/50">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-6"
          >
            <Logo size="lg" className="text-2xl" />
          </motion.div>
          <p className="text-gray-400 mb-4">
            © 2025 RugRadar. Built with ❤️ by ART_Redox for the Web3 community.
          </p>
         
        </div>
      </footer>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-gray-400"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </div>
  )
}
