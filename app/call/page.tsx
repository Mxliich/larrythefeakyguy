"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  LucideVideo,
  LucideVideoOff,
  LucideMic,
  LucideMicOff,
  LucideVolume2,
  LucideVolumeX,
  LucidePhoneOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import LoadingScreen from "@/components/loading-screen"

export default function CallPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Handle loading screen timing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Handle audio
  useEffect(() => {
    let audio: HTMLAudioElement | null = null

    if (!isLoading) {
      audio = new Audio("/audio/larry-purr.mp3")
      audio.loop = true

      if (!isMuted) {
        audio.play().catch((error) => {
          console.error("Audio playback failed:", error)
        })
      }
    }

    return () => {
      if (audio) {
        audio.pause()
        audio = null
      }
    }
  }, [isLoading, isMuted])

  // Clean up media streams when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleCamera = async () => {
    try {
      if (isCameraOn) {
        // Turn off camera
        if (streamRef.current) {
          streamRef.current.getVideoTracks().forEach((track) => {
            track.stop()
          })
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
        setIsCameraOn(false)
      } else {
        // Turn on camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        streamRef.current = stream
        setIsCameraOn(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Could not access your camera. Please check your permissions.")
    }
  }

  const toggleMic = async () => {
    try {
      if (isMicOn) {
        // Turn off microphone
        if (streamRef.current) {
          streamRef.current.getAudioTracks().forEach((track) => {
            track.stop()
          })

          // If camera is still on, we need to keep video tracks
          if (isCameraOn) {
            const videoStream = await navigator.mediaDevices.getUserMedia({ video: true })
            streamRef.current = videoStream
            if (videoRef.current) {
              videoRef.current.srcObject = videoStream
            }
          } else {
            streamRef.current = null
            if (videoRef.current) {
              videoRef.current.srcObject = null
            }
          }
        }
        setIsMicOn(false)
      } else {
        // Turn on microphone
        let stream

        if (streamRef.current && isCameraOn) {
          // If camera is already on, we need to get a new stream with both video and audio
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          })
        } else {
          // Just get audio
          stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          })
        }

        streamRef.current = stream

        if (videoRef.current && isCameraOn) {
          videoRef.current.srcObject = stream
        }

        setIsMicOn(true)
      }
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Could not access your microphone. Please check your permissions.")
    }
  }

  const handleLeaveCall = () => {
    // Stop all tracks before navigating
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop()
      })
    }
    router.push("/")
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Larry's image */}
      <div className="w-full h-full absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <img
            src={isMobile ? "/images/larry-2.png" : "/images/larry.png"}
            alt="Larry the cat staring intensely at you"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
      </div>

      {/* User's video feed */}
      {isCameraOn && (
        <div className="absolute bottom-24 right-6 md:right-10 z-10 w-32 h-40 md:w-48 md:h-64 rounded-lg overflow-hidden border-2 border-purple-500 shadow-lg shadow-purple-500/30">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-1 px-2 text-xs text-white/80 text-center">
            You
          </div>
        </div>
      )}

      {/* Call controls */}
      <div className="fixed bottom-8 left-0 right-0 z-10">
        <div className="flex items-center justify-center gap-4 bg-black/60 backdrop-blur-md py-4 px-6 rounded-full max-w-md mx-auto border border-purple-500/30">
          <Button
            variant="outline"
            size="icon"
            className={`${isCameraOn ? "bg-purple-600 border-purple-400" : "bg-purple-900/50 border-purple-500/50"} hover:bg-purple-800/70 text-white rounded-full h-12 w-12`}
            onClick={toggleCamera}
          >
            {isCameraOn ? <LucideVideo className="h-5 w-5" /> : <LucideVideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`${isMicOn ? "bg-purple-600 border-purple-400" : "bg-purple-900/50 border-purple-500/50"} hover:bg-purple-800/70 text-white rounded-full h-12 w-12`}
            onClick={toggleMic}
          >
            {isMicOn ? <LucideMic className="h-5 w-5" /> : <LucideMicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`${isMuted ? "bg-pink-900/50 border-pink-500/50" : "bg-purple-900/50 border-purple-500/50"} hover:bg-purple-800/70 text-white rounded-full h-12 w-12`}
            onClick={toggleMute}
          >
            {isMuted ? <LucideVolumeX className="h-5 w-5" /> : <LucideVolume2 className="h-5 w-5" />}
          </Button>

          <Button
            variant="destructive"
            size="icon"
            className="bg-red-600 hover:bg-red-700 text-white rounded-full h-12 w-12"
            onClick={handleLeaveCall}
          >
            <LucidePhoneOff className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Call status */}
      <div className="fixed top-8 left-0 right-0 z-10 text-center">
        <div className="inline-block bg-black/60 backdrop-blur-md py-2 px-4 rounded-full text-white/90">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Call with Larry • Live
        </div>
      </div>

      {/* Camera/Mic permission prompt */}
      {!isCameraOn && !isMicOn && (
        <div className="fixed top-20 left-0 right-0 z-10 text-center">
          <div className="inline-block bg-purple-900/70 backdrop-blur-md py-2 px-4 rounded-lg text-white/90 text-sm max-w-xs mx-auto animate-pulse">
            Turn on your camera or mic to interact with Larry!
          </div>
        </div>
      )}
    </main>
  )
} 