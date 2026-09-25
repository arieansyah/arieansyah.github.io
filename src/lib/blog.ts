import mediumPosts from '../content/medium-posts.json'

export const postCategories = ['Tutorial', 'Tips', 'Story'] as const
export type PostCategory = (typeof postCategories)[number]

export type Post = {
  /** URL segment under /blog — the markdown filename without `.md`. */
  slug: string
  title: string
  /** ISO date or datetime; displayed in UTC. */
  date: string
  description: string
  category: PostCategory
  tags: string[]
  lang: 'en' | 'id'
  readingMinutes: number
  /** Markdown source. Absent for posts published elsewhere. */
  body?: string
  /** Set for posts published elsewhere (Medium) — the card links out instead of to /blog/:slug. */
  externalUrl?: string
}

type Frontmatter = Record<string, string | string[]>

function unquote(value: string) {
  return value.replace(/^(["'])(.*)\1$/, '$2')
}

/** Minimal `key: value` frontmatter — enough for strings and `[a, b]` lists. */
function parseFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return null

  const data: Frontmatter = {}
  for (const line of match[1].split(/\r?\n/)) {
    const pair = line.match(/^([\w-]+):\s*(.*)$/)
    if (!pair) continue
    const value = pair[2].trim()
    data[pair[1]] = value.startsWith('[') && value.endsWith(']')
      ? value.slice(1, -1).split(',').map((item) => unquote(item.trim())).filter(Boolean)
      : unquote(value)
  }
  return { data, body: match[2].trim() }
}

const isCategory = (value: unknown): value is PostCategory => postCategories.some((c) => c === value)

/** A bad post breaks the dev server loudly, but never takes the deployed blog down with it. */
function invalid(file: string, problem: string): null {
  const error = new Error(`${file}: ${problem}`)
  if (import.meta.env.DEV) throw error
  console.error(error)
  return null
}

function readPost(path: string, source: string): Post | null {
  const file = path.split('/').pop() ?? path
  const parsed = parseFrontmatter(source)
  if (!parsed) return invalid(file, 'missing a `---` frontmatter block at the top')

  const { data, body } = parsed
  const { title, date, description, category, lang } = data
  if (typeof title !== 'string' || !title) return invalid(file, 'frontmatter needs a `title`')
  if (typeof date !== 'string' || Number.isNaN(Date.parse(date))) return invalid(file, 'frontmatter needs a valid `date` (YYYY-MM-DD)')
  if (typeof description !== 'string' || !description) return invalid(file, 'frontmatter needs a `description`')
  if (!isCategory(category)) return invalid(file, `\`category\` must be one of: ${postCategories.join(', ')}`)
  if (data.draft === 'true' && !import.meta.env.DEV) return null

  return {
    slug: file.replace(/\.md$/, ''),
    title,
    date,
    description,
    category,
    tags: Array.isArray(data.tags) ? data.tags : [],
    lang: lang === 'id' ? 'id' : 'en',
    readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 200)),
    body,
  }
}

const sources = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>

const native = Object.entries(sources).flatMap(([path, source]) => readPost(path, source) ?? [])

const external: Post[] = mediumPosts.map((post) => ({
  slug: `medium-${post.id}`,
  title: post.title,
  date: post.date,
  description: post.description,
  category: isCategory(post.category) ? post.category : 'Tutorial',
  tags: post.tags,
  lang: post.lang === 'en' ? 'en' : 'id',
  readingMinutes: post.readingMinutes,
  externalUrl: post.url,
}))

/** Every post, newest first. */
export const posts: Post[] = [...native, ...external].sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

export function getPost(slug: string) {
  return native.find((post) => post.slug === slug)
}
