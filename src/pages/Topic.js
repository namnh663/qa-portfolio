import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import Card from '../components/Card';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import NotFound from './NotFound';

const Topic = () => {
  const { topic } = useParams();  // Get the topic from the URL
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('topic', topic);

      if (error) {
        console.error('Error fetching topic posts:', error);
        setError(error);
      } else if (data.length === 0) {
        setError('Topic not found');
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [topic]);

  if (loading) return <LoadingSpinner />;
  if (error) return <NotFound />;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-black">Posts in {topic}</h1>
        <div className="grid gap-6">
          {currentPosts.map((post) => (
            <Card key={post.id}>
              <div className="card-header mb-4">
                <h2 className="text-xl font-semibold text-black">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
              </div>
              <div className="card-content">
                <p className="text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? 'default' : 'outline'}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>

        {/* Back to All Posts Button */}
        <div className="mt-8">
          <Link to="/blog">
            <Button>← Back to All Posts</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Topic;