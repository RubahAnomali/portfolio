// Builds each game in `game dev porto/` and copies its dist/ into public/games/<name>/
// so the portfolio can host them. Run: npm run sync:games
import { execSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const src = join(root, 'game dev porto')
const out = join(root, 'public', 'games')

mkdirSync(out, { recursive: true })
for (const name of readdirSync(src)) {
  const dir = join(src, name)
  if (!statSync(dir).isDirectory() || !existsSync(join(dir, 'package.json'))) continue
  console.log(`\n== ${name}`)
  execSync('npm run build', { cwd: dir, stdio: 'inherit' })
  const dest = join(out, name)
  rmSync(dest, { recursive: true, force: true })
  cpSync(join(dir, 'dist'), dest, { recursive: true })
  console.log(`copied -> public/games/${name}`)
}
