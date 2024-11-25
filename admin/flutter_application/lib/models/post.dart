class Post {
  final String id;
  final String? title;
  final String? content;
  final String? author;
  final DateTime? createdAt;

  // Named constructor with required id
  const Post({
    required this.id,
    this.title,
    this.content,
    this.author,
    this.createdAt,
  });

  // Factory constructor for JSON deserialization
  factory Post.fromJson(Map<String, dynamic> json) => Post(
    id: json['id'].toString(),
    title: json['title'] as String?,
    content: json['content'] as String?,
    author: json['author'] as String?,
    createdAt: _parseDateTime(json['created_at']),
  );

  // Static helper for DateTime parsing
  static DateTime? _parseDateTime(dynamic date) {
    return date != null ? DateTime.parse(date as String) : null;
  }

  // JSON serialization
  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'content': content,
    'author': author,
    'created_at': createdAt?.toIso8601String(),
  };

  // Convenience method to create a copy with modified fields
  Post copyWith({
    String? id,
    String? title,
    String? content,
    String? author,
    DateTime? createdAt,
  }) => Post(
    id: id ?? this.id,
    title: title ?? this.title,
    content: content ?? this.content,
    author: author ?? this.author,
    createdAt: createdAt ?? this.createdAt,
  );

  @override
  String toString() => 'Post(id: $id, title: $title, author: $author)';
}