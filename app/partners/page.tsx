"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Building2, Star, Award, Globe, Mail, ExternalLink } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import { getPartners, Partner } from "@/services/partnerService"
import { getContributors, Contributor } from "@/services/contributorService"
import { getSupporters, Supporter } from "@/services/supporterService"

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [supporters, setSupporters] = useState<Supporter[]>([])
  const [partnersLoading, setPartnersLoading] = useState(true)
  const [contributorsLoading, setContributorsLoading] = useState(true)
  const [supportersLoading, setSupportersLoading] = useState(true)
  const [partnersError, setPartnersError] = useState<string | null>(null)
  const [contributorsError, setContributorsError] = useState<string | null>(null)
  const [supportersError, setSupportersError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setPartnersLoading(true)
        const response = await getPartners()
        setPartners(response.results.filter(partner => partner.is_active))
        setPartnersError(null)
      } catch (err) {
        console.error('Failed to fetch partners:', err)
        setPartnersError('Failed to load partners')
      } finally {
        setPartnersLoading(false)
      }
    }

    const fetchContributors = async () => {
      try {
        setContributorsLoading(true)
        const response = await getContributors()
        setContributors(response.results.filter(contributor => contributor.is_active))
        setContributorsError(null)
      } catch (err) {
        console.error('Failed to fetch contributors:', err)
        setContributorsError('Failed to load contributors')
      } finally {
        setContributorsLoading(false)
      }
    }

    const fetchSupporters = async () => {
      try {
        setSupportersLoading(true)
        const response = await getSupporters()
        setSupporters(response.results.filter(supporter => supporter.is_active))
        setSupportersError(null)
      } catch (err) {
        console.error('Failed to fetch supporters:', err)
        setSupportersError('Failed to load supporters')
      } finally {
        setSupportersLoading(false)
      }
    }

    fetchPartners()
    fetchContributors()
    fetchSupporters()
  }, [])

  const getTierColor = (tierName: string) => {
    switch (tierName) {
      case 'Platinum': return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white'
      case 'Gold': return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white'
      case 'Silver': return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
      default: return 'bg-primary text-primary-foreground'
    }
  }

  const getTierIcon = (tierName: string) => {
    switch (tierName) {
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
          {partnersLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading partners...</p>
            </div>
          ) : partnersError ? (
            <div className="col-span-full text-center py-12">
              <p className="text-red-500 mb-2">{partnersError}</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : partners.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Building2 className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No partners found</p>
            </div>
          ) : (
            partners.map((partner) => (
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
                    <Badge className={`${getTierColor(partner.tier_name)} px-3 py-1`}>
                      {getTierIcon(partner.tier_name)}
                      <span className="ml-1">{partner.tier_name}</span>
                    </Badge>
                  </div>
                  <CardTitle className="font-serif font-bold text-xl">{partner.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {partner.partner_type_name}
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
            ))
          )}
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
            {contributorsLoading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading contributors...</p>
              </div>
            ) : contributorsError ? (
              <div className="col-span-full text-center py-12">
                <p className="text-red-500 mb-2">{contributorsError}</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : contributors.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No contributors found</p>
              </div>
            ) : (
              contributors.map((contributor) => (
                <Card key={contributor.id} className="border-border bg-background hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <img 
                        src={contributor.photo} 
                        alt={contributor.full_name}
                        className="h-24 w-24 rounded-full object-cover border-4 border-primary/10"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-user.jpg"
                        }}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                        <Heart className="h-4 w-4 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="mb-2">
                      <Badge 
                        className="px-3 py-1 text-white"
                        style={{ backgroundColor: contributor.role_badge_color }}
                      >
                        {contributor.role_name}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif font-bold text-xl">{contributor.full_name}</CardTitle>
                    <CardDescription className="text-secondary font-medium">
                      {contributor.bio}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      <strong>Achievements:</strong> {contributor.achievements}
                    </p>
                    {(contributor.linkedin || contributor.github || contributor.twitter || contributor.website) && (
                      <div className="flex justify-center gap-2 mt-3">
                        {contributor.linkedin && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer">
                              LinkedIn
                            </a>
                          </Button>
                        )}
                        {contributor.github && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={contributor.github} target="_blank" rel="noopener noreferrer">
                              GitHub
                            </a>
                          </Button>
                        )}
                        {contributor.twitter && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={contributor.twitter} target="_blank" rel="noopener noreferrer">
                              Twitter
                            </a>
                          </Button>
                        )}
                        {contributor.website && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={contributor.website} target="_blank" rel="noopener noreferrer">
                              Website
                            </a>
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Supporters Section */}
      <section id="supporters" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">
              Our Supporters
            </h2>
            <p className="text-lg text-muted-foreground">
              Organizations and individuals who believe in our mission
            </p>
          </div>

          {supportersLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading supporters...</p>
            </div>
          ) : supportersError ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-2">{supportersError}</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : supporters.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No supporters found</p>
            </div>
          ) : (
            <div className="space-y-6">
              {supporters.map((supporter) => (
                <Card key={supporter.id} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          {supporter.logo && (
                            <img 
                              src={supporter.logo} 
                              alt={supporter.name}
                              className="h-12 w-12 object-contain rounded"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none'
                              }}
                            />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <Heart className="h-5 w-5 text-red-500" />
                              <h3 className="font-semibold text-lg">{supporter.name}</h3>
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {supporter.contribution_type}
                              </Badge>
                            </div>
                            {supporter.website && (
                              <Button size="sm" variant="outline" asChild className="mt-2">
                                <a href={supporter.website} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Visit Website
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        {supporter.description && (
                          <p className="text-muted-foreground italic mb-2">
                            "{supporter.description}"
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          Supporting since {new Date(supporter.support_date).toLocaleDateString('en-US', {
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
          )}
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
                const email = 'campus.django@gmail.com'
                const subject = 'Partnership Inquiry - DjangoCampus'
                const body = `Hello DjangoCampus Team,

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
