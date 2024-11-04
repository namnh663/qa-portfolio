import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchBlogDetail } from '../services/fetchBlogDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import NotFound from './NotFound';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Footer from '../components/common/Footer';

const BlogDetail = () => {
  const { id } = useParams();
  const { data: post, loading, error } = useFetch(fetchBlogDetail, id);

  if (loading) return <LoadingSpinner />;
  if (error || !post) return <NotFound />;

  // Manual Markdown Parsing Function
  const renderContent = (content) => {
    const lines = content.split('\n');

    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-2xl font-bold mb-4">{line.slice(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-xl font-semibold mb-3">{line.slice(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-lg font-medium mb-2">{line.slice(4)}</h3>;
      }

      const imageMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
      if (imageMatch) {
        const [, alt, imageName] = imageMatch;
        return (
          <img
            key={index}
            src={`/images/${imageName}`}
            alt={alt}
            className="w-full h-auto rounded-lg my-4"
            style={{ maxWidth: '100%' }}
          />
        );
      }

      const orderedMatch = line.match(/^\d+\. (.*)/);
      if (orderedMatch) {
        const [, text] = orderedMatch;
        return <li key={index} className="ml-6 list-decimal">{text}</li>;
      }

      return <p key={index} className="mb-4">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-6 py-8">
        <Card className="mb-8">
          <div className="card-header">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-2 md:space-y-0">
              <span className="text-gray-600 dark:text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
              <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {post.topic}
              </span>
            </div>
          </div>
          <div className="card-content prose dark:prose-invert max-w-none">
            {renderContent(post.content)}
          </div>
        </Card>

        <div className="mt-10">
          <Link to="/blog">
            <Button>← Back to Blog</Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;