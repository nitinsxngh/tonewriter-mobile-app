# Tone Writer - Mobile Web App

A mobile-optimized web application built with Next.js 14, TypeScript, and Tailwind CSS. This app allows users to transcribe, summarize, and translate audio content through premium audio meetings.

## Features

- 🎨 Modern, mobile-first design with dark theme
- 📱 Fully responsive and optimized for mobile devices
- ⚡ Built with Next.js 14 (App Router)
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🔐 Phone number authentication with OTP
- 🌍 Multi-country phone code support
- 📞 Audio meeting capabilities with real-time visualization

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Application Flow

### User Authentication Flow

```
┌─────────────────┐
│  Landing Page   │  (/)
│  - Logo         │
│  - Sign up btn  │
│  - Login btn    │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│ Signup │ │ Login  │  (/signup)  (/login)
│ Page   │ │ Page   │
└───┬────┘ └───┬────┘
    │          │
    │          └─────────┐
    │                    │
    ▼                    ▼
┌─────────────────────────────┐
│  Phone Number Input         │
│  - Country code selector    │
│  - Phone number input       │
│  - Continue button          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  OTP Verification Page      │  (/signup/otp)
│  - Phone number display     │
│  - 4-digit OTP input        │
│  - Resend OTP (60s timer)   │
│  - Continue button          │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  Profile Creation Page      │  (/signup/profile)
│  - Profile picture          │
│  - First Name               │
│  - Last Name                │
│  - Email                    │
│  - Date of Birth            │
│  - Category selection       │
│  - Finish set-up button     │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│  Home Dashboard             │  (/home)
│  - 3D glowing sphere        │
│  - New meeting button       │
│  - Enter code to join btn   │
└──────────────┬──────────────┘
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
┌─────────────┐  ┌──────────────┐
│ New Meeting │  │ Join Meeting │
│ (Dropdown)  │  │ Code Entry   │  (/join)
└─────┬───────┘  └──────┬───────┘
      │                 │
      │                 └─────────┐
      │                           │
      │         ┌─────────────────┘
      │         │
      ▼         ▼
┌─────────────────────────────┐
│  Meeting Code Bottom Sheet  │
│  - Meeting code display     │
│  - Copy button              │
│  - Share button             │
│  - Join meeting button      │
│  - Schedule meeting button  │
└──────────────┬──────────────┘
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
┌─────────────┐  ┌──────────────┐
│   Meeting   │  │   Schedule   │  (/schedule)
│    Page     │  │     Page     │
│  (/meeting) │  └──────────────┘
└─────────────┘
```

### Project Workflow Overview

1. **Onboarding** (`/`)
   - User lands on the welcome screen, reviews feature highlights, and chooses **Sign up** or **Login**.
2. **Account Access** (`/signup` or `/login`)
   - Both routes consolidate to the shared phone-auth form with country code selector.
   - After entering a phone number the user advances to OTP verification.
3. **Verification** (`/signup/otp`)
   - User enters the four-digit code, can resend after 60 seconds, and continues when verified.
4. **Profile Creation** (`/signup/profile`)
   - User supplies profile metadata and confirms setup, leading to the home dashboard.
5. **Home Dashboard** (`/home`)
   - Central hub offering quick actions: start a new meeting, schedule one, or enter an invite code.
   - Sidebar reveals navigation shortcuts, search, and recent meetings.
6. **Meeting Entry Paths**
   - **Instant Meeting**: `New meeting → Get instant code` opens a bottom sheet with share/copy actions and then proceeds to `/meeting`.
   - **Scheduled Meeting**: `New meeting → Schedule meeting` directs to `/schedule` to plan future sessions.
   - **Join via Code**: `Enter code to join` or `/join` lets the user input an invite code, then transitions to `/meeting`.
7. **Live Meeting** (`/meeting`)
   - Real-time session controls, waveform visualization, participant management, audio recordings sheet, and sidebar access.
8. **Post-Meeting** (`/transcript`)
   - Ending the meeting routes to transcript review with tabs for raw text and summaries, sharing options, and recent-meeting sidebar.

### Detailed Page Descriptions

#### 1. **Landing Page** (`/`)
- Welcome screen with Tone Writer logo
- "Let's get started" heading
- App description
- **Sign up** button → `/signup`
- **Login** button → `/login`
- Feature indicators (Transcribe, Summarize, Translate)

#### 2. **Sign Up Page** (`/signup`)
- Phone number input with country code selector
- Supports 50+ countries with flags
- Searchable country dropdown
- Phone number input field
- Continue button → `/signup/otp`
- Social login options (Gmail, Apple ID)
- "Create a new account" link

#### 3. **Login Page** (`/login`)
- Similar to signup page
- Phone number input with country selector
- Continue button → `/signup/otp`
- "Create a new account" link → `/signup`
- Social login options (Gmail, Apple ID)

#### 4. **OTP Verification Page** (`/signup/otp`)
- Displays entered phone number
- 4-digit OTP input boxes (left-aligned)
- Auto-focus to next box
- Paste support for 4-digit codes
- Resend OTP button with 60-second countdown timer
- Continue button → `/signup/profile`
- Social login fallback options

