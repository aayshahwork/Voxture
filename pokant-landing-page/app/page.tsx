"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ArrowDown, Menu, X, Check, Mic, Zap, BarChart3, Link2, Target, TrendingUp, FlaskConical, Sparkles, GitBranch, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

// Animated typing effect for hero
function TypeWriter({ words, className }: { words: string[]; className?: string }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]
    let pauseId: ReturnType<typeof setTimeout> | null = null

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1))
        } else {
          pauseId = setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => {
      clearTimeout(timeout)
      if (pauseId) clearTimeout(pauseId)
    }
  }, [currentText, isDeleting, currentWordIndex, words])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Animated waveform visualization
function WaveformVisualization() {
  const bars = 48
  const [heights, setHeights] = useState<number[]>([])

  useEffect(() => {
    // Initialize with random heights
    setHeights(Array.from({ length: bars }, () => Math.random() * 100))

    const interval = setInterval(() => {
      setHeights((prev) =>
        prev.map((h) => {
          const change = (Math.random() - 0.5) * 30
          return Math.max(10, Math.min(100, h + change))
        })
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (heights.length === 0) {
    return (
      <div className="flex items-end justify-center gap-[2px] h-32">
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className="w-1 rounded-full bg-primary/30"
            style={{ height: "50%" }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-end justify-center gap-[2px] h-32">
      {heights.map((height, i) => (
        <div
          key={i}
          className="w-1 rounded-full bg-gradient-to-t from-primary via-primary to-teal-400 transition-all duration-100"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  )
}

// Floating metrics that animate in
function FloatingMetric({ label, value, delay }: { label: string; value: string; delay: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  return (
    <div
      className={`bg-card/60 backdrop-blur-xl border border-border/40 rounded-xl px-4 py-3 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="text-xs text-muted-foreground mb-1">{label}</div>
      <div className="text-lg font-semibold text-foreground">{value}</div>
    </div>
  )
}

const problemCards = [
  {
    icon: Target,
    title: "Your agent plateaued",
    description: "It handles the easy calls. But complex ones fail — and you don't know which prompt changes will actually help.",
  },
  {
    icon: Zap,
    title: "Improvement is manual guesswork",
    description: "Listen to calls. Guess at fixes. Deploy and pray. Repeat. There's no data-driven way to make your agent better.",
  },
  {
    icon: BarChart3,
    title: "You measure calls, not outcomes",
    description: "Containment rate looks good. But you can't tell which calls actually achieved their goal — bookings, resolutions, whatever success looks like for you.",
  },
]

const howItWorks = [
  {
    icon: Link2,
    number: "01",
    title: "Connect",
    description: "Plug into your Vapi/Retell agent in 2 minutes via webhook. We start ingesting every call.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Analyze",
    description: "Our AI reviews every call, identifies failure patterns, and clusters them. \"34% of calls mentioning insurance fail at step 3.\"",
  },
  {
    icon: Zap,
    number: "03",
    title: "Optimize",
    description: "We auto-generate prompt fixes and A/B test them against live traffic. Statistical significance, not gut feeling.",
  },
  {
    icon: Check,
    number: "04",
    title: "Verify",
    description: "We check downstream systems (CRM, calendar, PMS) to confirm calls achieved real outcomes — not just call scores.",
  },
]

const whoItsFor = [
  {
    icon: Mic,
    title: "Voice AI agencies",
    description: "You've deployed agents for 10+ clients. They all plateau. Your team spends hours listening to calls and tweaking prompts. We automate that loop.",
  },
  {
    icon: Zap,
    title: "Businesses with voice agents",
    description: "You deployed a Vapi/Retell agent for scheduling, support, or sales. It works — but not well enough. We make it great, automatically.",
  },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [heroLoaded, setHeroLoaded] = useState(false)
  const problemRef = useInView()
  const howItWorksRef = useInView()
  const differentRef = useInView()
  const whoItsForRef = useInView()

  useEffect(() => {
    setHeroLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" prefetch={false} className="text-foreground font-bold text-xl tracking-tight">
              pokant
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#problem" prefetch={false} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                The Problem
              </Link>
              <Link href="#how-it-works" prefetch={false} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="#different" prefetch={false} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                What Makes Us Different
              </Link>
              <Link href="#who-its-for" prefetch={false} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Who It&apos;s For
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Book a 15-min setup call
              </Button>
            </div>

            <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/40">
            <div className="px-6 py-6 space-y-4">
              <Link href="#problem" className="block text-sm text-muted-foreground hover:text-foreground">
                The Problem
              </Link>
              <Link href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">
                How It Works
              </Link>
              <Link href="#different" className="block text-sm text-muted-foreground hover:text-foreground">
                What Makes Us Different
              </Link>
              <Link href="#who-its-for" className="block text-sm text-muted-foreground hover:text-foreground">
                Who It&apos;s For
              </Link>
              <hr className="border-border/40" />
              <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Book a 15-min setup call
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background (CSS-only, no external assets) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(1200px 600px at 20% 20%, hsl(var(--primary) / 0.25), transparent 60%), radial-gradient(900px 500px at 80% 30%, rgba(45, 212, 191, 0.18), transparent 55%), radial-gradient(800px 500px at 50% 90%, rgba(59, 130, 246, 0.12), transparent 60%)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="flex-1 flex items-center justify-center px-6 lg:px-8 pt-16">
          <div className="max-w-5xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text */}
              <div>
                <h1
                  className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-[1.1] transition-all duration-1000 delay-200 ${
                    heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  Don&apos;t just monitor—{" "}
                  <span className="text-primary">
                    <TypeWriter words={["deploy winners.", "optimize in production.", "verify outcomes."]} />
                  </span>
                </h1>

                <p
                  className={`text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed transition-all duration-1000 delay-300 ${
                    heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  Analyze every call, find failures, A/B test fixes. Your agent improves every week.
                </p>

                <div
                  className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 ${
                    heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14 text-lg font-semibold">
                    See your blind spots in 24 hours →
                  </Button>
                </div>
              </div>

              {/* Right Column - Visualization */}
              <div
                className={`relative transition-all duration-1000 delay-500 ${
                  heroLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
                }`}
              >
                <div className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="text-xs text-muted-foreground font-mono ml-auto">Call analysis</span>
                  </div>

                  <WaveformVisualization />

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <FloatingMetric label="Calls analyzed" value="2.4k" delay={800} />
                    <FloatingMetric label="A/B tests live" value="8" delay={1000} />
                    <FloatingMetric label="Outcomes verified" value="847" delay={1200} />
                  </div>
                </div>

                {/* Floating badge */}
                <div
                  className={`absolute -top-4 -right-4 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-1.5 transition-all duration-1000 delay-700 ${
                    heroLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                >
                  <span className="text-xs font-medium text-green-500">Improving</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
            heroLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs">Scroll to explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem" className="py-24 px-6 lg:px-8" ref={problemRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 transition-all duration-700 ${
                problemRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Why this matters
            </h2>
            <p
              className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100 ${
                problemRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Three pain points you recognize
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {problemCards.map((item, i) => (
              <div
                key={item.title}
                className={`group bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 transition-all duration-700 hover:border-primary/40 hover:-translate-y-1 ${
                  problemRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 lg:px-8 bg-muted/30" ref={howItWorksRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 transition-all duration-700 ${
                howItWorksRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              How It Works
            </h2>
            <p
              className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100 ${
                howItWorksRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Four simple steps. A continuous improvement loop.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, i) => (
              <div
                key={item.title}
                className={`group relative bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 transition-all duration-700 hover:border-primary/40 hover:-translate-y-1 ${
                  howItWorksRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-5xl font-bold text-primary/10 mb-4 font-mono">{item.number}</div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section id="different" className="py-24 px-6 lg:px-8" ref={differentRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 transition-all duration-700 ${
                differentRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Everyone else measures calls. We measure outcomes.
            </h2>
            <p
              className={`text-lg text-muted-foreground max-w-3xl mx-auto transition-all duration-700 delay-100 ${
                differentRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Other tools tell you containment rate. We tell you what actually worked — which calls booked appointments, which resolved issues — and which prompt changes would improve that, already tested and proven.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20 transition-all duration-700 delay-150 ${
              differentRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6">
              <div className="text-xs text-muted-foreground mb-4 font-medium">Other tools</div>
              <div className="bg-muted/30 rounded-xl p-6 border border-border/40">
                <div className="text-2xl font-bold text-foreground mb-2">Containment: 78%</div>
                <div className="flex items-center gap-2 text-green-500">
                  <Check className="w-5 h-5" />
                  <span className="text-sm">Generic monitoring dashboard</span>
                </div>
              </div>
            </div>
            <div className="bg-card/40 backdrop-blur-sm border border-primary/40 rounded-2xl p-6">
              <div className="text-xs text-primary font-medium mb-4">Us</div>
              <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="text-sm font-medium text-muted-foreground mb-2">Appointments booked</div>
                <div className="text-2xl font-bold text-foreground mb-4">847</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Missed:</span> <span>312</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Recoverable:</span> <span>128</span></div>
                  <div className="flex justify-between text-primary font-semibold mt-2"><span>Impact:</span> <span>128 more successful calls</span></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              differentRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-10">
              Why we&apos;re built different
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: TrendingUp,
                  title: "Real business outcomes",
                  description: "We verify CRM events, payments, and conversions — not just model metrics.",
                },
                {
                  icon: FlaskConical,
                  title: "Live production A/B tests",
                  description: "We run experiments on real traffic, not offline simulations.",
                },
                {
                  icon: Sparkles,
                  title: "Auto-generated prompt fixes",
                  description: "Failure clusters drive fixes automatically — no human guesswork.",
                },
                {
                  icon: GitBranch,
                  title: "Agent orchestration pipeline",
                  description: "End-to-end control of your voice agent flow, not fragmented tools.",
                },
                {
                  icon: Rocket,
                  title: "Auto-promote to production",
                  description: "Winners go live directly with no manual handoff.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="group flex flex-col bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="text-base font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 sm:mt-14 flex justify-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  Outcomes, not vanity metrics
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  Real traffic, real tests
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  Zero manual promotion
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section id="who-its-for" className="py-24 px-6 lg:px-8 bg-muted/30" ref={whoItsForRef.ref}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 transition-all duration-700 ${
                whoItsForRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Who it&apos;s for
            </h2>
            <p
              className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700 delay-100 ${
                whoItsForRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Help yourself self-select
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whoItsFor.map((item, i) => (
              <div
                key={item.title}
                className={`group bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-8 transition-all duration-700 hover:border-primary/40 hover:-translate-y-1 ${
                  whoItsForRef.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 lg:px-8 border-t border-border/40 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            See your agent&apos;s blind spots in 24 hours.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connect your Vapi agent. Get your first failure analysis within 24 hours. No commitment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12">
              Book a 15-min setup call
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Free for qualifying teams during beta. 3 spots remaining.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-foreground text-lg mb-4">pokant</div>
              <p className="text-sm text-muted-foreground">
                Your voice agent gets better every week — better calls, fewer failures
              </p>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground mb-3">Product</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">API</Link></li>
                <li><Link href="#who-its-for" className="hover:text-foreground transition-colors">Who It&apos;s For</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground mb-3">Company</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground mb-3">Legal</div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            &copy; 2026 Pokant. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
