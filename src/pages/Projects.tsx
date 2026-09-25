import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { PageHeader } from '../components/ui/PageHeader'
import { FilterPills } from '../components/ui/FilterPills'
import { ProjectCard } from '../components/ProjectCard'
import { CtaBanner } from '../components/CtaBanner'
import { profile, projectCategories, projects, type ProjectCategory } from '../data/content'
import { easeBrand } from '../lib/motion'
import { useDocumentTitle } from '../lib/useDocumentTitle'

type Filter = 'All' | ProjectCategory

const filters: Filter[] = ['All', ...projectCategories]

function countFor(filter: Filter) {
  return filter === 'All' ? projects.length : projects.filter((p) => p.categories.includes(filter)).length
}

export function Projects() {
  useDocumentTitle(`Projects — ${profile.name}`)
  const [active, setActive] = useState<Filter>('All')
  const visible = active === 'All' ? projects : projects.filter((p) => p.categories.includes(active))

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I've built."
        description="Products and platforms I've built or shipped features for — for enterprise, government, fintech, and my own products."
      />

      <Container>
        <LayoutGroup>
          <FilterPills
            label="Filter projects"
            options={filters}
            active={active}
            onChange={setActive}
            count={countFor}
            layoutId="project-filter"
          />

          <motion.ul layout className="mt-8 grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <motion.li
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: easeBrand }}
                >
                  <ProjectCard project={project} />
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
