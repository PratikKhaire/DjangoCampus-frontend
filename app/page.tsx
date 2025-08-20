"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Code, Heart, Calendar, MapPin, Mail, Github, Linkedin, Twitter, Instagram, Facebook, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import { workshopService } from "@/services/workshopService"
import { teamService } from "@/services/teamService"
import { Workshop, TeamMember } from "@/types/api"

export default function Home() {
  const [nextWorkshop, setNextWorkshop] = useState<Workshop | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [teamLoading, setTeamLoading] = useState(true)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch workshop data
        const workshops = await workshopService.getUpcomingWorkshops()
        if (workshops.length > 0) {
          setNextWorkshop(workshops[0])
        }
      } catch (error) {
        console.error('Error fetching workshops:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchTeamMembers = async () => {
      try {
        const members = await teamService.getTeamMembers()
        setTeamMembers(members)
      } catch (error) {
        console.error('Error fetching team members:', error)
      } finally {
        setTeamLoading(false)
      }
    }

    fetchData()
    fetchTeamMembers()
  }, [])

  // Carousel control functions for pausing/resuming auto-scroll
  const pauseCarousel = () => {
    setIsPaused(true)
    setIsAutoPlaying(false)
  }

  const resumeCarousel = () => {
    setIsPaused(false)
    setIsAutoPlaying(true)
  }

  const handleArrowClick = () => {
    pauseCarousel()
    // Resume after 10 seconds
    setTimeout(() => {
      resumeCarousel()
    }, 10000)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Function to get social media icon based on platform
  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase()
    switch (platformLower) {
      case 'github':
        return <Github className="h-4 w-4" />
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />
      case 'twitter':
        return <Twitter className="h-4 w-4" />
      case 'instagram':
        return <Instagram className="h-4 w-4" />
      case 'facebook':
        return <Facebook className="h-4 w-4" />
      default:
        return <ExternalLink className="h-4 w-4" />
    }
  }

  // Function to get social platform color
  const getSocialColor = (platform: string) => {
    const platformLower = platform.toLowerCase()
    switch (platformLower) {
      case 'github':
        return 'hover:bg-gray-600/10 hover:text-gray-600'
      case 'linkedin':
        return 'hover:bg-blue-600/10 hover:text-blue-600'
      case 'twitter':
        return 'hover:bg-blue-400/10 hover:text-blue-400'
      case 'instagram':
        return 'hover:bg-pink-600/10 hover:text-pink-600'
      case 'facebook':
        return 'hover:bg-blue-700/10 hover:text-blue-700'
      default:
        return 'hover:bg-primary/10 hover:text-primary'
    }
  }

  // Function to handle email contact
  const handleContactEmail = () => {
    const email = 'juliusboakye@pythonghana.org'
    const subject = 'Interest in Joining DjangoCampus Team'
    const body = `Hello Julius,

I'm interested in joining the DjangoCampus team as an educator/mentor.

Here are my details:

Name: 
Experience: 
Skills: 
Motivation: 

Thank you for your time!

Best regards`

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Try to open email client
    try {
      window.location.href = mailtoLink
    } catch (error) {
      // Fallback: copy email to clipboard and show alert
      navigator.clipboard.writeText(email).then(() => {
        alert(`Please send an email to: ${email}\n\nEmail address copied to clipboard!`)
      }).catch(() => {
        alert(`Please send an email to: ${email}`)
      })
    }
  }
  return (
    <div className="min-h-screen bg-background">
    
      <Header />

      {/* Main Content */}
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-card to-background">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-secondary text-secondary-foreground">Empowering Youth in Tech with Django</Badge>
          <h1 className="font-serif font-black text-4xl md:text-6xl text-foreground mb-6 leading-tight">
            Learn Django.
            <br />
            <span className="text-primary">Build Amazing Things.</span>
            <br />
            Change the World.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Join DjangoCampus and discover the power of programming. Our free workshops welcome youth of all
            backgrounds to learn web development in a supportive, inclusive environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <a href="/workshops">
                <Calendar className="mr-2 h-5 w-5" />
                Join Next Workshop
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://whatsapp.com/channel/0029VbB2boDEawdueVgsYC39">
                <Users className="mr-2 h-5 w-5" />
                Meet Our Community
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">What is DjangoCampus?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a dedicated team that organizes free Django workshops on different campuses. We're open for partnerships to bring quality programming education to more students.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Code className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-serif font-bold">Learn to Code</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Master Django web framework through hands-on tutorials and real projects. No prior experience needed!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="font-serif font-bold">Build Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Connect with like-minded peers, find mentors, and become part of a vibrant global tech community.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-serif font-bold">Make Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Use your new skills to create solutions that matter to your community and beyond.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workshop Info */}
      <section id="workshops" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Free Django Workshops</h2>
            <p className="text-lg text-muted-foreground">
              Join our upcoming workshops and start your coding journey today
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading workshop information...</p>
            </div>
          ) : nextWorkshop ? (
            <Card className="border-border bg-background">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="font-serif font-bold text-xl">
                      Next Workshop: {nextWorkshop.workshop_name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(nextWorkshop.workshop_date)}
                    </CardDescription>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      {nextWorkshop.workshop_location}
                    </CardDescription>
                    {nextWorkshop.venue && (
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Users className="h-4 w-4" />
                        {nextWorkshop.venue}
                      </CardDescription>
                    )}
                  </div>
                  <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/workshops">
                      Register Now
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {nextWorkshop.workshop_description && (
                  <div className="mb-6">
                    <p className="text-muted-foreground">{nextWorkshop.workshop_description}</p>
                  </div>
                )}
               
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {parseInt(nextWorkshop.registrations_count) || 0} people registered
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border bg-background">
              <CardContent className="text-center py-12">
                <h3 className="font-semibold text-xl mb-4">No Upcoming Workshops</h3>
                <p className="text-muted-foreground mb-6">
                  We're currently planning our next workshop. Check back soon or join our community to be notified!
                </p>
                <Button asChild>
                  <Link href="/workshops">
                    View Past Workshops
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Community Stories */}
      <section id="community" className="py-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Growing Community</h2>
            <p className="text-lg text-muted-foreground">
              Meet some of the passionate individuals joining our Django learning journey
            </p>
          </div>

          {/* Auto-flowing Carousel with Controls */}
          <div className="relative">
            <div className="overflow-hidden mx-12">
              <div 
                className={`flex gap-8 ${isAutoPlaying && !isPaused ? 'animate-scroll' : ''}`}
                style={{
                  width: 'calc(320px * 6)', // 3 cards * 2 for seamless loop
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
                onMouseEnter={pauseCarousel}
                onMouseLeave={resumeCarousel}
              >
                {/* First set of cards */}
                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/juli.jpeg" alt="Juliana" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Juliana Lawson</CardTitle>
                        <CardDescription>Member Care/IT Support</CardDescription>

                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "Just started my coding journey with DjangoCampus. Excited to learn web development and build my first app!"
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/placeholder-s8blj.png" alt="Grace" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Grace Mwangi</CardTitle>
                        <CardDescription>CS Student</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "The community here is amazing! Looking forward to attending my first workshop and meeting fellow learners."
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/african-woman-teacher-computer.png" alt="Fatuma" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Fatuma Ally</CardTitle>
                        <CardDescription>Teacher & Early Supporter</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "Joined the DjangoCampus community from day one. Can't wait to see how this initiative grows!"
                    </p>
                  </CardContent>
                </Card>

                {/* Duplicate cards for seamless loop */}
                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/juli.jpeg" alt="Juliana" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Juliana Lawson</CardTitle>
                        <CardDescription>Member Care/IT Support</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "Just started my coding journey with DjangoCampus. Excited to learn web development and build my first app!"
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/placeholder-s8blj.png" alt="Grace" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Grace Mwangi</CardTitle>
                        <CardDescription>CS Student</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "The community here is amazing! Looking forward to attending my first workshop and meeting fellow learners."
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card flex-shrink-0 w-80">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <img src="/african-woman-teacher-computer.png" alt="Fatuma" className="h-12 w-12 rounded-full" />
                      <div>
                        <CardTitle className="text-lg">Fatuma Ally</CardTitle>
                        <CardDescription>Teacher & Early Supporter</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      "Joined the DjangoCampus community from day one. Can't wait to see how this initiative grows!"
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              onClick={handleArrowClick}
              onMouseEnter={pauseCarousel}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Pause and control carousel</span>
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              onClick={handleArrowClick}
              onMouseEnter={pauseCarousel}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Pause and control carousel</span>
            </Button>

            {/* Auto-play indicator */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <div className={`h-2 w-2 rounded-full ${isAutoPlaying && !isPaused ? 'bg-green-500 animate-pulse' : 'bg-gray-400'} transition-colors`} />
              <span className="text-xs text-muted-foreground">
                {isAutoPlaying && !isPaused ? 'Auto-flowing' : 'Paused'}
              </span>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-8">
              <p className="text-muted-foreground mb-4">Be part of our growing community!</p>
                <a href="https://whatsapp.com/channel/0029VbB2boDEawdueVgsYC39">
              <Button variant="outline" className="group">
                <Users className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Join the Community
              </Button></a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-serif font-black text-3xl md:text-4xl mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join hundreds of youth who've discovered the joy of programming with Django Campus
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Mail className="mr-2 h-5 w-5" />
              Get Workshop Updates
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Follow Us on Social
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 px-4 bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate educators and mentors who make DjangoCampus workshops possible
            </p>
          </div>

          {teamLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-border bg-background animate-pulse">
                  <CardHeader className="text-center pb-4">
                    <div className="h-24 w-24 rounded-full bg-gray-300 mx-auto mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-16 bg-gray-300 rounded mb-4"></div>
                    <div className="flex justify-center gap-3">
                      <div className="h-9 w-9 bg-gray-300 rounded"></div>
                      <div className="h-9 w-9 bg-gray-300 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} className="border-border bg-background hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className="relative mx-auto mb-4">
                      <img 
                        src={member.image_url} 
                        alt={member.fullName}
                        className="h-24 w-24 rounded-full object-cover border-4 border-primary/10 group-hover:border-primary/30 transition-colors"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-user.jpg"
                        }}
                      />
                    </div>
                    <CardTitle className="font-serif font-bold text-xl">{member.fullName}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      {member.bio}
                    </p>
                    
                    {/* Social Links */}
                    {member.socials && member.socials.length > 0 && (
                      <div className="flex justify-center gap-3">
                        {member.socials.map((social) => (
                          <Button
                            key={social.id}
                            size="sm"
                            variant="ghost"
                            className={`h-9 w-9 p-0 ${getSocialColor(social.platform)}`}
                            asChild
                          >
                            <a 
                              href={social.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              title={`${member.fullName} on ${social.platform}`}
                            >
                              {getSocialIcon(social.platform)}
                              <span className="sr-only">{social.platform}</span>
                            </a>
                          </Button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">No team members found at the moment.</p>
            </div>
          )}

          {/* Join Team CTA */}
          <div className="text-center mt-12">
            <Card className="border-dashed border-2 border-primary/30 bg-primary/5 max-w-md mx-auto">
              <CardContent className="py-8">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Want to Join Our Team?</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  We're always looking for passionate educators and mentors
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleContactEmail}
                  className="inline-flex items-center"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Get In Touch
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Community Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">
              Support Our Movement
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Help us reach more students across campuses. Your donation enables us to organize free workshops, 
              provide learning materials, and build a stronger tech community for the next generation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">$10</div>
                <p className="text-sm text-muted-foreground">Sponsor learning materials for one student</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/30 bg-primary/10 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">$50</div>
                <p className="text-sm text-muted-foreground">Fund a complete workshop session</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-2">$100</div>
                <p className="text-sm text-muted-foreground">Support an entire campus outreach program</p>
              </CardContent>
            </Card>

            <Card className="border-dashed border-2 border-primary/30 bg-secondary/5 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-secondary mb-2">Custom</div>
                <p className="text-sm text-muted-foreground">Any amount helps build our community</p>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Section */}
          <div className="mb-8 p-6 bg-background/50 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold text-lg text-center mb-4">Why Your Donation Matters</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="mb-2">🎓</div>
                <p className="font-medium">Direct Impact</p>
                <p className="text-muted-foreground">100% goes to students - no overhead costs</p>
              </div>
              <div className="text-center">
                <div className="mb-2">🌱</div>
                <p className="font-medium">Long-term Growth</p>
                <p className="text-muted-foreground">Students become mentors, creating sustainable impact</p>
              </div>
              <div className="text-center">
                <div className="mb-2">📊</div>
                <p className="font-medium">Transparent Updates</p>
                <p className="text-muted-foreground">Regular reports on how your donation is used</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => window.open('https://paystack.com/pay/djangocampus-50', '_blank')}
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate $50
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open('https://paystack.com/pay/djangocampus-donate', '_blank')}
            >
              <Heart className="mr-2 h-5 w-5" />
              Custom Amount
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const email = 'juliusboakye@pythonghana.org'
                const subject = 'Partnership & Sponsorship Inquiry - DjangoCampus'
                const body = `Hello Julius,

I'm interested in partnering with or sponsoring DjangoCampus to support your mission of bringing Django education to more students.

Please let me know more about:
- Partnership opportunities
- Sponsorship packages
- How I can contribute to the movement

Looking forward to hearing from you.

Best regards`
                
                const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
                try {
                  window.location.href = mailtoLink
                } catch (error) {
                  navigator.clipboard.writeText(email).then(() => {
                    alert(`Please send an email to: ${email}\n\nEmail address copied to clipboard!`)
                  }).catch(() => {
                    alert(`Please send an email to: ${email}`)
                  })
                }
              }}
            >
              <Users className="mr-2 h-5 w-5" />
              Become a Partner
            </Button>
          </div>

          {/* Additional Benefits */}
          <div className="mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              <span className="font-medium">🎁 Donor Benefits:</span> Recognition on our website • Quarterly impact reports • Exclusive community updates
            </p>
            <p className="text-xs text-muted-foreground">
              All donations are used directly for educational programs. Tax receipts available upon request.
            </p>
          </div>

          <div className="mt-8 p-4 bg-background/30 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-muted-foreground">
              🌟 Every contribution, no matter the size, helps us empower more young developers across Africa and beyond.
              <br />
              <span className="font-medium">Together, we're building the next generation of tech leaders.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
