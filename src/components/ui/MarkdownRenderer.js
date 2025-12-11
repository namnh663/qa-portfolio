import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// 1. ID Generator for Table of Contents
const generateId = (children) => {
  const text = React.Children.toArray(children)
    .map(child => (typeof child === 'string' ? child : child.props?.children || ''))
    .join('');
  
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
};

const MarkdownComponents = {
  /**
   * ===============================================
   * GOOGLE-STYLE TABLE IMPLEMENTATION
   * ===============================================
   */
  table: ({ node, ...props }) => (
    <div className="my-10 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
      </div>
    </div>
  ),

  thead: ({ node, ...props }) => (
    <thead className="bg-gray-50 dark:bg-gray-900/50" {...props} />
  ),

  tbody: ({ node, ...props }) => (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800" {...props} />
  ),

  tr: ({ node, ...props }) => (
    <tr 
      className="transition-colors duration-150 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 group" 
      {...props} 
    />
  ),

  th: ({ node, children, ...props }) => (
    <th 
      className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none" 
      {...props} 
    >
      {children}
    </th>
  ),

  td: ({ node, children, ...props }) => (
    <td 
      className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-normal leading-relaxed" 
      {...props} 
    >
      {children}
    </td>
  ),

  /**
   * ===============================================
   * TYPOGRAPHY & SPACING (Optimized)
   * ===============================================
   */
  
  // H1: Page Title
  h1: ({ node, children, ...props }) => (
    <h1 
      id={generateId(children)} 
      // Changed: mt-10 -> mt-12, mb-6 -> mb-8 (More breathing room)
      className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-12 mb-8 tracking-tight leading-tight" 
      {...props}
    >
      {children}
    </h1>
  ),
  
  // H2: Major Section Divider
  h2: ({ node, children, ...props }) => (
    <h2 
      id={generateId(children)} 
      // Changed: mt-12 -> mt-16 (Clear section break), mb-5 -> mb-6
      className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mt-16 mb-6 tracking-tight border-b border-gray-100 dark:border-gray-800 pb-3" 
      {...props}
    >
      {children}
    </h2>
  ),
  
  // H3: Sub-section
  h3: ({ node, children, ...props }) => (
    <h3 
      id={generateId(children)} 
      // Changed: mt-8 -> mt-10 (Distinct from text), mb-3 -> mb-4
      className="text-xl font-semibold text-gray-800 dark:text-gray-100 mt-10 mb-4 leading-snug" 
      {...props}
    >
      {children}
    </h3>
  ),
  
  // Paragraphs
  p: ({ node, children, ...props }) => (
    // Changed: leading-7 -> leading-relaxed (approx 1.625) for better readability
    <p className="mb-6 text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300" {...props}>
      {children}
    </p>
  ),

  // Lists
  ul: ({ node, children, ...props }) => (
    <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed" {...props}>
      {children}
    </ul>
  ),
  
  ol: ({ node, children, ...props }) => (
    <ol className="list-decimal pl-6 mb-8 space-y-2 text-gray-600 dark:text-gray-300 leading-relaxed" {...props}>
      {children}
    </ol>
  ),

  // Links
  a: ({ node, children, ...props }) => (
    <a 
      className="text-blue-600 dark:text-blue-400 no-underline hover:underline font-medium transition-colors cursor-pointer" 
      target="_blank" 
      rel="noopener noreferrer" 
      {...props}
    >
      {children}
    </a>
  ),

  // Code Blocks
  code: ({ node, inline, className, children, ...props }) => {
    return inline ? (
      <code 
        className="px-1.5 py-0.5 mx-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 font-mono text-sm border border-gray-200 dark:border-gray-700 align-middle" 
        {...props}
      >
        {children}
      </code>
    ) : (
      <div className="my-8">
        <pre className="p-5 rounded-xl bg-gray-900 text-gray-50 overflow-x-auto text-sm font-mono leading-relaxed shadow-lg border border-gray-800">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },

  blockquote: ({ node, children, ...props }) => (
    <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/30 py-4 rounded-r-lg" {...props}>
      {children}
    </blockquote>
  ),
  
  img: ({ node, ...props }) => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img 
      className="rounded-xl shadow-md my-10 mx-auto border border-gray-100 dark:border-gray-700" 
      {...props} 
      alt={props.alt || ''} 
    />
  ),
};

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="markdown-content w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;