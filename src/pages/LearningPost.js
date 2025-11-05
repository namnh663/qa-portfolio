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

// The "little effect" you wanted: a simple, clean fade-in.
const mainVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
};

const relatedVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.4, delay: 0.2 } 
  },
};

const LearningPost = () => {
  const { id } = useParams();
  const { data: post, loading, error } = useFetch(fetchLearningDetail, id);
  const { data: relatedPosts = [] } = useFetch(fetchRelatedPosts, id);

  if (loading) return <LoadingSpinner />;
  if (error || !post) return <NotFound />;

  return (
    // 1. "Google-like" Style: Simple, clean white (or dark) background.
    //    All content lives directly on the page.
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      
      {/* 2. Centered, Constrained Content:
            - max-w-screen-xl provides ample space for the two-column layout.
            - Generous vertical padding for a clean, uncluttered feel.
      */}
      <main 
        className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 
                   py-12 sm:py-16"
        role="main"
        aria-labelledby="post-title"
      >
        <div className="mb-8 sm:mb-12">
          {/* This component could be styled with a blue link and an arrow
              (e.g., text-blue-600) for a true "Google" feel. */}
          <BackToLearningHub />
        </div>

        {/* 3. Functional Two-Column Layout (like Google docs):
             - Grid layout for alignment.
             - lg:gap-x-16 gives a wide, clean gutter.
        */}
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">

          {/* Sidebar (Table of Contents)
            - order-2: Appears *after* content on mobile.
            - lg:order-2: Stays on the right for desktop.
            - sticky top-24: Sticks for easy navigation.
          */}
          <aside className="lg:col-span-3 lg:order-2 order-2 mt-12 lg:mt-0">
            <div className="sticky top-24">
              <h3 
                className="text-sm font-semibold tracking-wide uppercase 
                           text-gray-600 dark:text-gray-400 mb-4"
              >
                On this page
              </h3>
              <TableOfContents />
            </div>
          </aside>

          {/* Main Article Content
            - order-1: Appears *first* on mobile.
            - lg:order-1: Stays on the left for desktop.
          */}
          <motion.article
            className="lg:col-span-9 lg:order-1 order-1"
            variants={mainVariants}
            initial="hidden"
            animate="visible"
          >
            <header className="mb-8">
              {/* 4. Clean, Sans-Serif Typography:
                   - Back to default sans-serif font.
                   - Bold, but not overly large.
              */}
              <h1 
                id="post-title"
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
              >
                {post.title}
              </h1>
              
              <PostMetadata {...post} />
            </header>
            
            {/* 5. Subtle Dividers: A light border, very "Material Design". */}
            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MarkdownRenderer content={post.content} />
            </div>
          </motion.article>

        </div> {/* End of grid layout */}

        {/* Related Posts Section */}
        <motion.section 
          className="mt-16 sm:mt-24"
          variants={relatedVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Placed in the same column as the article for alignment */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
            <div className="lg:col-span-9 lg:order-1">
              <hr className="mb-12 border-gray-200 dark:border-gray-700" />
              <h2 
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-8"
              >
                Related Posts
              </h2>
              <RelatedPosts
                currentPostId={post.id}
                posts={relatedPosts || []}
              />
            </div>
          </div>
        </motion.section>

      </main>
      <Footer />
    </div>
  );
};

export default LearningPost;