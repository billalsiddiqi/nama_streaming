import { useEffect, useState } from 'react'

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    const storedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Initial theme setup on mount
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      root.classList.add('dark')
      setIsDark(true)
    } else {
      root.classList.remove('dark')
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    const currentlyDark = root.classList.contains('dark')

    if (currentlyDark) {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  return { isDark, toggleTheme }
}
