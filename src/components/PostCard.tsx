import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { Tag } from './ui/Tag'
import { formatDay } from '../lib/date'
import type { Post } from '../lib/blog'

const linkClass = 'after:absolute after:inset-0 after:rounded-2xl hover:text-accent'

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="group flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-muted">
          <time dateTime={post.date}>{formatDay(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
          <span aria-hidden="true">·</span>
          <span>{post.category}</span>
        </p>
        {post.externalUrl ? (
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-300 group-hover:border-accent/50 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        ) : null}
      </div>

      <h3 lang={post.lang} className="mt-3 text-lg leading-snug font-semibold tracking-tight">
        {post.externalUrl ? (
          <a href={post.externalUrl} target="_blank" rel="noopener" className={linkClass}>
            {post.title}
            <span className="sr-only"> (on Medium, opens in a new tab)</span>
          </a>
        ) : (
          <Link to={`/blog/${post.slug}`} className={linkClass}>
            {post.title}
          </Link>
        )}
      </h3>
      <p lang={post.lang} className="mt-3 flex-1 text-sm leading-relaxed text-body">
        {post.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
          {post.tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        {post.externalUrl ? <span className="text-xs text-muted">on Medium</span> : null}
        {post.lang === 'id' ? <span className="text-xs text-muted">Bahasa Indonesia</span> : null}
      </div>
    </Card>
  )
}
