import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Eyebrow } from '../components/ui/SectionHeading'
import { PageHeader } from '../components/ui/PageHeader'
import { Tag } from '../components/ui/Tag'
import { buttonClass } from '../components/ui/button'
import { Markdown } from '../components/Markdown'
import { profile } from '../data/content'
import { getPost } from '../lib/blog'
import { formatDay } from '../lib/date'
import { useDocumentTitle } from '../lib/useDocumentTitle'

const backLink = 'group inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink'

export function BlogPost() {
  const { slug = '' } = useParams()
  const post = getPost(slug)
  useDocumentTitle(post ? `${post.title} — ${profile.name}` : `Post not found — ${profile.name}`)

  if (!post?.body) {
    return (
      <PageHeader eyebrow="404" title="Post not found." description="That post doesn't exist, or it moved.">
        <Link to="/blog" className={buttonClass('secondary', 'md', 'mt-8')}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All posts
        </Link>
      </PageHeader>
    )
  }

  return (
    <Container as="section" className="pt-12 sm:pt-16">
      <article lang={post.lang} className="mx-auto max-w-3xl">
        <Link to="/blog" className={backLink}>
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
          All posts
        </Link>

        <header className="mt-8 border-b border-border pb-8">
          <Eyebrow>{post.category}</Eyebrow>
          <h1 className="mt-4 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-body">{post.description}</p>

          <div className="mt-6 flex items-center gap-3">
            <img src="/avatar.webp" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover ring-2 ring-border" />
            <p className="text-sm">
              <span className="font-medium text-ink">{profile.name}</span>
              <span className="block text-muted">
                <time dateTime={post.date}>{formatDay(post.date)}</time> · {post.readingMinutes} min read
              </span>
            </p>
          </div>

          {post.tags.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Topics">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        <div className="mt-10">
          <Markdown>{post.body}</Markdown>
        </div>

        <footer className="mt-14 border-t border-border pt-8">
          <Link to="/blog" className={backLink}>
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
            Back to all posts
          </Link>
        </footer>
      </article>
    </Container>
  )
}
