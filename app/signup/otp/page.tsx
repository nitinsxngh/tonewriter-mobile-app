'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function OTPPage() {
  const [otp, setOtp] = useState(['', '', '', ''])
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const phoneNumber = '8803446990' // This would come from the previous screen or props

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  const handleResend = () => {
    // Reset timer and disable resend
    setTimer(60)
    setCanResend(false)
    // Here you would trigger the OTP resend API call
    console.log('Resending OTP...')
  }

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return // Only allow single digit
    if (!/^\d*$/.test(value)) return // Only allow digits

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 4).split('')
    const newOtp = [...otp]
    pastedData.forEach((digit, index) => {
      if (index < 4 && /^\d$/.test(digit)) {
        newOtp[index] = digit
      }
    })
    setOtp(newOtp)
    // Focus the last filled input or the last input
    const lastFilledIndex = Math.min(pastedData.length - 1, 3)
    inputRefs[lastFilledIndex].current?.focus()
  }

  return (
    <main className="h-screen bg-black flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="flex-shrink-0">
        {/* Back Button */}
        <Link href="/signup" className="inline-block mb-3">
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
          <h1 className="text-2xl font-bold text-tone-orange mb-1">Sign up</h1>
          <p className="text-white text-base">Get started</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <div className="flex-1 flex flex-col justify-center">
          {/* Phone Number Display */}
          <div className="mb-4">
            <input
              type="tel"
              value={phoneNumber}
              readOnly
              className="w-full px-4 py-3 rounded-xl border border-tone-orange bg-black text-white text-base text-center focus:outline-none"
            />
          </div>

          {/* OTP Input Section */}
          <div className="mb-3">
            <label className="block text-white text-sm mb-3">Enter opt</label>
            <div className="flex gap-3 justify-start">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-14 h-14 rounded-lg border border-white/30 bg-black text-white text-center text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black focus:border-tone-orange"
                />
              ))}
            </div>
            
            {/* Resend OTP */}
            <div className="mt-3">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-tone-orange text-sm font-medium hover:text-[#E55A2A] transition-colors duration-200"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-white/60 text-sm">
                  Resend OTP in {timer}s
                </p>
              )}
            </div>
          </div>

          {/* Continue Button */}
          <Link
            href="/signup/profile"
            className="block w-full bg-tone-orange text-white font-medium py-3 px-6 rounded-xl hover:bg-[#E55A2A] active:bg-[#CC4F22] transition-all duration-200 active:scale-[0.98] shadow-lg focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black mb-2 text-center"
          >
            Continue
          </Link>

          {/* Create Account Link */}
          <Link
            href="/signup"
            className="text-center text-tone-orange font-medium py-1 mb-3 hover:text-[#E55A2A] transition-colors duration-200 text-sm"
          >
            Create a new account
          </Link>

          {/* Separator */}
          <div className="relative mb-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-black text-white">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-2">
            {/* Gmail Button */}
            <button className="w-full px-4 py-3 rounded-xl border border-white/30 bg-black text-white flex items-center justify-center gap-3 hover:bg-white/5 active:bg-white/10 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black text-sm">
              <div className="w-5 h-5 flex items-center justify-center">
                <span className="text-lg font-bold">M</span>
              </div>
              <span className="font-medium">Continue with gmail</span>
            </button>

            {/* Apple ID Button */}
            <button className="w-full px-4 py-3 rounded-xl border border-white/30 bg-black text-white flex items-center justify-center gap-3 hover:bg-white/5 active:bg-white/10 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black text-sm">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="font-medium">Continue with Apple ID</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center items-center gap-4 text-xs text-tone-orange pt-2 pb-2 flex-shrink-0">
          <Link
            href="/terms"
            className="hover:text-[#E55A2A] transition-colors duration-200"
          >
            Terms of use
          </Link>
          <span className="text-white/30">|</span>
          <Link
            href="/privacy"
            className="hover:text-[#E55A2A] transition-colors duration-200"
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </main>
  )
}

