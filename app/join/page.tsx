'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function JoinPage() {
  const [sessionCode, setSessionCode] = useState('')

  const handleJoin = () => {
    if (sessionCode.trim()) {
      // Navigate to session page
      window.location.href = '/session'
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && sessionCode.trim()) {
      handleJoin()
    }
  }

  return (
    <main className="h-screen bg-black flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="flex-shrink-0 flex justify-between items-center mb-8">
        {/* Back Button */}
        <Link href="/home" className="p-2 -ml-2 text-white focus:outline-none hover:opacity-80 transition-opacity">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>

        {/* Title */}
        <h1 className="text-white text-xl font-medium">Join session</h1>

        {/* Spacer */}
        <div className="w-10"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          {/* Instruction Text */}
          <div className="text-center">
            <h2 className="text-white text-2xl font-semibold mb-2">
              Enter session code
            </h2>
            <p className="text-white/60 text-sm mt-1">
              Enter the code provided by the session host
            </p>
          </div>

          {/* Code Input */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter code"
              value={sessionCode}
              onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              maxLength={10}
              className="w-full px-6 py-4 rounded-xl border-2 border-white/30 bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black focus:border-tone-orange text-center text-2xl font-semibold tracking-widest"
              autoFocus
            />
          </div>

          {/* Join Button */}
          <button
            onClick={handleJoin}
            disabled={!sessionCode.trim()}
            className={`w-full py-4 px-6 rounded-xl font-medium text-lg transition-all duration-200 active:scale-[0.98] shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${
              sessionCode.trim()
                ? 'bg-tone-orange text-white hover:bg-[#E55A2A] active:bg-[#CC4F22] focus:ring-tone-orange'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            Join session
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 text-center pb-4">
        <p className="text-white/50 text-xs">
          Don&apos;t have a code?{' '}
          <Link href="/home" className="text-tone-orange hover:underline">
            Create a new session
          </Link>
        </p>
      </div>
    </main>
  )
}

