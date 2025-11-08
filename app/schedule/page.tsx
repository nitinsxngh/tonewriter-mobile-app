'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function SchedulePage() {
  const [title, setTitle] = useState('Ui Desing Meeting')
  const [description, setDescription] = useState('Meeting with clients to discuss a project')
  const [date, setDate] = useState('Monday, 20 2025')
  const [startTime, setStartTime] = useState('2:30 PM')
  const [endTime, setEndTime] = useState('3:40 PM')
  const [selectedCategory, setSelectedCategory] = useState('Meetings')

  const categories = ['Meetings', 'Designs', 'Calls']

  return (
    <main className="h-screen bg-black flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="flex-shrink-0 flex justify-between items-center mb-6">
        {/* Hamburger Menu Icon */}
        <Link href="/home" className="p-2 -ml-2 text-tone-orange focus:outline-none hover:opacity-80 transition-opacity">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Link>

        {/* Schedule Title */}
        <h1 className="text-white text-xl font-medium">
          Schedule
        </h1>

        {/* Profile Icon */}
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-semibold">
          N
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <div className="flex-1 flex flex-col space-y-5 overflow-y-auto">
          {/* Title Input */}
          <div>
            <label className="block text-white text-sm mb-2">Tittle</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-0 py-2 bg-transparent text-white border-b border-white/30 focus:outline-none focus:border-tone-orange transition-colors text-base"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-white text-sm mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-0 py-2 bg-transparent text-white border-b border-white/30 focus:outline-none focus:border-tone-orange transition-colors text-base"
            />
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-white text-sm mb-2">Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-0 py-2 bg-transparent text-white border-b border-white/30 focus:outline-none focus:border-tone-orange transition-colors text-base"
            />
          </div>

          {/* Time Inputs */}
          <div>
            <label className="block text-white text-sm mb-2">Time</label>
            <div className="flex gap-3">
              {/* Start Time */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-0 py-2 pr-8 bg-transparent text-white border-b border-white/30 focus:outline-none focus:border-tone-orange transition-colors text-base"
                />
                <svg
                  className="absolute right-0 bottom-3 w-4 h-4 text-white/60 pointer-events-none"
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

              {/* End Time */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-0 py-2 pr-8 bg-transparent text-white border-b border-white/30 focus:outline-none focus:border-tone-orange transition-colors text-base"
                />
                <svg
                  className="absolute right-0 bottom-3 w-4 h-4 text-white/60 pointer-events-none"
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

          {/* Category Section */}
          <div>
            <label className="block text-white text-sm mb-3">Category</label>
            <div className="flex gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-tone-orange text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule Button */}
        <div className="flex-shrink-0 pt-4 pb-4">
          <button className="w-full bg-tone-orange text-white font-medium py-3 px-6 rounded-xl hover:bg-[#E55A2A] active:bg-[#CC4F22] transition-all duration-200 active:scale-[0.98] shadow-lg focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black">
            schedule
          </button>
        </div>
      </div>
    </main>
  )
}

