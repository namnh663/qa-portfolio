import 'package:flutter/foundation.dart';
import '../models/post.dart';
import '../repositories/posts_repository.dart';
import '../utils/error_handler.dart';

class PostsProvider extends ChangeNotifier {
  final PostsRepository _repository;
  List<Post> _posts = [];
  Map<String, int> _topicStats = {};
  bool _isLoading = false;
  String? _error;

  PostsProvider({PostsRepository? repository})
      : _repository = repository ?? PostsRepository();

  // Getters
  List<Post> get posts => _posts;
  Map<String, int> get topicStats => _topicStats;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // Load all posts
  Future<void> loadPosts() async {
    _setLoading(true);
    try {
      _posts = await _repository.getPosts();
      _error = null;
    } catch (e) {
      _error = ErrorHandler.handleError(e);
    } finally {
      _setLoading(false);
    }
  }

  // Load topic statistics
  Future<void> loadTopicStats() async {
    _setLoading(true);
    try {
      _topicStats = await _repository.getTopicStats();
      _error = null;
    } catch (e) {
      _error = ErrorHandler.handleError(e);
    } finally {
      _setLoading(false);
    }
  }

  // Create new post
  Future<bool> createPost(Post post) async {
    _setLoading(true);
    try {
      final success = await _repository.createPost(post);
      if (success) {
        await loadPosts();
        await loadTopicStats();
      }
      return success;
    } catch (e) {
      _error = ErrorHandler.handleError(e);
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Update existing post
  Future<bool> updatePost(Post post) async {
    _setLoading(true);
    try {
      final success = await _repository.updatePost(post);
      if (success) {
        await loadPosts();
        await loadTopicStats();
      }
      return success;
    } catch (e) {
      _error = ErrorHandler.handleError(e);
      return false;
    } finally {
      _setLoading(false);
    }
  }

  // Helper method to set loading state
  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  // Clear any errors
  void clearError() {
    _error = null;
    notifyListeners();
  }

  // Set error message
  void setError(String error) {
    _error = error;
    notifyListeners();
  }

  // Set posts list
  void setPosts(List<Post> posts) {
    _posts = posts;
    notifyListeners();
  }
}