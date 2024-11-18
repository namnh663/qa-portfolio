import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Markdown } from './Markdown';

const MarkdownRenderer = ({ content }) => (
  <ReactMarkdown
    className="prose dark:prose-invert prose-blue max-w-none"
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={Markdown}
  >
    {content}
  </ReactMarkdown>
);

export default MarkdownRenderer;