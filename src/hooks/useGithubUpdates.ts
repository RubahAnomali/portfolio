import { useEffect, useState } from 'react'
import { profile, updates as fallback, type UpdateItem } from '../data/site'

interface Repo {
  name: string
  html_url: string
  pushed_at: string
  description: string | null
  language: string | null
  fork: boolean
}

const COVERS = [
  'linear-gradient(120deg, #0a2a5e, #2a6fd6 60%, #e8c25a)',
  'linear-gradient(120deg, #2b2b2e, #c4562a 60%, #f0b27a)',
  'linear-gradient(120deg, #0b0f24, #1fb5d6 55%, #d63ad0)',
  'linear-gradient(120deg, #1a1d22, #4a5560 55%, #c0392b)',
  'linear-gradient(120deg, #14301f, #2f8f5b 60%, #b6f0c8)',
]
const KEY = `gh-repos-v3-${profile.githubUser}` // bump when the filter changes, so a tab does not keep showing a cached older list
const TTL = 10 * 60 * 1000

/** Repos kept out of the Updates list: this site's own repo (so the newest item stays a game), the profile README repo
 *  (named like the user) and two old practice repos. */
const HIDDEN = new Set(['portfolio', profile.githubUser.toLowerCase(), 'hellocompose', 'web_dev'])

const toItems = (repos: Repo[]): UpdateItem[] =>
  repos
    .filter((r) => !r.fork && !HIDDEN.has(r.name.toLowerCase()))
    .slice(0, 20)
    .map((r, i) => {
      const known = fallback.find((f) => f.href === r.html_url) // the projects listed in site.ts keep their own title, date, cover, screenshot and clip
      return {
        // a long GitHub description would swamp the list, so a project from site.ts uses its own short title
        title: known?.title ?? `${r.name}${r.description ? ` — ${r.description}` : ''}`,
        date: known?.date ?? r.pushed_at.slice(0, 10).replace(/-/g, '.'),
        tag: r.language ?? 'Repo',
        href: r.html_url,
        cover: known?.cover ?? COVERS[i % COVERS.length],
        image: known?.image,
        video: known?.video,
      }
    })
    .sort((a, b) => b.date.localeCompare(a.date)) // newest first: a game's own date can differ from its push date

/** Cached repo items from this session, or null when missing or older than TTL. */
const readCache = (): UpdateItem[] | null => {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const { t, items } = JSON.parse(raw) as { t: number; items: UpdateItem[] }
    return Date.now() - t < TTL && items.length ? items : null
  } catch {
    return null
  }
}

/** Latest public repos for the configured GitHub user, falling back to static data. */
export function useGithubUpdates(): { items: UpdateItem[]; live: boolean } {
  const [state, setState] = useState<{ items: UpdateItem[]; live: boolean }>(() => {
    const cached = readCache()
    return cached ? { items: cached, live: true } : { items: fallback, live: false }
  })

  useEffect(() => {
    if (state.live) return
    const ctrl = new AbortController()
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=pushed&per_page=20`, { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<Repo[]>) : Promise.reject(new Error(String(r.status)))))
      .then((repos) => {
        const items = toItems(repos)
        if (!items.length) return
        setState({ items, live: true })
        try {
          sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), items }))
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        /* offline or rate-limited: keep static fallback */
      })
    return () => ctrl.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}
