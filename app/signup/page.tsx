'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

// Comprehensive list of countries with phone codes
const countries = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: '+84', name: 'Vietnam', flag: '🇻🇳' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+977', name: 'Nepal', flag: '🇳🇵' },
  { code: '+972', name: 'Israel', flag: '🇮🇱' },
  { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: '+212', name: 'Morocco', flag: '🇲🇦' },
  { code: '+213', name: 'Algeria', flag: '🇩🇿' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+353', name: 'Ireland', flag: '🇮🇪' },
  { code: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: '+36', name: 'Hungary', flag: '🇭🇺' },
  { code: '+40', name: 'Romania', flag: '🇷🇴' },
  { code: '+30', name: 'Greece', flag: '🇬🇷' },
]

export default function SignUpPage() {
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === '+91') || countries[0])
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.includes(searchQuery)
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false)
        setSearchQuery('')
      }
    }

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCountryDropdown])

  return (
    <main className="h-screen bg-black flex flex-col px-6 py-4 max-w-md mx-auto overflow-hidden relative">
      {/* Header Section */}
      <div className="flex-shrink-0">
        {/* Back Button */}
        <Link href="/" className="inline-block mb-3">
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

      {/* Main Content - Scrollable if needed but fits normally */}
      <div className="flex-1 flex flex-col justify-between min-h-0">
        <div className="flex-1 flex flex-col justify-center">
          {/* Phone Number Input Section */}
          <div className="space-y-3 mb-3">
            {/* Country Code Input */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="w-full px-4 py-3 rounded-xl border border-tone-orange bg-black text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black text-base"
              >
                <span className="flex items-center gap-2">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.code} {selectedCountry.name}</span>
                </span>
                <svg
                  className={`w-5 h-5 text-tone-orange transition-transform ${
                    showCountryDropdown ? 'rotate-180' : ''
                  }`}
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
              </button>

              {/* Dropdown Menu */}
              {showCountryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black border border-tone-orange/30 rounded-xl overflow-hidden z-[60] max-h-80 shadow-xl">
                  {/* Search Input */}
                  <div className="p-3 border-b border-white/10">
                    <input
                      type="text"
                      placeholder="Search country..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange text-sm"
                      autoFocus
                    />
                  </div>

                  {/* Countries List */}
                  <div className="max-h-64 overflow-y-auto">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country, index) => (
                        <button
                          key={`${country.code}-${country.name}-${index}`}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country)
                            setShowCountryDropdown(false)
                            setSearchQuery('')
                          }}
                          className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left ${
                            selectedCountry.code === country.code && selectedCountry.name === country.name
                              ? 'bg-tone-orange/20'
                              : ''
                          }`}
                        >
                          <span className="text-xl">{country.flag}</span>
                          <span className="text-white text-sm font-medium">{country.name}</span>
                          <span className="ml-auto text-white/60 text-sm">{country.code}</span>
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-white/50 text-sm text-center">
                        No countries found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Phone Number Input */}
            <input
              type="tel"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/30 bg-black text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-tone-orange focus:ring-offset-2 focus:ring-offset-black focus:border-tone-orange text-base"
            />
          </div>

          {/* Continue Button */}
          <Link
            href="/signup/otp"
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

      {/* Backdrop Overlay for Country Dropdown */}
      {showCountryDropdown && (
        <div
          className="fixed inset-0 bg-black/50 z-[50] transition-opacity duration-300"
          onClick={() => {
            setShowCountryDropdown(false)
            setSearchQuery('')
          }}
        />
      )}
    </main>
  )
}

