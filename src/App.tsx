import { useState, useEffect, useRef } from 'react'
import './App.css'
import { playClickSfx } from './utils/playClickSfx'

const MUSIC_SRC = '/jazz.mp3'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('portfolio-dark-mode')
    return stored === 'true'
  })
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('portfolio-dark-mode', String(darkMode))
  }, [darkMode])

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC)
    audio.loop = true
    audio.volume = 0.2
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  const handleDarkModeClick = () => {
    playClickSfx()
    setDarkMode((prev) => !prev)
  }

  const handleMusicClick = () => {
    playClickSfx()
    const audio = audioRef.current
    if (!audio) return
    if (isMusicPlaying) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
    setIsMusicPlaying((prev) => !prev)
  }

  return (
    <div className="app">
      <header className="header">
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
      </header>
      <section className="hero" aria-label="Hero illustration">
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
          Do you want to see the fun side of my work? Dive deeper into my world.{' '}
          <button type="button" className="intro__btn intro__btn--inline" data-tooltip="prepare yourself">Get to the fun side</button>
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
      <div className="circle-ripple" aria-hidden />
      <div className="circle-ripple circle-ripple--2" aria-hidden />
      <div className="circle-ripple circle-ripple--3" aria-hidden />
    </div>
  )
}

export default App
