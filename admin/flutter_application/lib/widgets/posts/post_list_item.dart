import 'package:flutter/material.dart';
import '../../models/post.dart';

class PostListItem extends StatelessWidget {
  final Post post;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;
  final VoidCallback? onTap;

  const PostListItem({
    super.key,
    required this.post,
    this.onEdit,
    this.onDelete,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        title: Text(
          post.title ?? 'Untitled',
          style: const TextStyle(
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              post.content ?? 'No content',
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                fontSize: 14,
                color: Colors.black87,
              ),
            ),
            const SizedBox(height: 4),
            _buildMetadata(),
          ],
        ),
        trailing: _buildActions(),
        onTap: onTap,
      ),
    );
  }

  Widget _buildMetadata() {
    return Row(
      children: [
        if (post.author != null) ...[
          const Icon(
            Icons.person_outline,
            size: 16,
            color: Colors.grey,
          ),
          const SizedBox(width: 4),
          Text(
            post.author!,
            style: const TextStyle(
              fontSize: 12,
              color: Colors.grey,
            ),
          ),
        ],
        if (post.createdAt != null) ...[
          const SizedBox(width: 16),
          const Icon(
            Icons.access_time,
            size: 16,
            color: Colors.grey,
          ),
          const SizedBox(width: 4),
          Text(
            _formatDate(post.createdAt!),
            style: const TextStyle(
              fontSize: 12,
              color: Colors.grey,
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildActions() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        if (onEdit != null)
          IconButton(
            icon: const Icon(Icons.edit),
            onPressed: onEdit,
          ),
        if (onDelete != null)
          IconButton(
            icon: const Icon(Icons.delete),
            color: Colors.red[300],
            onPressed: onDelete,
          ),
      ],
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }
}