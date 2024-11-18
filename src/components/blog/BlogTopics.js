import { Link } from 'react-router-dom';
import Card from '../ui/Card';

const TopicItem = ({ topic }) => (
  <li className="flex justify-between items-center">
    <Link to={`/topics/${topic.name}`} className="text-gray-600">
      {topic.name}
    </Link>
    <span className="bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
      {topic.count}
    </span>
  </li>
);

const BlogTopics = ({ topics }) => (
  <Card>
    <h2 className="text-xl font-semibold">Topics</h2>
    <ul className="mt-4 space-y-2">
      {topics.map((topic) => (
        <TopicItem key={topic.name} topic={topic} />
      ))}
    </ul>
  </Card>
);

export default BlogTopics;