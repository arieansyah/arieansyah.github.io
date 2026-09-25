import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '../components/ui/Container'
import { PageHeader } from '../components/ui/PageHeader'
import { FilterPills } from '../components/ui/FilterPills'
import { buttonClass } from '../components/ui/button'
import { PostCard } from '../components/PostCard'
import { CtaBanner } from '../components/CtaBanner'
import { profile } from '../data/content'
import { postCategories, posts, type PostCategory } from '../lib/blog'
import { easeBrand } from '../lib/motion'
import { useDocumentTitle } from '../lib/useDocumentTitle'

type Filter = 'All' | PostCategory

/** Only categories that have posts — an empty pill is just noise. */
const filters: Filter[] = ['All', ...postCategories.filter((c) => posts.some((p) => p.category === c))]

function countFor(filter: Filter) {
  return filter === 'All' ? posts.length : posts.filter((p) => p.category === filter).length
}

export function Blog() {
  useDocumentTitle(`Blog — ${profile.name}`)
  const [active, setActive] = useState<Filter>('All')
  const visible = active === 'All' ? posts : posts.filter((p) => p.category === active)

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes from the codebase."
        description="Programming tips, tutorials, and stories from shipping backend, DevOps, and mobile products. Some are written here, others live on Medium."
      >
        <a href={profile.medium} target="_blank" rel="noopener" className={buttonClass('secondary', 'md', 'mt-8')}>
          Follow on Medium
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </PageHeader>

      <Container>
        <LayoutGroup>
          {filters.length > 2 ? (
            <FilterPills
              label="Filter posts"
              options={filters}
              active={active}
              onChange={setActive}
              count={countFor}
              layoutId="post-filter"
            />
          ) : null}

          <motion.ul layout className={`grid gap-4 md:grid-cols-2 ${filters.length > 2 ? 'mt-8' : ''}`}>
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((post) => (
                <motion.li
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: easeBrand }}
                >
                  <PostCard post={post} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      </Container>

      <CtaBanner />
    </>
  )
}
