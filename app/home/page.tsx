'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  const [showMeetingDropdown, setShowMeetingDropdown] = useState(false)
  const [showMeetingSheet, setShowMeetingSheet] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [activeTab, setActiveTab] = useState<'tonewriter' | 'audio'>('tonewriter')
  const meetingCode = 'CODET001'

  const handleCopyCode = () => {
    navigator.clipboard.writeText(meetingCode)
    // You can add a toast notification here
  }

  const handleGetInstantCode = () => {
    setShowMeetingDropdown(false)
    setShowMeetingSheet(true)
  }

  return (
    <main className="h-screen bg-black flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden relative">
      {/* Header Section */}
      <div className="flex-shrink-0 flex justify-between items-center mb-6">
        {/* Hamburger Menu Icon */}
        <button 
          onClick={() => setShowSidebar(true)}
          className="p-2 -ml-2 text-white focus:outline-none hover:opacity-80 transition-opacity"
        >
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
        </button>

        {/* Tone Writer Title */}
        <h1 className="text-tone-orange text-xl font-medium tracking-tight">
          Tone Writer
        </h1>

        {/* Profile Icon */}
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-semibold">
          N
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Central Graphic */}
          <div className="w-48 h-48 relative flex items-center justify-center mb-8">
            <Image
              src="/blob.gif"
              alt="Animated blob"
              width={192}
              height={192}
              priority
              className="w-full h-full object-contain"
            />
          </div>

          {/* Action Buttons Section */}
          <div className="w-full max-w-sm relative">
            {/* Buttons Container */}
            <div className="flex gap-3">
              {/* New meeting Button */}
              <div className="flex-1 relative">
                <button
                  onClick={() => setShowMeetingDropdown(!showMeetingDropdown)}
                  className="w-full bg-tone-orange text-white font-medium py-3 px-4 rounded-xl hover:bg-[#E55A2A] active:bg-[#CC4F22] transition-all duration-200 active:scale-[0.98] shadow-lg focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black text-sm"
                >
                  New meeting
                </button>

                {/* Dropdown Menu */}
                {showMeetingDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#5C4033] rounded-xl overflow-hidden z-30 shadow-lg border border-white/10">
                    <button
                      onClick={handleGetInstantCode}
                      className="w-full px-4 py-3 text-white text-left hover:bg-white/10 transition-colors duration-200 text-sm border-b border-white/10"
                    >
                      Get instant meeting code
                    </button>
                    <Link
                      href="/schedule"
                      onClick={() => setShowMeetingDropdown(false)}
                      className="block w-full px-4 py-3 text-white text-left hover:bg-white/10 transition-colors duration-200 text-sm"
                    >
                      Schedule meeting
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Enter code to join Button */}
              <Link
                href="/join"
                className="flex-1 border border-tone-orange text-white font-medium py-3 px-4 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black text-sm text-center"
              >
                Enter code to join
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="flex-shrink-0 text-center pb-4">
          <h2 className="text-lg font-semibold text-white mb-2 leading-tight">
            Premium Audio meetings.
            <br />
            Now free for everyone.
          </h2>
          <p className="text-xs text-white/70 mb-2 leading-relaxed">
            We re-engineered the service that we built for secure business meetings, Tonewriter, to make it free and available for all.
          </p>
          <Link
            href="#"
            className="text-tone-orange text-xs font-medium hover:underline"
          >
            Learn more about Tonewriter
          </Link>
        </div>
      </div>

      {/* Backdrop Overlay for Dropdown */}
      {showMeetingDropdown && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowMeetingDropdown(false)}
        />
      )}

      {/* Backdrop Overlay for Sidebar */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-[70] transition-opacity duration-300"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Backdrop Overlay for Bottom Sheet */}
      {showMeetingSheet && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setShowMeetingSheet(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-b from-[#5C4033] to-[#8B6F47] rounded-t-3xl px-6 pt-6 pb-8 z-50 transform transition-transform duration-300 ease-out ${
          showMeetingSheet ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Title */}
        <p className="text-white text-sm mb-4 text-center leading-relaxed">
          Share this joining code with others that you want in the meeting
        </p>

        {/* Meeting Code Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={meetingCode}
            readOnly
            className="w-full px-4 py-3 pr-12 rounded-xl bg-black/30 border border-white/20 text-white text-center font-medium text-lg focus:outline-none"
          />
          <button
            onClick={handleCopyCode}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          {/* Share Button */}
          <button className="flex-1 border border-white text-white font-medium py-3 px-4 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors duration-200 active:scale-[0.98] focus:outline-none flex items-center justify-center gap-2 text-sm">
            <svg
              className="w-5 h-5"
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
            Share
          </button>

          {/* Join meeting Button */}
          <Link
            href="/meeting"
            onClick={() => setShowMeetingSheet(false)}
            className="flex-1 border border-white text-white font-medium py-3 px-4 rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors duration-200 active:scale-[0.98] focus:outline-none flex items-center justify-center gap-2 text-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Join meeting
          </Link>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setShowMeetingSheet(false)}
          className="w-full text-white text-sm font-medium py-2 hover:opacity-80 transition-opacity"
        >
          dismiss
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#5C4033] to-[#3D2A1F] z-[80] transform transition-transform duration-300 ease-out max-w-[85vw] ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col px-4 pt-4 pb-6">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange/50 text-sm"
              />
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('tonewriter')}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'tonewriter'
                  ? 'bg-[#8B6F47] text-white'
                  : 'bg-white/10 text-white/70'
              }`}
            >
              Tone writer
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'audio'
                  ? 'bg-[#8B6F47] text-white'
                  : 'bg-white/10 text-white/70'
              }`}
            >
              Audio
            </button>
          </div>

          {/* Recent Section */}
          <div className="flex-1 overflow-y-auto">
            <h2 className="text-white font-bold text-lg mb-4">Recent</h2>
            <div className="space-y-2">
              {/* Recent Item 1 */}
              <button className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors flex items-center gap-3 text-left">
                <svg
                  className="w-6 h-6 text-white/80 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-white text-sm font-medium">Client design discussion</span>
              </button>

              {/* Recent Item 2 */}
              <button className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors flex items-center gap-3 text-left">
                <svg
                  className="w-6 h-6 text-white/80 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-white text-sm font-medium">Hunnid labs marketing</span>
              </button>

              {/* Recent Item 3 */}
              <button className="w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors flex items-center gap-3 text-left">
                <svg
                  className="w-6 h-6 text-white/80 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-white text-sm font-medium">Digital marketing plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

