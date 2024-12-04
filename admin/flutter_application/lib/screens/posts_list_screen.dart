import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/posts_provider.dart';
import '../models/post.dart';
import '../screens/post_detail_screen.dart';

class PostsListScreen extends StatefulWidget {
  const PostsListScreen({super.key});

  @override
  State<PostsListScreen> createState() => _PostsListScreenState();
}

class _PostsListScreenState extends State<PostsListScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<PostsProvider>().loadPosts();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      title: const Text('Blog Posts'),
      actions: [
        IconButton(
          icon: const Icon(Icons.refresh),
          onPressed: () => _refreshPosts(),
          tooltip: 'Refresh posts',
        ),
      ],
    );
  }

  Widget _buildBody() {
    return Consumer<PostsProvider>(
      builder: (context, provider, child) {
        if (provider.isLoading) {
          return const Center(child: CircularProgressIndicator());
        }

        if (provider.error != null) {
          return _buildErrorView(provider);
        }

        if (provider.posts.isEmpty) {
          return const Center(child: Text('No posts available'));
        }

        return _buildPostsList(provider);
      },
    );
  }

  Widget _buildErrorView(PostsProvider provider) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            provider.error!,
            style: const TextStyle(color: Colors.red),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: _refreshPosts,
            child: const Text('Retry'),
          ),
        ],
      ),
    );
  }

  Widget _buildPostsList(PostsProvider provider) {
    return RefreshIndicator(
      onRefresh: _refreshPosts,
      child: ListView.builder(
        itemCount: provider.posts.length,
        itemBuilder: (context, index) => _buildPostCard(
          provider.posts[index],
          provider,
        ),
      ),
    );
  }

  Widget _buildPostCard(Post post, PostsProvider provider) {
    return Semantics(
      label: 'Post title ${post.title ?? 'Untitled'}',
      child: Card(
        margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: ListTile(
          title: Text(
            post.title ?? 'Untitled',
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          subtitle: Text(
            post.content ?? 'No content',
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          trailing: _buildCardActions(post, provider),
          onTap: () => _navigateToDetail(post),
          contentPadding: const EdgeInsets.all(16.0),
        ),
      ),
    );
  }

  Widget _buildCardActions(Post post, PostsProvider provider) {
    return Semantics(
      label: 'Actions for post ${post.title}',
      child: const Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Add any action buttons here with appropriate semantics
        ],
      ),
    );
  }

  Future<void> _refreshPosts() async {
    await context.read<PostsProvider>().loadPosts();
  }

  void _navigateToDetail(Post post) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => PostDetailScreen(post: post),
      ),
    );
  }
}