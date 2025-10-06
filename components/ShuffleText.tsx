           "use client"

import { useRef, useEffect, useState } from "react"

interface ShuffleTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  shuffleSpeed?: number
}

export default function ShuffleText({ 
  text, 
  className = "", 
  delay = 0, 
  duration = 2000,
  shuffleSpeed = 50
}: ShuffleTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isShuffling, setIsShuffling] = useState(false)
  
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShuffling(true)
      let iteration = 0
      
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index]
              }
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")
        )
        
        if (iteration >= text.length) {
          clearInterval(interval)
          setIsShuffling(false)
        }
        
        iteration += 1 / 3
      }, shuffleSpeed)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay, duration, shuffleSpeed, chars])

  return (
    <div className={className}>
      {displayText || text}
    </div>
  )
}