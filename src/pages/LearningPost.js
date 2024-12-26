import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import { fetchRelatedPosts } from '../services/fetchRelatedPosts';
import { fetchLearningDetail } from '../services/fetchLearningDetail';
import PostMetadata from '../components/ui/PostMetadata';
import TableOfContents from '../components/TableOfContents';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import RelatedPosts from '../components/RelatedPosts';
import LoadingSpinner from '../components/common/LoadingSpinner';
import BackToLearningHub from '../components/ui/BackToLearningHub';
import NotFound from './NotFound';
import Footer from '../components/common/Footer';

const LearningPost = () => {
  const { id } = useParams();
  const { data: post, loading, error } = useFetch(fetchLearningDetail, id);
  const { data: relatedPosts = [] } = useFetch(fetchRelatedPosts, id);

  if (loading) return <LoadingSpinner />;
  if (error || !post) return <NotFound />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <main 
        className="container mx-auto px-6 py-8"
        role="main"
        aria-labelledby="post-title"
      >
        <BackToLearningHub />

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400" 
               role="presentation" />
          
          <div className="p-4 sm:p-6 lg:p-8">
            <h1 
              id="post-title"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 
                         dark:text-white tracking-tight"
            >
              {post.title}
            </h1>

            <PostMetadata {...post} />

            <div className="mt-8 space-y-8">
              <TableOfContents />
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MarkdownRenderer content={post.content} />
              </div>
            </div>
          </div>
        </motion.article>

        <motion.div 
          className="mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 
            className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 
                       dark:text-white tracking-tight"
          >
            Related Posts
          </h2>
          <RelatedPosts
            currentPostId={post.id}
            posts={relatedPosts || []}
          />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningPost;