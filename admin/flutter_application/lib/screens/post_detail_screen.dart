import 'package:flutter/material.dart';
import '../models/post.dart';

class PostDetailScreen extends StatelessWidget {
  final Post post;

  const PostDetailScreen({super.key, required this.post});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(context),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      title: Text(post.title ?? 'Post Detail'),
      actions: _buildAppBarActions(),
    );
  }

  List<Widget> _buildAppBarActions() {
    return [
      
    ];
  }

  Widget _buildBody(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildTitle(context),
          const SizedBox(height: 8),
          _buildAuthor(context),
          const SizedBox(height: 16),
          _buildContent(context),
        ],
      ),
    );
  }

  Widget _buildTitle(BuildContext context) {
    return Text(
      post.title ?? 'Untitled',
      style: Theme.of(context).textTheme.headlineMedium,
    );
  }

  Widget _buildAuthor(BuildContext context) {
    if (post.author == null) return const SizedBox.shrink();
    
    return Text(
      'By ${post.author}',
      style: Theme.of(context).textTheme.titleMedium,
    );
  }

  Widget _buildContent(BuildContext context) {
    return Text(
      post.content ?? 'No content available',
      style: Theme.of(context).textTheme.bodyLarge,
    );
  }
}