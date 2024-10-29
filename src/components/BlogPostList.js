import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../supabaseClient';
import Button from './Button';
import Card from './Card';
import LoadingSpinner from './LoadingSpinner';
import Error from '../pages/Error';

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        setError(error);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (error) return <Error error={error} reset={() => setError(null)} />;

  if (loading) {
    return <LoadingSpinner />;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      <div className="grid gap-6">
        {currentPosts.map((post) => (
          <Card key={post.id}>
            <h2 className="text-xl font-semibold">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{post.excerpt}</p>
            <div className="mt-4">
              <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2">
                {post.topic}
              </span>
            </div>
          </Card>
        ))}
      </div>

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
    </div>
  );
};

export default BlogPostList;