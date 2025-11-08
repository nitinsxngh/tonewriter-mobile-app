import React from 'react'

const StatusBar: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-5 pt-3 pb-2 text-white text-sm">
      {/* Time */}
      <span className="font-medium">9:41</span>
      
      {/* Status Icons */}
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <div className="flex items-end gap-0.5">
          <div className="w-1 h-1.5 bg-white rounded-sm"></div>
          <div className="w-1 h-2 bg-white rounded-sm"></div>
          <div className="w-1 h-2.5 bg-white rounded-sm"></div>
        </div>
        
        {/* WiFi icon */}
        <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 1C6.5 1 3.4 2.2 1 4.3l1.4 1.7C4.4 4.9 7.1 3.8 10 3.8s5.6 1.1 7.6 3.2L19 5.3C16.6 3.2 13.5 1 10 1zm0 5c-2.2 0-4.1.8-5.6 2.1L6 11c1.1-1 2.6-1.6 4-1.6s2.9.6 4 1.6l1.6-1.9C14.1 6.8 12.2 6 10 6zm0 5c-1.1 0-2 .4-2.7 1.1L10 15l2.7-2.9C12 11.4 11.1 11 10 11z"/>
        </svg>
        
        {/* Battery icon */}
        <div className="relative ml-1">
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="absolute right-0 top-0.5 w-0.5 h-2 bg-white"></div>
            <div className="absolute left-0.5 top-0.5 w-4 h-2 bg-white rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StatusBar

