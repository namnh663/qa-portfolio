import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { fetchRelatedPosts } from '../services/fetchRelatedPosts';
import { fetchLearningDetail } from '../services/fetchLearningDetail';
import TableOfContents from '../components/TableOfContents';
import MarkdownRenderer from '../components/ui/MarkdownRenderer'; // Assuming you have this
import RelatedPosts from '../components/home/RelatedPosts';
import Skeleton from '../components/common/Skeleton'; // Reusing our Skeleton
import Footer from '../components/common/Footer';

const LearningPost = () => {
  const { id } = useParams();
  const { data: post, loading, error } = useFetch(fetchLearningDetail, id);
  const { data: relatedPosts } = useFetch(fetchRelatedPosts, id);

  // --- Loading State (Skeleton) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <Skeleton className="h-4 w-24 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" /> {/* Title */}
          <div className="flex gap-4 mb-12">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="grid lg:grid-cols-3 gap-12">
             <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-64 w-full rounded-xl my-8" />
                <Skeleton className="h-4 w-full" />
             </div>
             <div className="hidden lg:block">
                <Skeleton className="h-40 w-full" />
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) return <div className="text-center py-20">Post not found</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      
      {/* 1. Header Section */}
      <header className="border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Back Link */}
          <Link 
            to="/learning" 
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Knowledge Base
          </Link>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight"
          >
            {post.title}
          </motion.h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
               <Calendar className="w-4 h-4" />
               {new Date(post.date || Date.now()).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
               <Tag className="w-4 h-4" />
               <span className="font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                 {post.category}
               </span>
            </div>
            <div className="flex items-center gap-2">
               <Clock className="w-4 h-4" />
               {Math.ceil((post.content?.length || 0) / 1000)} min read
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          
          {/* 2. Article Content (Left/Main Column) */}
          <article className="lg:col-span-8">
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="prose prose-lg dark:prose-invert max-w-none 
                          prose-headings:font-bold prose-headings:tracking-tight 
                          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                          prose-img:rounded-xl prose-img:shadow-lg"
            >
               {/* Using 'react-markdown' or your existing MarkdownRenderer here.
                  Assuming 'content' is markdown string. 
               */}
               <MarkdownRenderer content={post.content} />
            </motion.div>
          </article>

          {/* 3. Sidebar (Right Column) - Sticky Table of Contents */}
          <aside className="hidden lg:block lg:col-span-4">
             <div className="sticky top-8">
                <TableOfContents />
             </div>
          </aside>

        </div>

        {/* 4. Footer Section: Related Posts */}
        <RelatedPosts currentPostId={post.id} posts={relatedPosts} />
      </main>

      <Footer />
    </div>
  );
};

export default LearningPost;