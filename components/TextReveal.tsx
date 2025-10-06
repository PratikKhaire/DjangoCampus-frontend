"use client"

import { useRef, useEffect, ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface TextRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export default function TextReveal({ 
  children, 
  className = "",
  delay = 0,
  duration = 1
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate the reveal
    tl.fromTo(textRef.current, {
      y: "100%",
      opacity: 0
    }, {
      y: "0%", 
      opacity: 1,
      duration,
      delay,
      ease: "power3.out"
    })

    return () => {
      tl.kill()
    }
  }, [delay, duration])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={textRef}>
        {children}
      </div>
    </div>
  )
}