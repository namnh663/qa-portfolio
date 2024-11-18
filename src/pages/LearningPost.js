import { useParams } from 'react-router-dom';
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
      <main className="container mx-auto px-6 py-8">
        <BackToLearningHub />

        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h1>
            <PostMetadata {...post} />

            <div className="mt-8">
              <TableOfContents />
              <div className="mt-8">
                <MarkdownRenderer content={post.content} />
              </div>
            </div>
          </div>
        </article>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related Posts</h2>
          <RelatedPosts
            currentPostId={post.id}
            posts={relatedPosts || []}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LearningPost;