#### 5. **Profile Creation Page** (`/signup/profile`)
- Profile picture upload with camera icon
- First Name input
- Last Name input
- Email input
- Date of Birth (Day, Month, Year dropdowns)
- Category selection (Meetings, Designs, Calls)
- Finish set-up button → `/home`

#### 6. **Home Dashboard** (`/home`)
- Header with hamburger menu, app title, profile icon
- Large 3D glowing sphere visualization
- **New meeting** button → Opens dropdown
  - Get instant meeting code
  - Schedule meeting → `/schedule`
- **Enter code to join** button → `/join`
- Footer with app description and "Learn more" link

#### 7. **Join Meeting Page** (`/join`)
- Meeting code input field
- Auto-uppercase conversion
- Join button → `/meeting`
- "Create a new meeting" link → `/home`

#### 8. **Schedule Meeting Page** (`/schedule`)
- Title input
- Description input
- Date input
- Time range inputs (Start - End)
- Category selection (Meetings, Designs, Calls)
- Schedule button

#### 9. **Meeting Page** (`/meeting`)
- Active meeting interface
- Header: Back button, meeting title, profile icon
- Central 3D glowing sphere with profile icon above
- Animated audio waveform visualization (updates every 150ms)
- Timer display (00:00:00 format)
- Control buttons:
  - Information button (i)
  - End call button (center, red phone icon)
  - More options button (three dots)

### Meeting Flow

#### Creating a New Meeting
1. User clicks **"New meeting"** on home page
2. Dropdown appears with options:
   - **Get instant meeting code** → Opens bottom sheet with meeting code
   - **Schedule meeting** → Navigates to schedule page
3. If "Get instant meeting code" selected:
   - Bottom sheet slides up with:
     - Meeting code display (CODET001)
     - Copy button
     - Share button
     - Join meeting button → `/meeting`
     - Schedule meeting button → `/schedule`
     - Dismiss button

#### Joining a Meeting
1. User clicks **"Enter code to join"** on home page
2. Navigates to `/join` page
3. User enters meeting code
4. Clicks **Join** button
5. Navigates to `/meeting` page

### Key Features

#### Country Code Selector
- 50+ countries with phone codes
- Flag emojis for visual identification
- Searchable dropdown
- Real-time filtering
- Click outside to close
- Backdrop overlay

#### OTP System
- 4 individual input boxes
- Auto-focus navigation
- Paste support
- Resend functionality with 60-second timer
- Visual countdown display

#### Meeting Interface
- Real-time audio waveform visualization
- Animated 3D sphere graphic
- Live timer
- Touch-optimized controls
- Smooth animations and transitions

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Landing/onboarding page
│   ├── globals.css             # Global styles
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── signup/
│   │   ├── page.tsx            # Sign up page
│   │   ├── otp/
│   │   │   └── page.tsx        # OTP verification page
│   │   └── profile/
│   │       └── page.tsx        # Profile creation page
│   ├── home/
│   │   └── page.tsx            # Home dashboard
│   ├── join/
│   │   └── page.tsx            # Join meeting page
│   ├── schedule/
│   │   └── page.tsx            # Schedule meeting page
│   └── meeting/
│       └── page.tsx            # Active meeting page
├── components/
│   ├── Logo.tsx                # Tone Writer logo component
│   └── StatusBar.tsx           # Mobile status bar (unused)
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## Design System

### Colors
- **Primary Orange**: `#FF6B35` (tone-orange)
- **Yellow**: `#FDB44B` (tone-yellow)
- **Red**: `#FF4757` (tone-red)
- **Background**: Black (`#000000`)
- **Text**: White (`#FFFFFF`)
- **Brown Gradient**: `#8B6F47` to `#5C4033` (for buttons/overlays)

### Typography
- **Font Family**: Inter, system-ui, sans-serif
- **Font Weights**: Light (300), Regular (400), Medium (500), Semibold (600), Bold (700)

### Layout Principles
- All pages use `h-screen` with `overflow-hidden` to prevent scrolling
- Content fits within viewport height
- Mobile-first responsive design
- Touch-friendly button sizes (minimum 44x44px)
- Consistent spacing and padding

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

## Mobile Optimization

- Responsive design using Tailwind's mobile-first approach
- Touch-friendly button sizes and spacing
- Optimized viewport settings
- Prevented zoom on input focus (iOS)
- Smooth scrolling and animations
- Non-scrollable page design
- Proper z-index layering for modals and dropdowns

## Development Notes

### State Management
- Uses React hooks (useState, useEffect) for local state
- No global state management library (can be added if needed)

### Navigation
- Next.js App Router with Link components
- Client-side navigation for smooth transitions

### Performance
- Client-side rendering for interactive components
- Optimized animations with CSS transitions
- Efficient re-renders with proper React hooks usage

## Future Enhancements

- [ ] Backend API integration
- [ ] Real-time audio meeting functionality
- [ ] User authentication with JWT tokens
- [ ] Meeting history and recordings
- [ ] Settings and preferences page
- [ ] Profile editing functionality
- [ ] Push notifications
- [ ] Audio transcription features
- [ ] Meeting scheduling calendar view
