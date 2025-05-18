import Link from "next/link"
import { LucideArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import InstagramButton from "@/components/instagram-button"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
       
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black z-0"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500/30"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto text-center z-10 relative">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Missed Call From Larry
        </h1>

        <div className="mb-8 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
          <div className="relative bg-black/80 p-6 rounded-lg border border-purple-500/30">
            <p className="text-xl md:text-2xl leading-relaxed mb-4">
              Meet Larry, He is so freaky that he might steal your balls. 
              A cat with 200+ history crimes.
              You just missed a call from him, you should call him back.
            </p>
          </div>
        </div>

        <Link href="/call" className="inline-block">
          <Button className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl py-6 px-8 rounded-full hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105">
            Start Call With Larry
            <LucideArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>

        <p className="text-purple-400/70 mt-8 text-sm">
          Warning: Larry might judge your soul. Or just meow. It's a toss-up.
        </p>
      </div>

      {/* Decorative cat paw prints */}
      <div className="absolute bottom-4 left-4 opacity-30">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-purple-500/50 inline-block mx-1"
            style={{ transform: `translateY(${(i % 2) * 8}px)` }}
          />
        ))}
      </div>

      
    </main>
  )
}

