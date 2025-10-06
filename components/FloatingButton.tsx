"use client"

import { useRef, useEffect, ReactNode } from "react"
import { gsap } from "gsap"

interface FloatingButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export default function FloatingButton({ 
  children, 
  className = "",
  onClick
}: FloatingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    // Floating animation
    gsap.to(button, {
      y: -5,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    })

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        rotationY: 10,
        duration: 0.3,
        ease: "back.out(1.7)"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        rotationY: 0,
        duration: 0.3,
        ease: "back.out(1.7)"
      })
    }

    const handleClick = () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      })
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('click', handleClick)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <button 
      ref={buttonRef} 
      className={`fixed bottom-8 right-8 z-50 ${className}`}
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </button>
  )
}