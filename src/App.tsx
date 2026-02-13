import { useState, useEffect } from 'react'
import './App.css'
import { playClickSfx } from './utils/playClickSfx'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('portfolio-dark-mode')
    return stored === 'true'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('portfolio-dark-mode', String(darkMode))
  }, [darkMode])

  const handleDarkModeClick = () => {
    playClickSfx()
    setDarkMode((prev) => !prev)
  }

  return (
    <div className="app">
      <header className="header">
        <button
          type="button"
          className="header__dark-btn"
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
      </header>
      <div className="circle-ripple" aria-hidden />
      <div className="circle-ripple circle-ripple--2" aria-hidden />
      <div className="circle-ripple circle-ripple--3" aria-hidden />
      <h1>Adam Maatouk's Portfolio</h1>
    </div>
  )
}

export default App
