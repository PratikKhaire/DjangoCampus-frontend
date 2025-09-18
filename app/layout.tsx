import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import GoogleAnalytics from "@/components/GoogleAnalytics"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: {
    default: "DjangoCampus Global - Free Django Workshops Across Africa",
    template: "%s | DjangoCampus Global"
  },
  description: "Join DjangoCampus, a pan-African movement organizing free Django workshops on university campuses from Ghana to Kenya. Learn web development, build amazing projects, and connect with developers across Africa. No experience needed - just bring your passion for coding!",
  keywords: [
    "Django workshops",
    "free coding bootcamp",
    "web development Africa",
    "Python programming Ghana",
    "university coding workshops",
    "Django tutorials",
    "African tech community",
    "learn to code",
    "programming education",
    "Django Campus"
  ],
  authors: [{ name: "Julius Boakye", url: "https://github.com/Darkbeast-glitch" }],
  creator: "DjangoCampus Team",
  publisher: "DjangoCampus Global",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://djangocampus.vercel.app',
    title: 'DjangoCampus Global - Free Django Workshops Across Africa',
    description: 'Join our pan-African movement! Free Django workshops on university campuses. Learn web development, build projects, and connect with developers across Africa.',
    siteName: 'DjangoCampus Global',
    images: [
      {
        url: '/django-campus-og.png',
        width: 1200,
        height: 630,
        alt: 'DjangoCampus - Free Django Workshops Across Africa',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DjangoCampus Global - Free Django Workshops Across Africa',
    description: 'Join our pan-African movement! Free Django workshops on university campuses. Learn web development and connect with developers across Africa.',
    images: ['/django-campus-og.png'],
    creator: '@djangocampus',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-code-here',
  },
  category: 'Education',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/django-campus.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/django-campus.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
  
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} antialiased`}>
      <body className="font-sans" suppressHydrationWarning>
        {children}
        {GA_MEASUREMENT_ID && <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />}
      </body>
    </html>
  )
}
