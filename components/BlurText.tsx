"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
}

export default function BlurText({ 
  text, 
  className = "", 
  delay = 0, 
  duration = 0.8,
  stagger = 0.03 
}: BlurTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const chars = textRef.current.querySelectorAll('.char')
    
    // Set initial state
    gsap.set(chars, { 
      opacity: 0,
      filter: "blur(10px)",
      y: 20
    })

    // Animate in
    gsap.to(chars, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration,
      stagger,
      delay,
      ease: "power3.out",
    })
  }, [delay, duration, stagger])

  const splitText = text.split('').map((char, index) => (
    <span 
      key={index} 
      className="char inline-block"
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))

  return (
    <div ref={textRef} className={className}>
      {splitText}
    </div>
  )
}