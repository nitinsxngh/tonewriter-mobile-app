'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const [firstName, setFirstName] = useState('Nitin')
  const [lastName, setLastName] = useState('Singh')
  const [email, setEmail] = useState('nitinolhunnid@gmail.com')
  const [day, setDay] = useState('10')
  const [month, setMonth] = useState('12')
  const [year, setYear] = useState('1999')

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))
  const months = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ]
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString())

  return (
    <main className="h-screen bg-black flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="flex-shrink-0">
        {/* Back Button */}
        <Link href="/signup/otp" className="inline-block mb-3">
          <svg
            className="w-6 h-6 text-tone-orange"
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

        {/* Title and Subtitle */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-tone-orange mb-1">Create profile</h1>
          <p className="text-white text-base">Just a few more details</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <div className="flex-1 flex flex-col justify-center">
          {/* Profile Picture */}
          <div className="flex justify-center mb-3">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center overflow-hidden">
                {/* Placeholder for profile picture - you can replace with an img tag */}
                <svg
                  className="w-12 h-12 text-white/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              {/* Camera icon for editing profile picture */}
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-tone-orange rounded-full flex items-center justify-center border-2 border-black">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-2.5 mb-2.5">
            {/* First Name */}
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/30 bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black focus:border-tone-orange text-base"
            />

            {/* Last Name */}
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/30 bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black focus:border-tone-orange text-base"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/30 bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black focus:border-tone-orange text-base"
            />
          </div>

          {/* Date of Birth Section */}
          <div className="mb-3">
            <label className="block text-white text-sm mb-2">Date of Birth</label>
            <div className="flex gap-2">
              {/* Day Dropdown */}
              <div className="flex-1 relative">
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-white/30 bg-black text-white appearance-none focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black focus:border-tone-orange text-base pr-8"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Month Dropdown */}
              <div className="flex-1 relative">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-white/30 bg-black text-white appearance-none focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black focus:border-tone-orange text-base pr-8"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Year Dropdown */}
              <div className="flex-1 relative">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-white/30 bg-black text-white appearance-none focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black focus:border-tone-orange text-base pr-8"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Finish Set-up Button */}
          <Link
            href="/home"
            className="block w-full bg-tone-orange text-white font-medium py-3 px-6 rounded-xl hover:bg-[#E55A2A] active:bg-[#CC4F22] transition-all duration-200 active:scale-[0.98] shadow-lg focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black text-center"
          >
            Finish set-up
          </Link>
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-4 text-xs text-white pt-3 pb-2 flex-shrink-0">
          <Link
            href="/terms"
            className="hover:text-white/80 transition-colors duration-200"
          >
            Terms of use
          </Link>
          <span className="text-white/30">|</span>
          <Link
            href="/privacy"
            className="hover:text-white/80 transition-colors duration-200"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </main>
  )
}

