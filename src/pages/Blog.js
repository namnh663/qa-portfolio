import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import BlogPostList from '../components/BlogPostList';
import BlogTopics from '../components/BlogTopics';
import LoadingSpinner from '../components/LoadingSpinner';  // Import the loading spinner

const Blog = () => {
  const [loading, setLoading] = useState(true);  // Global loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate data fetching by fetching blog posts and topics
        setLoading(true);
        // You can add real data fetching logic here, for example:
        // await fetch('/api/blogPosts');
        await Promise.all([
          // Simulate fetching blog posts and topics
        ]);
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;  // Display loading spinner while data is being fetched
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <BlogPostList />
          </div>
          <div>
            <BlogTopics />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;