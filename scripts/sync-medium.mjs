// Pulls your latest Medium stories into src/content/medium-posts.json so they
// show up in the blog list (and link out to Medium).
//
//   npm run sync:medium
//
// Medium's RSS feed only exposes the 10 most recent stories, so existing entries
// are kept and updated in place — never dropped. `category` and `lang` are yours
// to edit in the JSON; re-syncing preserves them.

import { readFile, writeFile } from 'node:fs/promises'

const USER = 'arieansyah' // keep in sync with `profile.medium` in src/data/content.ts
const FEED = `https://medium.com/feed/@${USER}`
const OUT = new URL('../src/content/medium-posts.json', import.meta.url)

const DEFAULTS = { category: 'Tutorial', lang: 'id' }

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1)))
    return entities[e.toLowerCase()] ?? m
  })

const stripTags = (html) => decode(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()

function field(item, tag) {
  const match = item.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`))
  return match ? match[1].trim() : ''
}

function excerpt(html) {
  const paragraph = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)]
    .map((m) => stripTags(m[1]))
    .find((text) => text.length > 60)
  if (!paragraph) return ''
  if (paragraph.length <= 200) return paragraph
  return `${paragraph.slice(0, 200).replace(/\s+\S*$/, '')}…`
}

function parse(xml) {
  return xml
    .split('<item>')
    .slice(1)
    .map((item) => {
      const url = field(item, 'link').split('?')[0]
      const html = field(item, 'content:encoded')
      const prose = html.replace(/<figure>[\s\S]*?<\/figure>/g, '').replace(/<\/(p|li|h\d|pre|blockquote)>/g, ' ')
      const words = stripTags(prose).split(' ').length
      return {
        id: url.match(/-([0-9a-f]{10,})$/)?.[1] ?? url,
        title: decode(field(item, 'title')),
        url,
        date: new Date(field(item, 'pubDate')).toISOString(),
        description: excerpt(html),
        tags: [...item.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g)].map((m) => m[1]),
        readingMinutes: Math.max(1, Math.round(words / 200)),
      }
    })
}

const response = await fetch(FEED, { headers: { 'user-agent': 'Mozilla/5.0 (sync-medium)' } })
if (!response.ok) {
  console.error(`Could not fetch ${FEED}: HTTP ${response.status}`)
  process.exit(1)
}
const fresh = parse(await response.text())
if (fresh.length === 0) {
  console.error('No stories found in the feed — leaving medium-posts.json untouched.')
  process.exit(1)
}

const existing = await readFile(OUT, 'utf8').then(JSON.parse, () => [])
const byId = new Map(existing.map((post) => [post.id, post]))
for (const post of fresh) {
  const { category, lang } = byId.get(post.id) ?? DEFAULTS
  byId.set(post.id, { ...post, category, lang })
}

const merged = [...byId.values()].sort((a, b) => b.date.localeCompare(a.date))
await writeFile(OUT, `${JSON.stringify(merged, null, 2)}\n`)

const added = fresh.filter((post) => !existing.some((e) => e.id === post.id)).length
console.log(`Synced ${fresh.length} stories from Medium (${added} new) → src/content/medium-posts.json`)
