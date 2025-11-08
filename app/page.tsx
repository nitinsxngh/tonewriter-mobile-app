'use client'

import React from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-between px-6 py-8 max-w-md mx-auto">
      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center w-full space-y-10 py-12">
        {/* Logo and App Name */}
        <div className="flex flex-col items-center">
          <Logo />
        </div>
        
        {/* Heading and Description */}
        <div className="text-center space-y-5 max-w-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Let&apos;s get started
          </h2>
          <p className="text-base md:text-lg text-white/90 font-light leading-relaxed px-2">
            Turn long conversations, lectures, or sessions into concise, actionable summaries in seconds.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-5 pt-2">
          {/* Sign Up Button */}
          <Link
            href="/signup"
            className="block w-full bg-tone-orange text-white font-medium py-4 px-6 rounded-xl hover:bg-[#E55A2A] active:bg-[#CC4F22] transition-all duration-200 active:scale-[0.98] shadow-lg focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black text-center"
          >
            Sign up
          </Link>
          
          {/* Login Link */}
          <Link
            href="/login"
            className="block w-full text-white font-medium py-2 hover:text-white/80 active:text-white/70 transition-colors duration-200 focus:outline-none text-center"
          >
            Login
          </Link>
        </div>
      </div>
      
      {/* Feature Indicators */}
      <div className="flex justify-center items-center gap-6 md:gap-8 w-full pt-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-tone-orange rounded-full"></div>
          <span className="text-sm md:text-base text-white font-normal">Transcribe</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-tone-yellow rounded-full"></div>
          <span className="text-sm md:text-base text-white font-normal">Summarize</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-tone-red rounded-full"></div>
          <span className="text-sm md:text-base text-white font-normal">Translate</span>
        </div>
      </div>
    </main>
  )
}

