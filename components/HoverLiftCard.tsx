"use client"

import { useRef, useEffect, ReactNode } from "react"
import { gsap } from "gsap"

interface HoverLiftCardProps {
  children: ReactNode
  className?: string
  liftHeight?: number
  rotationStrength?: number
}

export default function HoverLiftCard({ 
  children, 
  className = "",
  liftHeight = -10,
  rotationStrength = 5
}: HoverLiftCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = (y - centerY) / centerY * rotationStrength
      const rotateY = (centerX - x) / centerX * rotationStrength

      gsap.to(card, {
        y: liftHeight,
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      })
    }

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [liftHeight, rotationStrength])

  return (
    <div ref={cardRef} className={className} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}