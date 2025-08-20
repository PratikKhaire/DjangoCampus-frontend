"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Building2, Star, Award, Globe, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"

export default function PartnersPage() {
  // Dummy data - replace with backend API calls later
  const partners = [
    {
      id: 1,
      name: "University of Ghana",
      type: "Academic Partner",
      logo: "/placeholder-logo.png",
      description: "Hosting Django workshops at their computer science department.",
      website: "https://ug.edu.gh",
      partnership_date: "2024-01-15",
      tier: "Platinum"
    },
    {
      id: 2,
      name: "Python Ghana",
      type: "Community Partner",
      logo: "/pycon-tanzania-logo.png",
      description: "Supporting our mission with technical expertise and community outreach.",
      website: "https://pythonghana.org",
      partnership_date: "2024-02-20",
      tier: "Gold"
    },
    {
      id: 3,
      name: "TechHub Africa",
      type: "Technology Partner",
      logo: "/placeholder-logo.svg",
      description: "Providing venue space and technical infrastructure for workshops.",
      website: "https://techhub.africa",
      partnership_date: "2024-03-10",
      tier: "Silver"
    }
  ]

  const contributors = [
    {
      id: 1,
      name: "Sarah Mensah",
      role: "Lead Volunteer",
      avatar: "/african-woman-developer-smiling.png",
      contributions: "Organized 5 workshops, mentored 100+ students"
    },
    {
      id: 2,
      name: "Kwame Asante",
      role: "Technical Mentor",
      avatar: "/placeholder-user.jpg",
      contributions: "Created curriculum content, led 8 technical sessions"
    },
    {
      id: 3,
      name: "Amina Ibrahim",
      role: "Community Manager",
      avatar: "/african-woman-teacher-computer.png",
      contributions: "Built partnerships across 3 universities"
    }
  ]

  const donors = [
    {
      id: 1,
      name: "Anonymous Donor",
      amount: "$500",
      message: "Keep up the amazing work empowering African developers!",
      date: "2024-08-15"
    },
    {
      id: 2,
      name: "DevCorp Solutions",
      amount: "$1,200",
      message: "Proud to support tech education across Africa.",
      date: "2024-07-22"
    },
    {
      id: 3,
      name: "The Johnson Family",
      amount: "$250",
      message: "Education is the foundation of progress. Go DjangoCampus!",
      date: "2024-08-10"
    }
  ]

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white'
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 'Silver': return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      default: return 'bg-primary text-primary-foreground'
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Platinum': return <Award className="h-4 w-4" />
      case 'Gold': return <Star className="h-4 w-4" />
      case 'Silver': return <Award className="h-4 w-4" />
      default: return <Building2 className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-card to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-secondary text-secondary-foreground">Building Together</Badge>
          <h1 className="font-serif font-black text-4xl md:text-6xl text-foreground mb-6 leading-tight">
            Our Amazing
            <br />
            <span className="text-primary">Partners & Community</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Meet the incredible organizations, contributors, and supporters who make DjangoCampus possible across Africa.
            Together, we're building the next generation of developers.
          </p>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">
              Strategic Partners
            </h2>
            <p className="text-lg text-muted-foreground">
              Organizations that share our vision of empowering African developers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map((partner) => (
              <Card key={partner.id} className="border-border bg-card hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="h-20 w-20 object-contain mx-auto group-hover:scale-110 transition-transform"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-logo.png"
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Badge className={`${getTierColor(partner.tier)} px-3 py-1`}>
                      {getTierIcon(partner.tier)}
                      <span className="ml-1">{partner.tier}</span>
                    </Badge>
                  </div>
                  <CardTitle className="font-serif font-bold text-xl">{partner.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {partner.type}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {partner.description}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a href={partner.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit Website
                      </a>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Partner since {new Date(partner.partnership_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contributors Section */}
      <section id="contributors" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">
              Key Contributors
            </h2>
            <p className="text-lg text-muted-foreground">
              Volunteers and mentors who dedicate their time to make workshops happen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contributors.map((contributor) => (
              <Card key={contributor.id} className="border-border bg-background hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="relative mx-auto mb-4">
                    <img 
                      src={contributor.avatar} 
                      alt={contributor.name}
                      className="h-24 w-24 rounded-full object-cover border-4 border-primary/10"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-user.jpg"
                      }}
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                      <Heart className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                  <CardTitle className="font-serif font-bold text-xl">{contributor.name}</CardTitle>
                  <CardDescription className="text-secondary font-medium">
                    {contributor.role}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {contributor.contributions}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donors Section */}
      <section id="donors" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">
              Recent Supporters
            </h2>
            <p className="text-lg text-muted-foreground">
              Generous donors who believe in our mission
            </p>
          </div>

          <div className="space-y-6">
            {donors.map((donor) => (
              <Card key={donor.id} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        <h3 className="font-semibold text-lg">{donor.name}</h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {donor.amount}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground italic mb-2">
                        "{donor.message}"
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Donated on {new Date(donor.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <Globe className="h-16 w-16 mx-auto mb-6" />
          <h2 className="font-serif font-black text-3xl md:text-4xl mb-4">
            Join Our Growing Network
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Become a partner, contributor, or supporter in building Africa's tech future
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => {
                const email = 'juliusboakye@pythonghana.org'
                const subject = 'Partnership Inquiry - DjangoCampus'
                const body = `Hello Julius,

I'm interested in partnering with DjangoCampus to support your mission.

Please let me know more about:
- Partnership opportunities
- How we can collaborate
- Ways to contribute to the movement

Looking forward to hearing from you.

Best regards`
                
                const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                try {
                  window.location.href = mailtoLink
                } catch (error) {
                  alert(`Please send an email to: ${email}`)
                }
              }}
            >
              <Building2 className="mr-2 h-5 w-5" />
              Become a Partner
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              onClick={() => window.open('https://paystack.com/pay/djangocampus-donate', '_blank')}
            >
              <Heart className="mr-2 h-5 w-5" />
              Support Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
