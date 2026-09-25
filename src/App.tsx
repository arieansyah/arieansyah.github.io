import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { Home } from './pages/Home'
import { Experience } from './pages/Experience'
import { Projects } from './pages/Projects'
import { Contact } from './pages/Contact'
import { Resume } from './pages/Resume'

// The blog pulls in a markdown renderer, so keep it out of the main bundle.
const Blog = lazy(() => import('./pages/Blog').then((m) => ({ default: m.Blog })))
const BlogPost = lazy(() => import('./pages/BlogPost').then((m) => ({ default: m.BlogPost })))

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="experience" element={<Experience />} />
        <Route path="projects" element={<Projects />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="contact" element={<Contact />} />
        <Route path="resume" element={<Resume />} />
      </Route>
    </Routes>
  )
}

export default App
