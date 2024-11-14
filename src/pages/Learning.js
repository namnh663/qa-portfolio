import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { fetchLearningPosts } from '../services/fetchLearningPosts';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Card from '../components/ui/Card';
import Footer from '../components/common/Footer';

const Learning = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: posts, loading, error } = useFetch(fetchLearningPosts);

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Learning <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Hub</span>
          </h1>

          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="learning-search"
              name="searchTerm"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPosts.map((post) => (
            <Link key={post.id} to={`/learning/${post.id}`}>
              <Card>
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-3 flex-grow">
                    {post.excerpt || post.content.substring(0, 100) + '...'}
                  </p>
                  <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{post.read_time}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learning;