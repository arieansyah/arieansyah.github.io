import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { common } from 'lowlight'
import dart from 'highlight.js/lib/languages/dart'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import { Link } from 'react-router-dom'

const languages = { ...common, dart, dockerfile }

const components: Components = {
  a({ href = '', children }) {
    if (href.startsWith('/')) return <Link to={href}>{children}</Link>
    const external = /^https?:/.test(href)
    return (
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined}>
        {children}
      </a>
    )
  },
}

/** Renders a post body. Element styling lives in `.post-body` (index.css). */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="post-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { languages }]]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
