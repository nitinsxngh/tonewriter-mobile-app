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
  const [isEditing, setIsEditing] = useState(false)

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'))
  const months = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ]
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString())

  const handleSave = () => {
    // Here you would typically save the profile data to your backend
    setIsEditing(false)
  }

  return (
    <main className="h-screen bg-black flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="flex-shrink-0 flex items-center justify-between mb-6">
        {/* Back Button */}
        <Link href="/meeting" className="p-2 -ml-2 text-white focus:outline-none hover:opacity-80 transition-opacity">
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
        <h1 className="text-white text-xl font-medium">Profile</h1>

        {/* Edit/Save Button */}
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="text-tone-orange text-sm font-medium px-3 py-1 hover:opacity-80 transition-opacity"
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-start min-h-0 overflow-y-auto">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#5C4033] flex items-center justify-center text-white text-3xl font-semibold shadow-lg">
              {firstName.charAt(0)}{lastName.charAt(0)}
            </div>
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-tone-orange rounded-full flex items-center justify-center border-2 border-black hover:opacity-90 transition-opacity">
                <svg
                  className="w-4 h-4 text-white"
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
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-white/70 text-sm mb-2">First Name</label>
            {isEditing ? (
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange/50 text-sm"
                placeholder="First Name"
              />
            ) : (
              <div className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm">
                {firstName}
              </div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange/50 text-sm"
                placeholder="Last Name"
              />
            ) : (
              <div className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm">
                {lastName}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange/50 text-sm"
                placeholder="Email"
              />
            ) : (
              <div className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm">
                {email}
              </div>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Date of Birth</label>
            {isEditing ? (
              <div className="flex gap-2">
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="flex-1 px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-tone-orange/50 text-sm"
                >
                  {days.map((d) => (
                    <option key={d} value={d} className="bg-[#1a0f0a]">
                      {d}
                    </option>
                  ))}
                </select>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="flex-1 px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-tone-orange/50 text-sm"
                >
                  {months.map((m) => (
                    <option key={m} value={m} className="bg-[#1a0f0a]">
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="flex-1 px-3 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-tone-orange/50 text-sm"
                >
                  {years.map((y) => (
                    <option key={y} value={y} className="bg-[#1a0f0a]">
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-sm">
                {day}/{month}/{year}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>

      {/* Logout Button */}
      <div className="flex-shrink-0 pb-4">
        <button
          className="w-full bg-transparent border border-tone-orange text-tone-orange font-medium py-3 rounded-xl hover:bg-tone-orange/10 active:bg-tone-orange/20 transition-colors duration-200 text-sm"
        >
          Logout
        </button>
      </div>
    </main>
  )
}

