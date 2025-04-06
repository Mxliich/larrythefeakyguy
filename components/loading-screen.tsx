"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [loadingText, setLoadingText] = useState("Warming up Larry's purr machine")

  // Animate the loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((current) => {
        if (current.endsWith("...")) {
          return "Warming up Larry's purr machine"
        } else {
          return current + "."
        }
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-purple-500/30"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-600 animate-spin"></div>

            {/* Cat silhouette in the center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 text-purple-400 opacity-70">🐱</div>
            </div>
          </div>
        </div>

        <p className="text-xl text-purple-300 animate-pulse">{loadingText}</p>

        <p className="text-sm text-purple-400/60 mt-8 max-w-xs mx-auto">
          Larry is known to take his time. He's a cat, after all.
        </p>
      </div>

      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-20 bg-gradient-to-b from-purple-500/0 via-purple-500/30 to-purple-500/0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.5,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

