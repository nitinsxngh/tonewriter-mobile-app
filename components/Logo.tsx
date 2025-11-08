import React from 'react'
import Image from 'next/image'

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-32 h-20 mb-2">
        <Image
          src="/logo-tw.png"
          alt="Tone Writer logo"
          fill
          priority
          sizes="128px"
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default Logo

