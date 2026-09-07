import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import './App.css'
import { logConsoleEasterEgg } from './consoleEasterEgg'
import 'react-github-calendar/tooltips.css'
import { GitHubCalendar } from 'react-github-calendar'

const GitHubCalendarSection = lazy(() => import('./GitHubCalendarSection'))

const MUSIC_SRC = '/jazz.mp3'
const LAST_UPDATED = 'Mar 23, 2026'

const SKILLS: { name: string; url: string; logo: string; logoUrl?: string }[] = [
  { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', logo: 'js' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org/', logo: 'ts' },
  { name: 'Python', url: 'https://www.python.org/', logo: 'python' },
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com/', logo: 'tailwind' },
  { name: 'React', url: 'https://react.dev/', logo: 'react' },
  { name: 'HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', logo: 'html' },
  { name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', logo: 'css' },
  { name: 'Java', url: 'https://docs.oracle.com/en/java/', logo: 'java' },
  { name: 'C#', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/', logo: 'cs' },
  { name: 'Next.js', url: 'https://nextjs.org/', logo: 'nextjs' },
  { name: 'Firebase', url: 'https://firebase.google.com/docs', logo: 'firebase' },
  { name: 'Node.js', url: 'https://nodejs.org/docs/latest/api/', logo: 'nodejs' },
  { name: 'Vercel', url: 'https://vercel.com/docs', logo: 'vercel' },
  { name: 'Git', url: 'https://git-scm.com/docs', logo: 'git' },
  { name: 'MySQL', url: 'https://dev.mysql.com/doc/', logo: 'mysql' },
  { name: 'Kotlin', url: 'https://kotlinlang.org/docs/home.html', logo: 'kotlin' },
  { name: 'WordPress', url: 'https://wordpress.org/documentation/', logo: 'wordpress' },
  { name: 'Unity', url: 'https://docs.unity.com/en-us', logo: 'unity' },
  { name: 'Dart', url: 'https://dart.dev/docs', logo: 'dart' },
  { name: 'Flutter', url: 'https://docs.flutter.dev', logo: 'flutter' },
  { name: 'React Native', url: 'https://reactnative.dev/docs/getting-started', logo: 'react'},
  { name: 'Expo', url: 'https://docs.expo.dev/get-started/installation/', logo: 'expo', logoUrl: 'https://cdn.simpleicons.org/expo/4630EB' },
  { name: 'Oculus', url: 'https://developer.oculus.com/documentation/', logo: 'oculus', logoUrl: 'https://cdn.simpleicons.org/meta/0081FB' },
  { name: 'Linux', url: 'https://docs.kernel.org', logo: 'linux'},
]

const MAX_CATS = 30
const CAT_IDS = Array.from({ length: MAX_CATS }, (_, i) => i + 1)

type Project = {
  id: string
  title: string
  subtext: string
  techStack: string
  image: string
  websiteUrl?: string
  sourceUrl?: string
  /** Use `contain` for tall/narrow or low-res screenshots so they aren’t upscaled to fill the 16:9 frame */
  imageObjectFit?: 'cover' | 'contain'
}

const PROJECTS: Project[] = [
  {
    id: 'spotlight',
    title: 'SpotLight – MuslimHacks 2026 Winner',
    subtext: 'Built in 24 hours: a local-first browser extension that monitors outbound traffic, explains tracking in plain English, and lets users block or spoof sensitive data — no servers, no cloud.',
    techStack: 'React, TypeScript, Vite, Chrome Extension Manifest V3',
    image: 'SpotLight.png',
    websiteUrl: 'https://spotlightwebsite.vercel.app',
    sourceUrl: 'https://github.com/AK-Issac/SpotLight',
  },
  {
    id: 'rumy',
    title: 'Rumy',
    subtext: 'Building a roommate-management mobile platform for shared household expectations.',
    techStack: 'React Native, TypeScript, Expo, Firebase',
    image: 'rumy.png',
    websiteUrl: 'https://rumyapp.com',
  },
  {
    id: 'before-you-go',
    title: 'Before You Go – Pediatric VR Simulator',
    subtext: 'Built solo in 48 hours for the CareXR Hackathon: a Meta Quest 3 VR app that helps pediatric patients understand procedures through interactive simulations.',
    techStack: 'Unity 6.3, C#, OpenXR, XR Interaction Toolkit, URP, Meta Quest 3',
    image: 'BeforeYouGo.jpg',
    sourceUrl: 'https://github.com/AdamMTK-NB/BeforeYouGo',
    imageObjectFit: 'contain',
  },
  {
    id: 'underdog',
    title: 'Underdog – Sports Betting Recovery App',
    subtext: 'Built and shipped a complete mobile app in 48 hours as a solo developer, focused on onboarding, tracking, and behavior-change UX.',
    techStack: 'React Native, TypeScript, Expo',
    image: 'Underdog.jpg',
    imageObjectFit: 'contain',
  },
  {
    id: 'sortify',
    title: 'Sortify: Automated Waste Management System',
    subtext: 'Developed an AI-powered waste classification system using Python and YOLOv5, achieving 92% detection accuracy.',
    techStack: 'Python, YOLOv5, Arduino, Raspberry Pi, PyTorch, NumPy',
    image: 'sortify.png',
  },
  {
    id: 'better-call-saul',
    title: 'Better Call Saul AI – ConUHacks IX Winner',
    subtext: 'Led a 4-person team to build a full-stack AI-powered legal assistant. Integrated speech recognition and translation APIs for bilingual voice interaction. Awarded Hackathon Winner at ConUHacks IX.',
    techStack: 'React, TypeScript, Vite, AI API calls, Athena AI',
    image: 'bettercallsaul.png',
    sourceUrl: 'https://github.com/AdamMTK-NB/BetterCallSaulAI',
  },
  {
    id: 'shadow-realm',
    title: 'Shadow Realm – 2D Hack-and-Slash Adventure',
    subtext: 'Led a 3-person team to develop a 2D hack-and-slash platformer in Unity with core combat, level progression, and responsive player movement and enemy interactions.',
    techStack: 'Unity (2D), C#, Unity Animator, Tilemap, Sprite animation, Physics2D, Collision, State Machines',
    image: 'shadowrealm.png',
    websiteUrl: 'https://netbionic.itch.io/shadow-realm',
  },
  {
    id: 'virtual-art-gallery',
    title: 'Virtual Art Gallery',
    subtext: 'Led a 4-person team to build an immersive 3D art gallery in Unity with real-time multiplayer, first-person navigation, and Firebase-based chat.',
    techStack: 'Unity (3D), C#, Python, Firebase, First-Person Controller, Unity Physics, UI Toolkit',
    image: 'artgallery.png',
    websiteUrl: 'https://netbionic.itch.io/virtual-art-gallery',
  },
]

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('portfolio-dark-mode')
    return stored === 'true'
  })
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [showCats, setShowCats] = useState(false)
  const [zoomedCatId, setZoomedCatId] = useState<number | null>(null)
  const [missingCats, setMissingCats] = useState<Set<number>>(new Set())
  const [experienceTab, setExperienceTab] = useState<'work' | 'education' | 'hackathons'>('work')
  const [showHeaderLogo, setShowHeaderLogo] = useState(false)
  const [projectIndex, setProjectIndex] = useState(0)
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null)
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev' | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('portfolio-dark-mode', String(darkMode))
  }, [darkMode])

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC)
    audio.loop = true
    audio.volume = 0.2
    const onEnded = () => {
      audio.currentTime = 0
      audio.play().catch(() => {})
    }
    audio.addEventListener('ended', onEnded)
    audioRef.current = audio
    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    if (!showCats) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [showCats])

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const heroBottom = heroRef.current.getBoundingClientRect().bottom
      setShowHeaderLogo(heroBottom < 0)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDarkModeClick = () => {
    setDarkMode((prev) => !prev)
    console.clear()
    logConsoleEasterEgg(!darkMode)
  }

  const handleMusicClick = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isMusicPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setIsMusicPlaying((prev) => !prev)
  }

  const handleCatImageError = (id: number) => {
    setMissingCats((prev) => {
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }

  const handleResumeDownload = () => {
    window.open('/Adam_Maatouk_Resume.pdf', '_blank', 'noopener,noreferrer')
  }

  const handleExperienceTab = (tab: 'work' | 'education' | 'hackathons') => {
    setExperienceTab(tab)
  }

  const runTransition = (direction: 'next' | 'prev', nextIndex: number) => {
    setTransitionDirection(direction)
    setLeavingIndex(projectIndex)
    setProjectIndex(nextIndex)
  }

  useEffect(() => {
    if (leavingIndex === null) return
    const t = setTimeout(() => {
      setLeavingIndex(null)
      setTransitionDirection(null)
    }, 400)
    return () => clearTimeout(t)
  }, [leavingIndex])

  const handleProjectPrev = () => {
    const next = projectIndex === 0 ? PROJECTS.length - 1 : projectIndex - 1
    runTransition('prev', next)
  }

  const handleProjectNext = () => {
    const next = projectIndex === PROJECTS.length - 1 ? 0 : projectIndex + 1
    runTransition('next', next)
  }

  const handleProjectDot = (index: number) => {
    if (index === projectIndex) return
    const direction = index > projectIndex ? 'next' : 'prev'
    runTransition(direction, index)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <div className={`header__logo ${showHeaderLogo ? 'header__logo--visible' : ''}`}>
            <img src="/hero.svg" alt="" className="header__logo-img" />
          </div>
          {/* Move buttons inside header__inner */}
          <div className="header__btns">
            <button
              type="button"
              className="header__btn header__dark-btn"
              onClick={handleDarkModeClick}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? (
                <svg className="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg className="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="header__btn header__music-btn"
              onClick={handleMusicClick}
              aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
              title={isMusicPlaying ? 'Pause music' : 'Play music'}
            >
              {isMusicPlaying ? (
                <svg className="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15 8v8M18 6v12M21 5v14" />
                </svg>
              ) : (
                <svg className="header__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      <div className="header-spacer" />
      <section className="hero" ref={heroRef} aria-label="Hero illustration">
        <img src="/hero.svg" alt="" className="hero__illustration" />
      </section>
      <section className="intro">
        <h1 className="intro__name">Adam Maatouk</h1>
        <p className="intro__roles">Founder • Based in Montreal • FullStack Engineer • Gym Rat</p>
        <div className="intro__cta">
          <a href="https://www.linkedin.com/in/adammaatouk/" target="_blank" rel="noopener noreferrer" className="intro__btn">
            <svg className="intro__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            Connect with me
          </a>
          <span className="intro__cta-or">or</span>
          <a href="mailto:adammaatouknb@gmail.com" className="intro__btn">
            <svg className="intro__btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            Email Me
          </a>
        </div>
        <p className="intro__text">
          More to be added soon... Prepare yourself for the fun side of my work.{' '}
        </p>
      </section>
      <section className="social">
        <a href="https://www.linkedin.com/in/adammaatouk/" target="_blank" rel="noopener noreferrer" className="social__link" data-tooltip="/in/adammaatouk">
          <svg className="social__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span className="social__text">LinkedIn</span>
        </a>
        <a href="https://discord.com/users/752041096045133834" target="_blank" rel="noopener noreferrer" className="social__link" data-tooltip="NeT">
          <svg className="social__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          <span className="social__text">Discord</span>
        </a>
        <a href="https://github.com/AdamMTK-NB" target="_blank" rel="noopener noreferrer" className="social__link" data-tooltip="@AdamMTK-NB">
          <svg className="social__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0-2-1.5-3-1.5-3-1.5-.3 1.15-.3 2.35 0 3.5-1.05 1.08-1 2.5-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
            <path d="M9 18c-4.51 2-5-2-7-2"/>
          </svg>
          <span className="social__text">Github</span>
        </a>
        <a href="mailto:adammaatouknb@gmail.com" className="social__link" data-tooltip="adammaatouknb@gmail.com">
          <svg className="social__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <span className="social__text">Email</span>
        </a>
      </section>
      <section className="career">
        <h2 className="career__subtitle">So Far</h2>
        <div className="career__row">
          <h2 className="career__title">Career</h2>
          <div className="career__resume">
            <span className="career__resume-text">Need a copy?</span>
            <button type="button" className="career__resume-btn" onClick={handleResumeDownload}>
              <svg className="career__resume-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Resume
            </button>
          </div>
        </div>
      </section>
      <section className="experience">
        <div className="experience__tabs">
          <button
            type="button"
            className={`experience__tab ${experienceTab === 'work' ? 'experience__tab--active' : ''}`}
            onClick={() => handleExperienceTab('work')}
          >
            Work
          </button>
          <button
            type="button"
            className={`experience__tab ${experienceTab === 'education' ? 'experience__tab--active' : ''}`}
            onClick={() => handleExperienceTab('education')}
          >
            Education
          </button>
          <button
            type="button"
            className={`experience__tab ${experienceTab === 'hackathons' ? 'experience__tab--active' : ''}`}
            onClick={() => handleExperienceTab('hackathons')}
          >
            Hackathons
          </button>
        </div>
        <div className="experience__content">
          <div className={`experience__panel experience__panel--${experienceTab}`}>
          {experienceTab === 'work' && (
            <ul className="experience__timeline">
              <li className="experience__entry">
                <div className="experience__icon experience__icon--img">
                  <img src="/rumy.png" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">Rumy</h3>
                    <span className="experience__dates">Dec 2025 – Present</span>
                  </div>
                  <p className="experience__role">Co-Founder / CTO · Remote</p>
                  <ul className="experience__bullets">
                    <li>Leading product strategy, user research, UI/UX design, and full-stack development from concept through validation.</li>
                    <li>Selected for LvlUp Ventures’ LvlUp Labs program, gaining access to hands-on mentorship, investor guidance, and more.</li>
                    <li>Selected for League of Innovators’ Labs 17 accelerator to advance Rumy’s customer validation, product strategy, and more.</li>
                  </ul>
                  <a href="https://rumyapp.com" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Website
                  </a>
                </div>
              </li>
              <li className="experience__entry">
                <div className="experience__icon experience__icon--img">
                  <img src="/loi.png" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">League of Innovators</h3>
                    <span className="experience__dates">Sep 2026 – Present</span>
                  </div>
                  <p className="experience__role">Labs 17 Founder · Canada</p>
                  <ul className="experience__bullets">
                    <li>Selected for Labs 17, League of Innovators’ competitive 12-week accelerator for young Canadian founders pursuing product-market fit.</li>
                    <li>Advancing Rumy through customer discovery, rapid product iteration, growth experiments, and structured founder mentorship.</li>
                    <li>Participating in expert-led workshops, founder sessions, and peer accountability groups focused on product, sales, leadership, and pitching.</li>
                  </ul>
                  <a href="https://www.loi.ac/programs/labs" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Website
                  </a>
                </div>
              </li>
              <li className="experience__entry">
                <div className="experience__icon experience__icon--img">
                  <img src="/base44.png" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">Base44</h3>
                    <span className="experience__dates">Sep 2026 – Present</span>
                  </div>
                  <p className="experience__role">Campus Impact Leader · Montreal, QC</p>
                  <ul className="experience__bullets">
                    <li>Selected for the founding class of Base44 Campus Impact Leaders, a global student network expanding AI-powered app development on university campuses.</li>
                    <li>Leading Base44 adoption at Concordia University through student events, community initiatives, and educational content.</li>
                    <li>Collaborating directly with Base44’s global team and student leaders to develop campus campaigns and provide product feedback.</li>
                  </ul>
                  <a href="https://campusimpactleaders.base44.app" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Website
                  </a>
                </div>
              </li>
              <li className="experience__entry">
                <div className="experience__icon experience__icon--img">
                  <img src="/meta.png" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">Meta x MLH</h3>
                    <span className="experience__dates">Jun 2026 – Aug 2026</span>
                  </div>
                  <p className="experience__role">Production Engineering Fellow · Remote</p>
                  <ul className="experience__bullets">
                    <li>Completed 12-weeks of structured curriculum-based learning covering core Production Engineering topics, supplemented with events / workshops hosted by industry experts.</li>
                    <li>Created an open-source personal portfolio website template using Python, Flask, Jinja, MySQL, Nginx, and unittest.</li>
                    <li>Automated testing and deployment workflows using CI/CD.</li>
                    <li>Set up system and container monitoring, alerting, and visualization using Prometheus and Grafana.</li>
                  </ul>
                  <a href="https://fellowship.mlh.com/programs/production-engineering-sre" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Website
                  </a>
                </div>
              </li>
              <li className="experience__entry">
                <div className="experience__icon experience__icon--img">
                  <img src="/lvlup.png" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">LvlUp Ventures</h3>
                    <span className="experience__dates">May 2026 – Aug 2026</span>
                  </div>
                  <p className="experience__role">LvlUp Labs Founder · Remote</p>
                  <ul className="experience__bullets">
                    <li>Selected for LvlUp Labs, a founder-focused startup program providing hands-on support through LvlUp Ventures’ investor and mentor network.</li>
                    <li>Refined Rumy’s product strategy, positioning, and go-to-market approach through mentorship, founder programming, and expert office hours.</li>
                    <li>Connected with founders, investors, and industry professionals across LvlUp Ventures’ startup ecosystem.</li>
                  </ul>
                  <a href="https://www.lvlup.vc/labs" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Website
                  </a>
                </div>
              </li>
              <li className="experience__entry">
                <div className="experience__icon experience__icon--img">
                  <img src="/athena.png" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">Athena AI</h3>
                    <span className="experience__dates">Mar 2025 – May 2025</span>
                  </div>
                  <p className="experience__role">Software Engineering Intern · Montreal, QC</p>
                  <ul className="experience__bullets">
                    <li>Contributed to Athena AI, a fast-growing startup with 3M+ users, building and shipping React + TypeScript features.</li>
                    <li>Lifted model accuracy from 74% to 92% by building Python pipelines to analyze and cluster failure cases.</li>
                    <li>Closed 31 of 40 recurring production tickets through log-based root cause analysis and targeted fixes.</li>
                    <li>Supported live product demos at World Summit AI, contributing to increased partner support and user interest by 15%.</li>
                  </ul>
                  <a href="https://athenachat.bot/chatbot" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Website
                  </a>
                </div>
              </li>
            </ul>
          )}
          {experienceTab === 'education' && (
            <ul className="experience__timeline">
              <li className="experience__entry">
                <div className="experience__icon experience__icon--edu experience__icon--img">
                  <img src="/concordia.png" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">Concordia University</h3>
                    <span className="experience__dates">Aug 2025 – May 2029</span>
                  </div>
                  <p className="experience__role">Bachelor's in Software Engineering</p>
                  <a href="https://www.concordia.ca/academics/undergraduate/software-engineering.html" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Website
                  </a>
                </div>
              </li>
              <li className="experience__entry">
                <div className="experience__icon experience__icon--edu experience__icon--img">
                  <img src="/maisonneuve.jpg" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">Collège de Maisonneuve</h3>
                    <span className="experience__dates">Sep 2022 – May 2025</span>
                  </div>
                  <p className="experience__role">Associate's Degree in Computer Science</p>
                  <ul className="experience__bullets">
                    <li>Mandatory Internship</li>
                  </ul>
                  <a href="https://www.cmaisonneuve.qc.ca/programme/developpement-applications/" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Website
                  </a>
                  <a href="/Adam_Maatouk_Transcript.pdf" className="experience__project-btn" target="_blank" rel="noopener noreferrer" download>
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Transcript
                  </a>
                </div>
              </li>
            </ul>
          )}
          {experienceTab === 'hackathons' && (
            <ul className="experience__timeline">
              <li className="experience__entry">
                <div className="experience__icon experience__icon--img">
                  <img src="/MuslimHacks.png" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">SpotLight - Privacy Browser Extension</h3>
                    <span className="experience__dates">Sep 2026</span>
                  </div>
                  <p className="experience__role">1st Place - MuslimHacks 2026</p>
                  <ul className="experience__bullets">
                    <li>Built SpotLight in 24 hours with a team — a local-first browser extension that monitors outbound traffic and explains tracking and fingerprinting attempts in plain English.</li>
                    <li>Enabled users to block trackers or spoof sensitive data (geolocation, device fingerprints) with one click, with no servers or cloud infrastructure.</li>
                    <li>Turned a complex privacy problem into a clear product and pitch, placing 1st overall with teammates Ayoub Khial and Anis Djenadi.</li>
                  </ul>
                  <a href="https://spotlightwebsite.vercel.app" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Website
                  </a>
                  <a href="https://github.com/AK-Issac/SpotLight" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    GitHub
                  </a>
                  <a href="https://devpost.com/software/spotlight-jsz3tg" target="_blank" rel="noopener noreferrer" className="experience__project-btn">
                    <svg className="experience__project-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    Devpost
                  </a>
                </div>
              </li>
              <li className="experience__entry">
                <div className="experience__icon experience__icon--img">
                  <img src="/CareXR.png" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">Before You Go - Pediatric VR Simulator</h3>
                    <span className="experience__dates">Feb 2026</span>
                  </div>
                  <p className="experience__role">2nd Place - CareXR Hack - Solo</p>
                  <ul className="experience__bullets">
                    <li>Built a fully interactive Meta Quest 3 VR application in 48 hours with 2 complete medical simulations.</li>
                    <li>Resolved OpenXR conflicts by engineering a modular XR system enabling stable multi-scene execution.</li>
                    <li>Improved simulation usability by applying hospital-based design principles to reduce cognitive load.</li>
                  </ul>
                </div>
              </li>
              <li className="experience__entry">
                <div className="experience__icon experience__icon--img">
                  <img src="/Woz.jpg" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">Underdog - Sports Betting Recovery App</h3>
                    <span className="experience__dates">Mar 2026</span>
                  </div>
                  <p className="experience__role">3rd Place - BuildFast Hackathon - Solo</p>
                  <ul className="experience__bullets">
                    <li>Built and shipped a complete mobile app in 48 hours including onboarding, tracking, and feedback systems.</li>
                    <li>Differentiated product by targeting a niche recovery market through financial discipline UX design.</li>
                    <li>Placed 3rd overall as a solo developer among teams based on execution speed, product clarity, and usability.</li>
                  </ul>
                </div>
              </li>
              <li className="experience__entry">
                <div className="experience__icon experience__icon--img">
                  <img src="/ConuhacksIX.png" alt="" className="experience__icon-img" />
                </div>
                <div className="experience__body">
                  <div className="experience__header">
                    <h3 className="experience__title">Better Call Saul AI - Legal Assistant</h3>
                    <span className="experience__dates">Jan 2025</span>
                  </div>
                  <p className="experience__role">Winner - ConUHacks IX</p>
                  <ul className="experience__bullets">
                    <li>Led a 4-person team to build a bilingual AI legal assistant in 24 hours, leading to a win.</li>
                    <li>Achieved 90%+ accuracy by integrating speech recognition and translation pipelines across French and English.</li>
                    <li>Delivered a real-time AI demo recognized for usability, originality, and real-world impact.</li>
                  </ul>
                </div>
              </li>
            </ul>
          )}
          </div>
        </div>
      </section>
      <section className="skills">
        <h2 className="skills__subtitle">Core</h2>
        <h2 className="skills__title">Skills</h2>
        <div className="skills__grid">
          {SKILLS.map((skill) => (
            <a
              key={skill.url + skill.name}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="skills__link"
            >
              <img
                src={skill.logoUrl ?? `https://skillicons.dev/icons?i=${skill.logo}`}
                alt=""
                className="skills__logo"
              />
              <span className="skills__name">{skill.name}</span>
            </a>
          ))}
        </div>
      </section>
      <section className="projects" aria-label="Featured projects">
        <h2 className="projects__subtitle">Featured</h2>
        <h2 className="projects__title">Projects</h2>
        <div className="projects__carousel">
          <div className="projects__carousel-row">
          <button
            type="button"
            className="projects__nav projects__nav--prev"
            onClick={handleProjectPrev}
            aria-label="Previous project"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="projects__nav-label">Prev</span>
          </button>
          <div className="projects__track">
            {PROJECTS.map((project, i) => {
              const isActive = i === projectIndex
              const isLeaving = i === leavingIndex
              const leaveToLeft = isLeaving && transitionDirection === 'next'
              const leaveToRight = isLeaving && transitionDirection === 'prev'
              const enterFromRight = isActive && transitionDirection === 'next'
              const enterFromLeft = isActive && transitionDirection === 'prev'
              return (
              <div
                key={project.id}
                className={`projects__card ${isActive ? 'projects__card--active' : ''} ${isLeaving ? 'projects__card--leaving' : ''} ${leaveToLeft ? 'projects__card--leave-to-left' : ''} ${leaveToRight ? 'projects__card--leave-to-right' : ''} ${enterFromRight ? 'projects__card--enter-from-right' : ''} ${enterFromLeft ? 'projects__card--enter-from-left' : ''}`}
                aria-hidden={!isActive && !isLeaving}
              >
                <div className="projects__image-wrap">
                  <img
                    src={project.image.startsWith('/') ? project.image : `/${project.image}`}
                    alt=""
                    className={`projects__image${project.imageObjectFit === 'contain' ? ' projects__image--contain' : ''}`}
                    loading={i === projectIndex ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={i === projectIndex ? 'high' : 'low'}
                  />
                  <div className="projects__tech-footer" role="presentation">
                    <span className="projects__tech-text">{project.techStack}</span>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
          <button
            type="button"
            className="projects__nav projects__nav--next"
            onClick={handleProjectNext}
            aria-label="Next project"
          >
            <span className="projects__nav-label">Next</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          </div>
          {PROJECTS[projectIndex] && (
            <div className="projects__body">
              <h3 className="projects__card-title">{PROJECTS[projectIndex].title}</h3>
              <p className="projects__card-subtext">{PROJECTS[projectIndex].subtext}</p>
              <div className="projects__links-wrap">
                {(PROJECTS[projectIndex].websiteUrl || PROJECTS[projectIndex].sourceUrl) ? (
                  <div className="projects__links">
                    {PROJECTS[projectIndex].websiteUrl && (
                      <a
                        href={PROJECTS[projectIndex].websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__link"
                      >
                        Website
                      </a>
                    )}
                    {PROJECTS[projectIndex].sourceUrl && (
                      <a
                        href={PROJECTS[projectIndex].sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__link"
                      >
                        Source code
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="projects__links-placeholder" aria-hidden />
                )}
              </div>
            </div>
          )}
          <div className="projects__dots" role="tablist" aria-label="Project selection">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === projectIndex}
                aria-label={`Project ${i + 1}`}
                className={`projects__dot ${i === projectIndex ? 'projects__dot--active' : ''}`}
                onClick={() => handleProjectDot(i)}
              />
            ))}
          </div>
        </div>
      </section>
      <Suspense
        fallback={
          <section className="github" aria-label="GitHub contributions">
            <h2 className="github__subtitle">Contributions</h2>
            <h2 className="github__title">Github</h2>
            <div className="github__chart-wrap" aria-busy="false">
              <GitHubCalendar 
                username="AdamMTK-NB" 
                style={{ width: '100%', minWidth: '750px' }}
                blockSize={12}
                blockMargin={4}
                fontSize={14}
              />
            </div>
          </section>
        }
      >
        <GitHubCalendarSection darkMode={darkMode} />
      </Suspense>
      <section className="hero-cta" aria-label="Get in touch">
        <div className="hero-cta__left">
          <div className="hero-cta__figure">
            <img src="/hero.svg" alt="" className="hero-cta__img" />
          </div>
          <div className="hero-cta__line" aria-hidden="true" />
        </div>
        <div className="hero-cta__right">
          <h2 className="hero-cta__heading">Socials</h2>
          <div className="hero-cta__socials">
            <a href="https://www.linkedin.com/in/adammaatouk/" target="_blank" rel="noopener noreferrer" className="hero-cta__social" aria-label="LinkedIn">
              <svg className="hero-cta__social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="https://discord.com/users/752041096045133834" target="_blank" rel="noopener noreferrer" className="hero-cta__social" aria-label="Discord">
              <svg className="hero-cta__social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="https://github.com/AdamMTK-NB" target="_blank" rel="noopener noreferrer" className="hero-cta__social" aria-label="GitHub">
              <svg className="hero-cta__social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0-2-1.5-3-1.5-3-1.5-.3 1.15-.3 2.35 0 3.5-1.05 1.08-1 2.5-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
            </a>
            <a href="mailto:adammaatouknb@gmail.com" className="hero-cta__social" aria-label="Email">
              <svg className="hero-cta__social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
          <p className="hero-cta__tagline">Founder • Based in Montreal • FullStack Engineer • Gym Rat</p>
          <a href="mailto:adammaatouknb@gmail.com" className="hero-cta__btn">
            Let&apos;s Talk
          </a>
        </div>
      </section>
      <footer className="footer-name" aria-label="Footer">
        <span className="footer-name__text">Adam</span>
        <div className="footer-name__cat-cta">
          <button
            type="button"
            className="intro__btn footer-name__cat-btn"
            onClick={() => { setShowCats(true); setZoomedCatId(null); }}
          >
            Meet my chaotic coworkers
          </button>
        </div>
        <p className="footer-name__updated">Last updated: {LAST_UPDATED}</p>
      </footer>
      {showCats && (
        <div className="cats-modal" role="dialog" aria-modal="true" aria-label="Cat photo gallery">
          <div
            className="cats-modal__backdrop"
            onClick={() => setShowCats(false)}
            aria-hidden="true"
          />
          <div className="cats-modal__content">
            <button
              type="button"
              className="cats-modal__close"
              aria-label="Close cat photos"
              onClick={() => setShowCats(false)}
            >
              ×
            </button>
            <header className="cats-modal__header">
              <h2 className="cats-modal__title">Meet my chaotic coworkers</h2>
              <p className="cats-modal__subtitle">
                Yes, these are the real senior engineers behind this portfolio.
              </p>
            </header>
            <div className="cats-modal__body">
              <div className="cats-modal__grid">
                {CAT_IDS.filter((id) => !missingCats.has(id)).map((id) => (
                  <figure
                    key={id}
                    className="cats-modal__item"
                    onClick={(e) => { e.stopPropagation(); setZoomedCatId(id); }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setZoomedCatId(id); } }}
                    aria-label={`Zoom cat ${id}`}
                  >
                    <img
                      src={`/cats/${id}.jpg`}
                      alt={`Cat ${id}`}
                      className="cats-modal__img"
                      loading="lazy"
                      onError={() => handleCatImageError(id)}
                    />
                  </figure>
                ))}
              </div>
              {zoomedCatId !== null && (
                <div
                  className="cats-zoom"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Zoomed cat photo"
                >
                  <div
                    className="cats-zoom__backdrop"
                    onClick={() => setZoomedCatId(null)}
                    aria-hidden="true"
                  />
                  <button
                    type="button"
                    className="cats-zoom__close"
                    aria-label="Close zoom"
                    onClick={() => setZoomedCatId(null)}
                  >
                    ×
                  </button>
                  <img
                    src={`/cats/${zoomedCatId}.jpg`}
                    alt={`Cat ${zoomedCatId} zoomed`}
                    className="cats-zoom__img"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
