import Footer from '../components/common/Footer';
import BlogPostList from '../components/blog/BlogPostList';
import BlogTopics from '../components/blog/BlogTopics';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Error from './Error';
import { useBlogData } from '../hooks/useBlogData';

const Blog = () => {
  const { posts, topics, loading, error } = useBlogData();

  if (loading) return <LoadingSpinner />;
  if (error) return <Error error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <BlogPostList posts={posts} />
          </div>
          <div>
            <BlogTopics topics={topics} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;