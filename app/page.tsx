"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Code, Heart, Calendar, MapPin, Mail } from "lucide-react"
import Link from "next/link"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import { workshopService } from "@/services/workshopService"
import { Workshop } from "@/types/api"

export default function Home() {
  const [nextWorkshop, setNextWorkshop] = useState<Workshop | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNextWorkshop = async () => {
      try {
        const workshops = await workshopService.getUpcomingWorkshops()
        // Get the next upcoming workshop (first one in the list)
        if (workshops.length > 0) {
          setNextWorkshop(workshops[0])
        }
      } catch (error) {
        console.error('Error fetching workshops:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNextWorkshop()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
              We're a global non-profit organization that empowers and helps youth on campus organize free programming workshops.
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
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">What you'll learn:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Python programming basics</li>
                      <li>• Django web framework</li>
                      <li>• HTML, CSS, and web design</li>
                      <li>• Deploying your first web app</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">What's included:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Free laptop for the workshop</li>
                      <li>• Meals and refreshments</li>
                      <li>• Take-home tutorial materials</li>
                      <li>• Ongoing mentorship support</li>
                    </ul>
                  </div>
                </div>
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
      <section id="community" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif font-black text-3xl md:text-4xl text-foreground mb-4">Our Amazing Community</h2>
            <p className="text-lg text-muted-foreground">
              Hear from women who've transformed their lives through Django Girls workshops
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img src="/african-woman-developer-smiling.png" alt="Amina" className="h-12 w-12 rounded-full" />
                  <div>
                    <CardTitle className="text-lg">Juliana Lawson</CardTitle>
                    <CardDescription>Software Developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "Django Campus gave me the confidence to pursue tech. Now I'm building apps that help local businesses
                  in Ghana!"
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img src="/placeholder-s8blj.png" alt="Grace" className="h-12 w-12 rounded-full" />
                  <div>
                    <CardTitle className="text-lg">Grace Mwangi</CardTitle>
                    <CardDescription>CS Student & Entrepreneur</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "The workshop opened my eyes to web development. I've since started my own tech consultancy!"
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img src="/african-woman-teacher-computer.png" alt="Fatuma" className="h-12 w-12 rounded-full" />
                  <div>
                    <CardTitle className="text-lg">Fatuma Ally</CardTitle>
                    <CardDescription>Teacher & Django Campus Coach</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  "From attendee to coach - Django Campus taught me to code and now I'm teaching others!"
                </p>
              </CardContent>
            </Card>
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

      {/* Footer */}
      <Footer />
    </div>
  )
}
