"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Sparkles, Book, Code, Share2, Save, Download, Copy, ChevronsDown, RefreshCw } from "lucide-react"
import Header from "@/components/layouts/Header"
import Footer from "@/components/layouts/Footer"
import Link from "next/link"

// Monaco Editor setup
import Editor from "@monaco-editor/react"

type TabType = "views" | "models" | "urls" | "templates";

const examples: Record<TabType, string> = {
  views: `# views.py
from django.shortcuts import render
from django.http import HttpResponse

def hello_world(request):
    """A simple view that returns a greeting message."""
    return HttpResponse("<h1>Hello, Django!</h1>")

def welcome(request, name):
    """A view that takes a parameter and returns a personalized greeting."""
    context = {'name': name}
    return render(request, 'welcome.html', context)`,
  
  models: `# models.py
from django.db import models

class Workshop(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField()
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.title
    
class Registration(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['workshop', 'email']`,
  
  urls: `# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.hello_world, name='hello_world'),
    path('welcome/<str:name>/', views.welcome, name='welcome'),
    path('workshops/', views.workshop_list, name='workshop_list'),
    path('workshops/<int:pk>/', views.workshop_detail, name='workshop_detail'),
]`,

  templates: `<!-- welcome.html -->
{% extends "base.html" %}

{% block title %}Welcome{% endblock %}

{% block content %}
<div class="container">
    <h1>Welcome to DjangoCampus, {{ name }}!</h1>
    <p>We're excited to have you join our community of Django learners.</p>
    
    <h2>Upcoming Workshops</h2>
    <ul>
        {% for workshop in workshops %}
        <li>
            <strong>{{ workshop.title }}</strong> - {{ workshop.date }}
            <p>{{ workshop.description }}</p>
        </li>
        {% empty %}
        <li>No workshops scheduled at the moment.</li>
        {% endfor %}
    </ul>
</div>
{% endblock %}`
}

const consoleResponses: Record<TabType, string> = {
  views: `Running server at http://127.0.0.1:8000/
[03/Sep/2025 14:32:15] "GET / HTTP/1.1" 200 25
[03/Sep/2025 14:32:20] "GET /welcome/student/ HTTP/1.1" 200 543`,
  
  models: `Applied migrations:
  admin.0001_initial
  auth.0001_initial
  workshops.0001_initial
  
>>> Workshop.objects.create(title="Django Fundamentals", date="2025-09-15", description="Learn the basics of Django")
<Workshop: Django Fundamentals>`,
  
  urls: `Running server at http://127.0.0.1:8000/
[03/Sep/2025 14:35:12] "GET / HTTP/1.1" 200 25
[03/Sep/2025 14:35:18] "GET /welcome/student/ HTTP/1.1" 200 543
[03/Sep/2025 14:35:25] "GET /workshops/ HTTP/1.1" 200 872`,
  
  templates: `Rendering welcome.html for user 'student'
Template extends base.html
Context: {'name': 'student', 'workshops': [<Workshop: Django Fundamentals>, <Workshop: Advanced Django>]}
[03/Sep/2025 14:38:10] "GET /welcome/student/ HTTP/1.1" 200 1024`
}

