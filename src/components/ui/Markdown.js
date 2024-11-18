import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Markdown = {
  h1: ({ children, ...props }) => (
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4" {...props}>
      {children}
    </h3>
  ),
  p: ({ node, ...props }) => <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed" {...props} />,
  ul: ({ node, ...props }) => (
    <ul
      className="
        list-disc 
        list-outside 
        ml-8 
        mb-4 
        space-y-2
      "
      {...props}
    />
  ),
  ol: ({ node, ...props }) => (
    <ol
      className="
        list-decimal 
        list-outside 
        ml-8 
        mb-4 
        space-y-2
      "
      {...props}
    />
  ),
  li: ({ node, ...props }) => (
    <li
      className="
        text-gray-700 dark:text-gray-300 
        pl-2 
        marker:text-blue-500
      "
      {...props}
    />
  ),
  a: ({ node, ...props }) => {
    const { children, href } = props;
    const content = children.length > 0 ? children : href;
    return (
      <a
        className="
          text-blue-600 
          dark:text-blue-400 
          hover:underline 
          transition-colors 
          font-medium
        "
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  },
  table: ({ node, ...props }) => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => <thead className="bg-gray-50 dark:bg-gray-800" {...props} />,
  th: ({ node, ...props }) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />,
  td: ({ node, ...props }) => <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 mb-6" {...props} />
  ),
  code: ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={oneDark}
        language={match[1]}
        PreTag="div"
        className="rounded-lg mb-6"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 text-sm" {...props}>
        {children}
      </code>
    );
  },
};