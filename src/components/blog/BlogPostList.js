import { useState } from 'react';
import { Link } from 'react-router-dom';
import { POSTS_PER_PAGE } from '../../constants/blogConstants';
import Card from '../ui/Card';
import Pagination from '../ui/Pagination';

const BlogPost = ({ post }) => (
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
);

const BlogPostList = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div>
      <div className="grid gap-6">
        {currentPosts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BlogPostList;