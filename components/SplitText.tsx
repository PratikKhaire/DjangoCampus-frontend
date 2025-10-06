"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  stagger?: number
}

export default function SplitText({ 
  text, 
  className = "", 
  delay = 0, 
  duration = 0.6,
  stagger = 0.02 
}: SplitTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const chars = textRef.current.querySelectorAll('.char')
    
    // Set initial state
    gsap.set(chars, { 
      y: 100, 
      opacity: 0,
      rotationX: -90
    })

    // Animate in
    gsap.to(chars, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration,
      stagger,
      delay,
      ease: "back.out(1.7)",
    })
  }, [delay, duration, stagger])

  const splitText = text.split('').map((char, index) => (
    <span 
      key={index} 
      className="char inline-block"
      style={{ transformOrigin: '50% 100%' }}
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