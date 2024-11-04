import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchTopic } from '../services/fetchTopic';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Pagination from '../components/ui/Pagination';
import NotFound from './NotFound';

const postsPerPage = 5;

const Topic = () => {
  const { topic } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Use useFetch with fetchTopicPosts and topic as param
  const { data: posts, loading, error } = useFetch(fetchTopic, topic);

  if (loading) return <LoadingSpinner />;
  if (error) return <NotFound />;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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

        {/* Pagination Component */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

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