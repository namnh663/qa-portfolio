import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchBlogDetail } from '../services/fetchBlogDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import NotFound from './NotFound';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Footer from '../components/common/Footer';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';

const BlogHeader = ({ title, date, topic }) => (
  <div className="card-header">
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-2 md:space-y-0">
      <span className="text-gray-600 dark:text-gray-400">
        {new Date(date).toLocaleDateString()}
      </span>
      <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
        {topic}
      </span>
    </div>
  </div>
);

const BlogContent = ({ content }) => (
  <div className="card-content prose dark:prose-invert max-w-none">
    <MarkdownRenderer content={content} />
  </div>
);

const BlogDetail = () => {
  const { id } = useParams();
  const { data: post, loading, error } = useFetch(fetchBlogDetail, id);

  if (loading) return <LoadingSpinner />;
  if (error || !post) return <NotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-6 py-8">
        <Card className="mb-8">
          <BlogHeader 
            title={post.title}
            date={post.date}
            topic={post.topic}
          />
          <BlogContent content={post.content} />
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