export default function PlaygroundPage() {
  const [selectedTab, setSelectedTab] = useState<TabType>("views")
  const [code, setCode] = useState(examples.views)
  const [output, setOutput] = useState("")
  const [running, setRunning] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  
  useEffect(() => {
    setCode(examples[selectedTab])
  }, [selectedTab])
  
  const handleTabChange = (value: string) => {
    setSelectedTab(value as TabType)
  }
  
  const handleCodeChange = (value: string | undefined) => {
    if (value) {
      setCode(value)
    }
  }
  
  const runCode = () => {
    setRunning(true)
    setOutput("")
    
    // Simulate code execution with typing effect
    let i = 0
    const response = consoleResponses[selectedTab]
    const typingInterval = setInterval(() => {
      if (i < response.length) {
        setOutput(prev => prev + response.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
        setRunning(false)
      }
    }, 15) // Adjust typing speed here
  }
  
  const copyCode = () => {
    navigator.clipboard.writeText(code)
      .then(() => {
        // Show a temporary "Copied!" message
        const button = document.getElementById('copy-button')
        if (button) {
          const originalText = button.innerText
          button.innerText = "Copied!"
          setTimeout(() => {
            button.innerText = originalText
          }, 2000)
        }
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="font-serif font-black text-4xl md:text-5xl text-foreground mb-4">Django Code Explorer</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore Django code examples and understand how they work together. This is an educational simulator, not a real Django environment.
          </p>
          <div className="mt-4 p-3 bg-yellow-100/50 border border-yellow-200 rounded-md inline-block text-sm text-yellow-800">
            <strong>Important:</strong> This tool doesn't actually run Django code. It simulates what Django would do to help you learn the concepts.
          </div>
        </div>
        
        {showIntro && (
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Django Code Simulator - Not a Real Environment
              </CardTitle>
              <CardDescription>
                This is a teaching tool that shows example Django code with pre-programmed simulated responses. None of the code runs on an actual Django server.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 rounded-full p-2 mt-0.5">
                    <Code className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">Explore Django Structure</h3>
                    <p className="text-sm text-muted-foreground">
                      Browse through different Django files to understand how a Django project is organized. Each tab shows a different file type with example code.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 rounded-full p-2 mt-0.5">
                    <Play className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">View Pre-Programmed Responses</h3>
                    <p className="text-sm text-muted-foreground">
                      Click the "Show Output" button to see examples of what Django would output in a real environment. These responses are fixed and pre-written for learning purposes only.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 rounded-full p-2 mt-0.5">
                    <Book className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base">Educational Examples Only</h3>
                    <p className="text-sm text-muted-foreground">
                      These examples are for learning only. You can edit the code to experiment, but your changes won't actually run or affect the output in any way. To run real Django code, you'll need to set up a Django project on your computer.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => setShowIntro(false)}
                className="text-sm"
              >
                Got it, let's explore!
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <Card className="border-border h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Tabs defaultValue="views" value={selectedTab} onValueChange={handleTabChange} className="w-full">
                    <TabsList className="grid grid-cols-4">
                      <TabsTrigger value="views">views.py</TabsTrigger>
                      <TabsTrigger value="models">models.py</TabsTrigger>
                      <TabsTrigger value="urls">urls.py</TabsTrigger>
                      <TabsTrigger value="templates">templates</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" id="copy-button" onClick={copyCode}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-[400px] overflow-hidden">
                <Editor
                  height="400px"
                  defaultLanguage="python"
                  value={code}
                  onChange={handleCodeChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    wordWrap: "on"
                  }}
                />
              </CardContent>
              <CardFooter className="flex justify-between pt-3">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    Python 3.12
                  </Badge>
                  <Badge variant="outline">
                    Django 5.0
                  </Badge>
                </div>
                <Button onClick={runCode} disabled={running} className="bg-green-600 hover:bg-green-700">
                  {running ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Simulating...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Show Example Output
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="border-border h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Example Django Output (Not Real Execution)</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[400px] bg-black overflow-auto">
                <div className="font-mono text-xs p-4 text-green-400 whitespace-pre-wrap h-full">
                  {output || 'Click "Show Example Output" to see pre-written examples of Django responses. Remember: This is NOT actually running your code, just showing educational examples.'}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-3">
                <div className="text-xs text-muted-foreground">
                  {running ? 'Simulating...' : 'Ready'}
                </div>
                <Button variant="outline" size="sm" onClick={() => setOutput("")}>
                  Clear Console
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        
        <div className="mt-12 bg-secondary/10 rounded-lg p-6">
          <h2 className="font-serif font-bold text-2xl mb-4">Ready to Learn More?</h2>
          <p className="mb-6">
            This code explorer gives you a taste of Django's code structure. Join our workshops to build real projects with expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/workshops">
                View Upcoming Workshops
              </Link>
            </Button>
            <Button variant="outline">
              <Link href="https://docs.djangoproject.com/" target="_blank">
                Django Documentation
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
