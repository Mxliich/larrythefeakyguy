"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function InstagramButton() {
  return (
    <Button
      variant="outline"
      size="lg"
      className="bg-white hover:bg-gray-100 text-black rounded-full px-6 py-2 flex items-center gap-2"
      onClick={() => window.open("https://www.instagram.com/mxliich", "_blank")}
    >
      <div className="relative h-6 w-6">
        <Image
          src="/images/instagram-profile.png"
          alt="Instagram Profile"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <span>Follow Us</span>
    </Button>
  )
} 