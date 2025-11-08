'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const transcriptEntries = [
  {
    speaker: 'Nitin',
    role: 'Administrator',
    text: "Alright, let’s start by quickly introducing ourselves so the client has clarity on who’s handling what.",
  },
  {
    speaker: 'Vaidehi',
    role: 'Participant',
    text: "Sure. I’ll be focusing on the design direction, presenting initial concepts, and ensuring the user experience matches the client’s vision.",
  },
  {
    speaker: 'Santosh',
    role: 'Participant',
    text: "And I’ll take care of the technical side—discussing feasibility, the right tools, and how we can implement the ideas smoothly.",
  },
  {
    speaker: 'Nitin',
    role: 'Administrator',
    text: "Perfect. I’ll make sure everything stays aligned with the client’s business goals and priorities. Now, let’s dive into the requirements.",
  },
  {
    speaker: 'Vaidehi',
    role: 'Participant',
    text: "From a design perspective, could you share your expectations and the kind of experience you’re hoping to deliver?",
  },
  {
    speaker: 'Santosh',
    role: 'Participant',
    text: "Yes, and along with that, it would help to know any constraints or tools you prefer, so we can plan the development side accordingly.",
  },
]

const tabs = ['Transcript', 'Summarized'] as const

type Tab = (typeof tabs)[number]

export default function TranscriptPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Transcript')

  return (
    <main className="h-screen bg-black flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden relative">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between mb-6">
        <Link
          href="/home"
          className="p-2 -ml-2 text-white focus:outline-none hover:opacity-80 transition-opacity"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Link>

        <div className="text-center">
          <h1 className="text-tone-orange text-xl font-medium">Tone writer</h1>
        </div>

        <button className="p-2 -mr-2 text-white focus:outline-none hover:opacity-80 transition-opacity">
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
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </div>

      {/* Audio Player */}
      <div className="flex-shrink-0 bg-white/5 rounded-2xl border border-white/10 p-4 mb-4">
        <div className="text-center text-white/80 text-sm mb-3">Client design discussion</div>
        <div className="flex items-center gap-3">
          <button className="text-white hover:opacity-80 transition-opacity">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
            </svg>
          </button>
          <div className="flex-1">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-tone-orange rounded-full"></div>
            </div>
            <div className="flex justify-between text-white/60 text-xs mt-1">
              <span>01:20</span>
              <span>02:59</span>
            </div>
          </div>
          <button className="w-12 h-12 rounded-full bg-tone-orange flex items-center justify-center text-white hover:opacity-90 transition-opacity">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-white/10 rounded-full p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-[#8B6F47] to-[#5C4033] text-white shadow-lg'
                  : 'text-white/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="p-2 text-white hover:opacity-80 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </div>

      {/* Transcript Content */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-4">
          {transcriptEntries.map((entry, index) => (
            <div key={index}>
              <p className="text-tone-orange text-sm font-semibold mb-1">{entry.speaker}</p>
              <p className="text-white/80 text-sm leading-relaxed">{entry.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="flex-shrink-0 pt-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <div className="flex items-center justify-between text-white/70 text-xs">
              <span>Choose Format</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <p className="text-white text-sm mt-2">Transcript</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <div className="flex items-center justify-between text-white/70 text-xs">
              <span>Choose Language</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <p className="text-white text-sm mt-2">English</p>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-[#8B6F47] to-[#5C4033] text-white font-medium py-3 rounded-full hover:opacity-90 active:scale-[0.98] transition-all duration-200">
          Done
        </button>
      </div>
    </main>
  )
}
