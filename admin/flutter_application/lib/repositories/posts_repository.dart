import 'package:logging/logging.dart';
import '../models/post.dart';
import '../services/posts_service.dart';
import '../utils/error_handler.dart';

class PostsRepository {
  final PostsService _postsService;
  final _logger = Logger('PostsRepository');

  PostsRepository({PostsService? postsService}) 
      : _postsService = postsService ?? PostsService();

  Future<List<Post>> getPosts() async {
    _logger.info('Fetching all posts');
    return await _postsService.fetchBlogPosts();
  }

  Future<Post?> getPostById(String id) async {
    _logger.info('Fetching post with id: $id');
    return await _postsService.getPostById(id);
  }

  Future<bool> createPost(Post post) async {
    _logger.info('Creating new post: ${post.title}');
    return await _postsService.createPost(post);
  }

  Future<bool> updatePost(Post post) async {
    _logger.info('Updating post: ${post.id}');
    return await _postsService.updatePost(post);
  }

  Future<Map<String, int>> getTopicStats() async {
    _logger.info('Fetching topic statistics');
    try {
      final posts = await _postsService.fetchBlogPosts();
      final Map<String, int> stats = {};
      
      for (final post in posts) {
        if (post.title != null) {
          final topic = post.title!;
          stats[topic] = (stats[topic] ?? 0) + 1;
        }
      }
      
      return stats;
    } catch (e) {
      ErrorHandler.logError('getTopicStats', e);
      return {};
    }
  }
}