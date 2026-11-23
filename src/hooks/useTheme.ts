import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'theme'
const COLORS: Record<Theme, string> = { light: '#d3e2e6', dark: '#0b1013' }

const read = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

/** Light / dark theme. The initial value is set by an inline script in index.html (no flash). */
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(read)

  const toggle = useCallback(() => {
    const next: Theme = read() === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[next])
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
    setTheme(next)
  }, [])

  return [theme, toggle]
}
