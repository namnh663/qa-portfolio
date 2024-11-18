import { MetadataIcon } from './MetadataIcon';

const PostMetadata = ({ category, read_time, author, created_at = [] }) => (
  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
    <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-4">
      <MetadataIcon type="category" value={category} />
      <MetadataIcon type="readTime" value={`${read_time} read`} />
      <MetadataIcon type="author" value={`By ${author}`} />
      <MetadataIcon type="date" value={new Date(created_at).toLocaleDateString()} />
    </div>
  </div>
);

export default PostMetadata;