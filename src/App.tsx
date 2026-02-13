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
      <div className="circle-ripple" aria-hidden />
      <div className="circle-ripple circle-ripple--2" aria-hidden />
      <div className="circle-ripple circle-ripple--3" aria-hidden />
    </div>
  )
}

export default App
