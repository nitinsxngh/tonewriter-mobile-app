import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tone Writer - Transcribe, Summarize, Translate',
  description: 'Turn long conversations, lectures, or meetings into concise, actionable summaries in seconds.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">{children}</body>
    </html>
  )
}

