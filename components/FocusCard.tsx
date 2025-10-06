"use client"

import { useRef, useEffect, ReactNode } from "react"
import { gsap } from "gsap"

interface FocusCardProps {
  children: ReactNode
  className?: string
}

export default function FocusCard({ 
  children, 
  className = ""
}: FocusCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const overlay = overlayRef.current
    if (!card || !overlay) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(overlay, {
        background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 40%)`,
        duration: 0.3
      })

      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(overlay, {
        background: "transparent",
        duration: 0.5
      })

      gsap.to(card, {
        scale: 1,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={cardRef} className={`relative overflow-hidden ${className}`}>
      <div ref={overlayRef} className="absolute inset-0 pointer-events-none z-10" />
      {children}
    </div>
  )
}