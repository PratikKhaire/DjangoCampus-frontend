
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/"><img src="/Campus_crop.png" alt="DjangoCampus Logo" className="h-10 w-20" /></a >
          <div>
            <h1 className="font-serif font-black text-xl text-foreground">DjangoCampus</h1>
            <p className="text-sm text-muted-foreground">Powered by Django</p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
          <a href="/workshops" className="text-foreground hover:text-primary transition-colors">
            Workshops
          </a>
          <a href="#community" className="text-foreground hover:text-primary transition-colors">
            Community
          </a>
          <a href="/partners" className="text-foreground hover:text-primary transition-colors">
            Partners
          </a>
          <a href="https://whatsapp.com/channel/0029VbB2boDEawdueVgsYC39"><Button>Join Us</Button></a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a 
              href="#about" 
              className="text-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="/workshops" 
              className="text-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Workshops
            </a>
            <a 
              href="#community" 
              className="text-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Community
            </a>
            <a 
              href="/partners" 
              className="text-foreground hover:text-primary transition-colors py-2 border-b border-border/50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Partners
            </a>
            <div className="pt-2">
              <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                Join Us
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}