"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Github } from "lucide-react"
import Typewriter from 'typewriter-effect'

export default function HacktoberfestHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hactoberfest.jpg)' }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Hacktoberfest Badge */}
          <Badge className="mb-8 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-lg px-6 py-2 animate-bounce">
            🎃 Hacktoberfest 2025 🎃
          </Badge>

          {/* Main Heading with Typing Effect */}
          <div className="mb-8">
            <h1 className="font-black text-5xl md:text-7xl lg:text-8xl text-white mb-4 leading-tight">
              <div className="text-orange-400">This October</div>
              <div className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                <Typewriter
                  options={{
                    strings: ['Hacktoberfest', 'Open Source', 'Collaboration', 'Innovation'],
                    autoStart: true,
                    loop: true,
                    delay: 100,
                    deleteSpeed: 50,
                  }}
                />
              </div>
              {/* <div className="text-white">We Feast</div> */}
              {/* <div className="text-gradient bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                on DjangoCampus
              </div> */}
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12">
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Join us this Hacktoberfest and contribute to open source! 
              <span className="block mt-2 text-orange-300 font-semibold">
                Let's hack, learn, and build amazing things together! 🚀
              </span>
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              asChild
            >
              <a href="/workshops">
                <Calendar className="mr-3 h-6 w-6" />
                Join Our Workshop
              </a>
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-black text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 bg-black/50 backdrop-blur-sm"
              asChild
            >
              <a href="https://github.com/Darkbeast-glitch/learnDjWithJulius" target="_blank" rel="noopener noreferrer">
                <Github className="mr-3 h-6 w-6" />
                Contribute Now
              </a>
            </Button>

            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 bg-black/50 backdrop-blur-sm"
              asChild
            >
              <a href="https://whatsapp.com/channel/0029VbB2boDEawdueVgsYC39">
                <Users className="mr-3 h-6 w-6" />
                Join Community
              </a>
            </Button>
          </div>

          {/* Stats or Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">31</div>
              <div className="text-gray-300 text-lg">Days of Coding</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">4</div>
              <div className="text-gray-300 text-lg">Pull Requests Needed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-gray-300 text-lg">Learning Opportunities</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Code Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-orange-300/30 text-2xl font-mono animate-float">{"<div>"}</div>
        <div className="absolute top-40 right-20 text-green-300/30 text-2xl font-mono animate-float delay-1000">{"{code}"}</div>
        <div className="absolute bottom-32 left-20 text-purple-300/30 text-2xl font-mono animate-float delay-500">{"</>"}</div>
        <div className="absolute bottom-20 right-32 text-pink-300/30 text-2xl font-mono animate-float delay-1500">{"git push"}</div>
      </div>
    </section>
  )
}