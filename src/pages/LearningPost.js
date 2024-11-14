import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TableOfContents from '../components/TableOfContents';
import RelatedPosts from '../components/RelatedPosts';
import useFetch from '../hooks/useFetch';
import { fetchLearningDetail } from '../services/fetchLearningDetail';
import { fetchRelatedPosts } from '../services/fetchRelatedPosts';
import LoadingSpinner from '../components/common/LoadingSpinner';
import NotFound from './NotFound';

const PostMetadata = ({ category, read_time, author, created_at = [] }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
    <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-4">
      <div className="flex items-center mr-6">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <span>{category}</span>
      </div>
      <div className="flex items-center mr-6">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{read_time} read</span>
      </div>
      <div className="flex items-center mr-6">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>By {author}</span>
      </div>
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{new Date(created_at).toLocaleDateString()}</span>
      </div>
    </div>
  </div>
);

const LearningPost = () => {
  const { id } = useParams();
  const { data: post, loading, error } = useFetch(fetchLearningDetail, id);
  const { data: relatedPosts = [] } = useFetch(fetchRelatedPosts, id);

  if (loading) return <LoadingSpinner />;
  if (error || !post) return <NotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          to="/learning"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 font-medium mb-8 group"
        >
          <svg className="w-5 h-5 mr-2 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Learning Hub
        </Link>

        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-indigo-600 to-blue-600"></div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h1>
            <PostMetadata {...post} />

            <div className="mt-8">
              <TableOfContents />
              <div className="mt-8">
                <ReactMarkdown
                  className="prose dark:prose-invert prose-blue max-w-none"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
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
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </article>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related Posts</h2>
          <RelatedPosts
            currentPostId={post.id}
            posts={relatedPosts || []}
          />
        </div>
      </div>
    </div>
  );
};

export default LearningPost;