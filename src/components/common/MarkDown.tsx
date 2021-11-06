import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'

const MarkDown = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      className="dark:bg-gray-500 dark:text-white max-h-screen w-full"
      children={markdown}
      remarkPlugins={[remarkGfm]}
      components={{
        h1({ node, ...props }) {
          return <h1 className="text-4xl" {...props} aria-hidden />
        },
        h2({ node, ...props }) {
          return <h2 className="text-3xl" {...props} aria-hidden />
        },
        h3({ node, ...props }) {
          return <h3 className="text-2xl" {...props} aria-hidden />
        },
        h4({ node, ...props }) {
          return <h4 className="text-xl" {...props} aria-hidden />
        },
        h5({ node, ...props }) {
          return <h5 className="text-lg" {...props} aria-hidden />
        },
        h6({ node, ...props }) {
          return <h6 className="text-base" {...props} aria-hidden />
        },
        a({ node, ...props }) {
          return (
            // eslint-disable-next-lin 
            <a className="underline text-blue-400" rel="noreferrer" {...props} />
          )
        },
        code({ node, inline, className, children, ref, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={nord}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        },
      }}
    />
  )
}

export default MarkDown
