// src/components/BlogPostList.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchBlogPosts } from '../services/fetchBlogPosts';
import Card from '../components/ui/Card';
import LoadingSpinner from './common/LoadingSpinner';
import Error from '../pages/Error';
import Pagination from '../components/ui/Pagination';

const postsPerPage = 5;

const BlogPostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Use useFetch to get sorted blog posts
  const { data: posts, loading, error } = useFetch(fetchBlogPosts);

  if (loading) return <LoadingSpinner />;
  if (error) return <Error error={error} />;

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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

      {/* Pagination Component */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BlogPostList;