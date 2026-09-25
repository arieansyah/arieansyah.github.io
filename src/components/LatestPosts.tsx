import { Container } from './ui/Container'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { PostCard } from './PostCard'
import { posts } from '../lib/blog'

/** Loaded lazily from Home so the post sources stay out of the main bundle. */
export default function LatestPosts() {
  return (
    <Container as="section" className="mt-28">
      <Reveal>
        <SectionHeading
          eyebrow="Writing"
          title="Notes, tips & tutorials."
          description="What I learn while shipping backend, DevOps, and mobile products — written down."
          action={{ label: 'All posts', to: '/blog' }}
        />
      </Reveal>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {posts.slice(0, 2).map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.08}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </Container>
  )
}
