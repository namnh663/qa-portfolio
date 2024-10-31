import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../supabaseClient';  // Your configured Supabase client
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';  // Global loading spinner component
import NotFound from './NotFound';  // Import the NotFound component

const BlogDetail = () => {
  const { id } = useParams();  // Get the blog post id from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);  // Global loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);  // Start loading
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
        setError(error);  // Set error state if fetching fails
      } else {
        setPost(data);
      }
      setLoading(false);  // Stop loading when data is fetched
    };

    fetchPost();
  }, [id]);

  // Show the global loading spinner if loading
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show the NotFound page if there is an error or the post is not found
  if (error || !post) {
    return <NotFound />;
  }

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
          <div className="card-content">
            <div className="prose dark:prose-invert max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
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