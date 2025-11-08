'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MeetingPage() {
  const [timer, setTimer] = useState(0)
  const [waveformBars, setWaveformBars] = useState<number[]>([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [showMeetingSheet, setShowMeetingSheet] = useState(false)
  const [showParticipantsSheet, setShowParticipantsSheet] = useState(false)
  const [showAudioSheet, setShowAudioSheet] = useState(false)
  const [editingParticipant, setEditingParticipant] = useState<number | null>(null)
  const [expandedPermission, setExpandedPermission] = useState<string | null>(null)
  const [canEditSelection, setCanEditSelection] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'tonewriter' | 'audio'>('tonewriter')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(80) // in seconds (01:20)
  const [totalTime, setTotalTime] = useState(179) // in seconds (02:59)
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null)
  const [selectedAudioId, setSelectedAudioId] = useState<number | null>(null)
  const [meetingTitle, setMeetingTitle] = useState('Untitled chat')
  const [showRenameModal, setShowRenameModal] = useState(false)
  const [pendingTitle, setPendingTitle] = useState('')
  const meetingCode = 'CODET001'

  const [audioRecordings, setAudioRecordings] = useState<Array<{
    id: number
    name: string
    avatar: string
    duration: string
    waveform: number[]
  }>>([])

  const selectedRecording = audioRecordings.find((recording) => recording.id === selectedAudioId)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(meetingCode)
    // You can add a toast notification here
  }

  const handleShareLink = () => {
    const shareLink = `${window.location.origin}/join?code=${meetingCode}`
    if (navigator.share) {
      navigator.share({
        title: 'Join Meeting',
        text: `Join my meeting with code: ${meetingCode}`,
        url: shareLink,
      }).catch((err) => {
        console.log('Error sharing:', err)
        // Fallback to clipboard
        navigator.clipboard.writeText(shareLink)
      })
    } else {
      // Fallback to clipboard if Web Share API is not available
      navigator.clipboard.writeText(shareLink)
    }
  }

  const participants = [
    { name: 'Nitin Singh', role: 'Administrator', avatar: 'N', isYou: true },
    { name: 'Vaidehi Chauragade', role: 'Participant', avatar: 'V', isYou: false },
  ]

  const handleEditParticipant = (index: number) => {
    setEditingParticipant(index)
    setExpandedPermission(null)
    setCanEditSelection('')
  }

  const handleDoneEditing = () => {
    setEditingParticipant(null)
    setExpandedPermission(null)
    setCanEditSelection('')
  }

  const togglePermission = (permission: string) => {
    if (expandedPermission === permission) {
      setExpandedPermission(null)
    } else {
      setExpandedPermission(permission)
    }
  }

  useEffect(() => {
    // Generate initial random heights for waveform bars only on client
    setWaveformBars(Array.from({ length: 40 }, () => Math.random()))
    
    // Generate audio recordings with waveforms only on client
    const generatedRecordings = [
      { id: 1, name: 'Nitin', avatar: 'N', duration: '00:00:03', waveform: Array.from({ length: 20 }, () => Math.random()) },
      { id: 2, name: 'Santosh', avatar: 'S', duration: '00:00:05', waveform: Array.from({ length: 20 }, () => Math.random()) },
      { id: 3, name: 'Vaidehi', avatar: 'V', duration: '00:00:04', waveform: Array.from({ length: 20 }, () => Math.random()) },
      { id: 4, name: 'Santosh', avatar: 'S', duration: '00:00:06', waveform: Array.from({ length: 20 }, () => Math.random()) },
    ]
    setAudioRecordings(generatedRecordings)
    if (generatedRecordings.length > 0) {
      setSelectedAudioId(generatedRecordings[0].id)
    }
    
    // Update waveform bars to simulate audio activity
    const waveformInterval = setInterval(() => {
      setWaveformBars((prev) => 
        prev.map(() => Math.random())
      )
    }, 150) // Update every 150ms for smooth animation
    
    const timerInterval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    
    return () => {
      clearInterval(waveformInterval)
      clearInterval(timerInterval)
    }
  }, [])

  const formatTimer = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0')
    const mins = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')
    return `${hrs}:${mins}:${secs}`
  }

  return (
    <main className="h-screen bg-black flex flex-col max-w-md mx-auto overflow-hidden relative">
      {/* Header Section */}
      <div className="flex-shrink-0 flex justify-between items-center px-6 pt-4 pb-2 z-10">
        {/* Hamburger Menu */}
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

        {/* Title */}
        <div className="flex-1 text-center">
          <button
            onClick={() => {
              setPendingTitle(meetingTitle)
              setShowRenameModal(true)
            }}
            className="text-white text-base font-medium hover:opacity-80 transition-opacity"
          >
            {meetingTitle}
          </button>
        </div>

        {/* Profile Icon */}
        <Link href="/profile" className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#5C4033] flex items-center justify-center text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity">
          N
        </Link>
      </div>

      {/* Main Content Area - Blob GIF */}
      <div className="flex-1 flex items-center justify-center relative bg-black overflow-hidden">
        {/* Blob GIF */}
        <div className="w-72 h-72 relative flex items-center justify-center">
          <Image
            src="/blob.gif"
            alt="Animated blob"
            width={288}
            height={288}
            priority
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex-shrink-0 px-6 py-6 bg-gradient-to-t from-[#1a0f0a] via-black to-transparent">
        {/* Audio Waveform */}
        <div className="flex justify-center items-end gap-0.5 h-16 mb-4">
          {waveformBars.length > 0 ? (
            waveformBars.map((height, index) => {
              // Create more realistic waveform pattern - higher in middle, lower at edges
              const centerOffset = Math.abs(index - waveformBars.length / 2) / (waveformBars.length / 2)
              const patternMultiplier = 1 - centerOffset * 0.4 // Higher in center
              const barHeight = 8 + height * 48 * patternMultiplier
              
              return (
                <div
                  key={index}
                  className="bg-gradient-to-t from-tone-orange via-orange-400 to-yellow-400 rounded-full transition-all duration-150 ease-out"
                  style={{
                    width: '3px',
                    height: `${barHeight}px`,
                    boxShadow: `0 0 ${4 + height * 4}px rgba(255, 107, 53, 0.6)`,
                    minHeight: '4px',
                  }}
                />
              )
            })
          ) : (
            // Placeholder while waveform loads (prevents layout shift)
            Array.from({ length: 40 }, (_, index) => (
              <div
                key={index}
                className="w-0.5 bg-tone-orange/30 rounded-full"
                style={{ height: '24px' }}
              />
            ))
          )}
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <p className="text-white text-xl font-semibold tracking-wider">{formatTimer(timer)}</p>
          <p className="text-white/50 text-xs mt-1">Recording</p>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-between items-center px-4">
          {/* Information Button */}
          <button 
            onClick={() => setShowAudioSheet(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#5C4033] flex items-center justify-center text-white hover:opacity-90 active:scale-95 transition-all shadow-lg hover:shadow-xl"
          >
            <span className="text-2xl font-bold">i</span>
          </button>

          {/* End Call Button */}
          <Link
            href="/home"
            className="w-24 h-14 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#5C4033] flex items-center justify-center hover:opacity-90 active:scale-95 transition-all shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-8 h-8 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 15.46c-.59 0-1.17-.05-1.74-.14a1 1 0 00-.92.27l-1.64 1.64a1 1 0 01-1.06.25 16.18 16.18 0 01-9.08-9.08 1 1 0 01.25-1.06l1.64-1.64a1 1 0 00.27-.92c-.09-.57-.14-1.15-.14-1.74A1 1 0 007.58 2H5a1 1 0 00-1 1 19 19 0 0019 19 1 1 0 001-1v-2.58a1 1 0 00-1-1z" />
            </svg>
          </Link>

          {/* More Options Button */}
          <button 
            onClick={() => setShowParticipantsSheet(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8B6F47] to-[#5C4033] flex items-center justify-center text-white hover:opacity-90 active:scale-95 transition-all shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Rename Modal */}
      {showRenameModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[120]"
            onClick={() => setShowRenameModal(false)}
          />
          <div className="fixed inset-0 z-[130] flex items-center justify-center px-6">
            <div className="w-full max-w-sm bg-[#1a0f0a] border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-white text-lg font-semibold mb-4 text-center">Rename meeting</h3>
              <input
                type="text"
                value={pendingTitle}
                onChange={(e) => setPendingTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange/50 text-sm mb-4"
                placeholder="Enter meeting name"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRenameModal(false)}
                  className="flex-1 py-3 rounded-xl border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const trimmed = pendingTitle.trim()
                    if (trimmed.length > 0) {
                      setMeetingTitle(trimmed)
                    }
                    setShowRenameModal(false)
                  }}
                  className="flex-1 py-3 rounded-xl bg-tone-orange text-white text-sm font-medium hover:bg-[#E55A2A] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
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
          className="fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300"
          onClick={() => setShowMeetingSheet(false)}
        />
      )}

      {/* Backdrop Overlay for Participants Sheet */}
      {showParticipantsSheet && (
        <div
          className="fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300"
          onClick={() => setShowParticipantsSheet(false)}
        />
      )}

      {/* Backdrop Overlay for Audio Sheet */}
      {showAudioSheet && (
        <div
          className="fixed inset-0 bg-black/50 z-[90] transition-opacity duration-300"
          onClick={() => setShowAudioSheet(false)}
        />
      )}

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

      {/* Bottom Sheet - Meeting Code */}
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-b from-[#5C4033] to-[#8B6F47] rounded-t-3xl px-6 pt-6 pb-8 z-[100] transform transition-transform duration-300 ease-out ${
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
          <button 
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
          </button>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => setShowMeetingSheet(false)}
          className="w-full text-white text-sm font-medium py-2 hover:opacity-80 transition-opacity"
        >
          dismiss
        </button>
      </div>

      {/* Participants Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-gradient-to-b from-[#8B6F47] to-[#5C4033] rounded-t-3xl z-[100] transform transition-transform duration-300 ease-out max-h-[85vh] overflow-y-auto ${
          showParticipantsSheet ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-white/30 rounded-full"></div>
        </div>

        <div className="px-6 pt-2 pb-8">
          {/* Share Session Code Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white text-sm font-medium">Share Session Code</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold text-base">{meetingCode}</span>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
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
            </div>
          </div>

          {/* Current User */}
          <div className="mb-6">
            {participants
              .filter(p => p.isYou)
              .map((participant, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                    {participant.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{participant.name}</span>
                      <span className="text-white/70 text-xs">[ You ]</span>
                    </div>
                    <span className="text-white/60 text-xs">{participant.role}</span>
                  </div>
                </div>
              ))}
          </div>

          {/* Participants Section */}
          {editingParticipant === null ? (
            <div>
              <h3 className="text-white font-semibold text-sm mb-4">Name of participants in this meet</h3>
              <div className="space-y-3 mb-4">
                {participants
                  .filter(p => !p.isYou)
                  .map((participant, index) => {
                    const participantIndex = participants.findIndex(p => p === participant)
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold">
                          {participant.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium text-sm">{participant.name}</span>
                          </div>
                          <span className="text-white/60 text-xs">{participant.role}</span>
                        </div>
                        <button 
                          onClick={() => handleEditParticipant(participantIndex)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <svg
                            className="w-5 h-5 text-white/80"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                      </div>
                    )
                  })}
              </div>
              
              {/* Share Link Button for All Participants */}
              <button
                onClick={handleShareLink}
                className="w-full flex items-center justify-center gap-2 border border-white/30 text-white text-sm font-medium py-3 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors duration-200 active:scale-[0.98] focus:outline-none"
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                Share link
              </button>
            </div>
          ) : (
            <div>
              {/* Participant Header in Edit Mode */}
              <div className="mb-4 pb-4 border-b border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-semibold">
                    {participants[editingParticipant]?.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{participants[editingParticipant]?.name}</span>
                    </div>
                    <span className="text-white/60 text-xs">{participants[editingParticipant]?.role}</span>
                  </div>
                  <button 
                    onClick={handleDoneEditing}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-white/80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Permissions Container */}
              <div className="border border-white/30 rounded-lg bg-black/30 p-4 mb-4">
                {/* Can Edit Section */}
                <div className="mb-3">
                  <button
                    onClick={() => togglePermission('edit')}
                    className="w-full flex items-center justify-between py-2 hover:opacity-80 transition-opacity"
                  >
                    <span className="text-white text-sm font-medium">Can Edit</span>
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
                        d={expandedPermission === 'edit' ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                      />
                    </svg>
                  </button>
                  
                  {expandedPermission === 'edit' && (
                    <div className="mt-3 pt-3 border-t border-white/20">
                      <div className="flex flex-wrap gap-4">
                        {['All', 'transcript', 'Audio', 'Summarised'].map((option) => (
                          <label key={option} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="canEdit"
                              value={option}
                              checked={canEditSelection === option}
                              onChange={(e) => setCanEditSelection(e.target.value)}
                              className="w-4 h-4 border-white/50 text-tone-orange focus:ring-tone-orange focus:ring-2"
                              style={{ accentColor: '#FF6B35' }}
                            />
                            <span className="text-white text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Can Comment Section */}
                <div className="mb-3">
                  <button
                    onClick={() => togglePermission('comment')}
                    className="w-full flex items-center justify-between py-2 hover:opacity-80 transition-opacity"
                  >
                    <span className="text-white text-sm font-medium">Can Comment</span>
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
                        d={expandedPermission === 'comment' ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                      />
                    </svg>
                  </button>
                </div>

                {/* Can view Section */}
                <div>
                  <button
                    onClick={() => togglePermission('view')}
                    className="w-full flex items-center justify-between py-2 hover:opacity-80 transition-opacity"
                  >
                    <span className="text-white text-sm font-medium">Can view</span>
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
                        d={expandedPermission === 'view' ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
                      />
                    </svg>
                  </button>
                </div>

                {/* Done Button */}
                <div className="mt-4 pt-4 border-t border-white/20 flex justify-end">
                  <button
                    onClick={handleDoneEditing}
                    className="text-white text-sm font-medium px-4 py-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audio Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-black rounded-t-3xl z-[100] transform transition-transform duration-300 ease-out max-h-[90vh] overflow-hidden flex flex-col ${
          showAudioSheet ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-white/30 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4">
          <button 
            onClick={() => setShowAudioSheet(false)}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h2 className="text-tone-orange text-xl font-medium">Audio</h2>
          <div className="w-6 h-6" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-24">
          {/* Main Audio Player */}
          <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10">
            <h3 className="text-white font-medium text-base mb-4">{selectedRecording?.name ?? 'Audio session'}</h3>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/70 text-xs">{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                <span className="text-white/70 text-xs">{Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-tone-orange rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / totalTime) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-6">
              <button className="text-white hover:opacity-80 transition-opacity">
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
                    d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                  />
                </svg>
              </button>
              <button 
                onClick={() => {
                  let targetId = selectedAudioId
                  if (!targetId && audioRecordings.length > 0) {
                    targetId = audioRecordings[0].id
                    setSelectedAudioId(targetId)
                  }

                  if (isPlaying) {
                    setIsPlaying(false)
                    setPlayingAudioId(null)
                  } else {
                    setIsPlaying(true)
                    if (targetId) {
                      setPlayingAudioId(targetId)
                    }
                  }
                }}
                className="w-14 h-14 rounded-full bg-tone-orange flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                {isPlaying ? (
                  <svg
                    className="w-7 h-7"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-7 h-7 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <button className="text-white hover:opacity-80 transition-opacity">
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
                    d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Audio Recordings List */}
          {audioRecordings.length > 0 && (
            <div className="space-y-3">
              {audioRecordings.map((recording) => (
              <div key={recording.id} className="flex items-center gap-3 py-2">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {recording.avatar}
                </div>

                {/* Name and Waveform */}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium mb-1">{recording.name}</p>
                  {/* Waveform */}
                  <div className="flex items-end gap-0.5 h-4">
                    {recording.waveform.map((height, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-full transition-all duration-150"
                        style={{
                          width: '2px',
                          height: `${4 + height * 8}px`,
                          minHeight: '2px',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <span className="text-tone-orange text-xs font-medium flex-shrink-0">
                  {recording.duration}
                </span>

                {/* Play Button */}
                <button
                  onClick={() => {
                    setSelectedAudioId(recording.id)
                    if (playingAudioId === recording.id) {
                      setPlayingAudioId(null)
                      setIsPlaying(false)
                    } else {
                      setPlayingAudioId(recording.id)
                      setIsPlaying(true)
                    }
                  }}
                  className="w-8 h-8 flex items-center justify-center text-tone-orange hover:opacity-80 transition-opacity flex-shrink-0"
                >
                  {playingAudioId === recording.id && isPlaying ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Delete Button */}
                <button className="w-8 h-8 flex items-center justify-center text-red-500 hover:opacity-80 transition-opacity flex-shrink-0">
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
            </div>
          )}
        </div>

        {/* Bottom Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black to-transparent px-6 py-4 flex justify-center gap-6">
          {/* Record Button */}
          <button className="w-14 h-14 rounded-full border-2 border-tone-orange flex items-center justify-center text-tone-orange hover:bg-tone-orange/10 transition-colors">
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            </svg>
          </button>

          {/* Upload Button */}
          <button className="w-14 h-14 rounded-full border-2 border-tone-orange flex items-center justify-center text-tone-orange hover:bg-tone-orange/10 transition-colors">
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  )
}

