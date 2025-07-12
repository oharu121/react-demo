import React, { useRef, useState } from "react"

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (!videoRef.current) return
    isPlaying ? videoRef.current.pause() : videoRef.current.play()
    setIsPlaying((prev) => !prev)
  }

  return (
    <div
      className={[
        // Flex centering and min height
        "flex items-center justify-center min-h-[60vh]"
      ].join(" ")}
    >
      <div
        className={[
          // Positioning and layout
          "relative group w-full max-w-3xl aspect-video",
          // Visuals
          "rounded-xl shadow-lg overflow-hidden bg-gray-900"
        ].join(" ")}
      >
        <video
          ref={videoRef}
          className={[
            // Sizing and layout
            "block w-full h-full object-cover",
            // Visuals
            "rounded-xl shadow-md"
          ].join(" ")}
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>
        <button
          onClick={togglePlay}
          className={[
            // Positioning
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            // Visibility and interaction
            "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity duration-200",
            // Color and effects
            "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white shadow-lg outline-none",
            // Shape and layout
            "rounded-full flex items-center justify-center aspect-square",
            // Sizing
            "w-1/6 h-1/6 min-w-12 min-h-12 max-w-20 max-h-20"
          ].join(" ")}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          tabIndex={0}
        >
          {isPlaying ? (
            // Pause SVG
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2/3 h-2/3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
            </svg>
          ) : (
            // Play SVG
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2/3 h-2/3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25l13.5 6.75-13.5 6.75V5.25z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}