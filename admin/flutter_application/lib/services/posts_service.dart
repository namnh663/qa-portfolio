import '../models/post.dart';
import '../services/supabase_config.dart';
import 'package:logging/logging.dart';

class PostsService {
  final _supabase = SupabaseConfig.supabase;
  final _logger = Logger('PostsService');
  
  // Collection name constant to avoid typos and enable easy updates
  static const String _postsCollection = 'posts';

  Future<List<Post>> fetchBlogPosts() async {
    try {
      final response = await _supabase
          .from(_postsCollection)
          .select()
          .order('created_at', ascending: false);

      return _convertResponseToPosts(response);
    } catch (e) {
      _logError('fetchBlogPosts', e);
      return [];
    }
  }

  Future<Post?> getPostById(String id) async {
    try {
      final response = await _supabase
          .from(_postsCollection)
          .select()
          .eq('id', id)
          .single();
      
      return Post.fromJson(_convertToMap(response));
    } catch (e) {
      _logError('getPostById', e);
      return null;
    }
  }

  Future<bool> createPost(Post post) async {
    try {
      await _supabase.from(_postsCollection).insert(_createPostData(post));
      return true;
    } catch (e) {
      _logError('createPost', e);
      return false;
    }
  }

  Future<bool> updatePost(Post post) async {
    try {
      await _supabase
          .from(_postsCollection)
          .update(_updatePostData(post))
          .eq('id', post.id);
      return true;
    } catch (e) {
      _logError('updatePost', e);
      return false;
    }
  }

  // Helper methods
  List<Post> _convertResponseToPosts(List<dynamic> response) {
    return response
        .map((post) => Post.fromJson(_convertToMap(post)))
        .toList();
  }

  Map<String, dynamic> _convertToMap(dynamic data) {
    return Map<String, dynamic>.from(data);
  }

  Map<String, dynamic> _createPostData(Post post) {
    return {
      'title': post.title,
      'content': post.content,
      'author': post.author,
      'created_at': DateTime.now().toIso8601String(),
    };
  }

  Map<String, dynamic> _updatePostData(Post post) {
    return {
      'title': post.title,
      'content': post.content,
      'author': post.author,
    };
  }

  void _logError(String operation, dynamic error) {
    _logger.warning('Error in $operation: $error');
  }
}