// Builds each game in `game dev porto/` and copies its dist/ into public/games/<name>/
// so the portfolio can host them. Unity games are built from the editor (Drowned Bell > Build Web);
// their Builds/WebGL/ folder is copied as it is. Run: npm run sync:games
import { execSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const src = join(root, 'game dev porto')
const out = join(root, 'public', 'games')

mkdirSync(out, { recursive: true })
for (const name of readdirSync(src)) {
  const dir = join(src, name)
  if (!statSync(dir).isDirectory()) continue
  const unityWeb = join(dir, 'Builds', 'WebGL')
  let built
  if (existsSync(join(dir, 'package.json'))) {
    console.log(`\n== ${name}`)
    execSync('npm run build', { cwd: dir, stdio: 'inherit' })
    built = join(dir, 'dist')
  } else if (existsSync(join(unityWeb, 'index.html'))) {
    console.log(`\n== ${name} (Unity web build)`)
    built = unityWeb
  } else continue
  const dest = join(out, name)
  rmSync(dest, { recursive: true, force: true })
  cpSync(built, dest, { recursive: true })
  console.log(`copied -> public/games/${name}`)
}
