import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import '../widgets/posts/post_stats_card.dart';
import '../screens/topic_posts_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  final _supabase = Supabase.instance.client;
  Map<String, int> topicStats = {};
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchTopicStats();
  }

  Future<void> _fetchTopicStats() async {
    setState(() => isLoading = true);
    
    try {
      final response = await _supabase
          .from('posts')
          .select('topic')
          .order('topic');
      
      final Map<String, int> stats = {};
      for (final post in response) {
        final topic = post['topic'] as String;
        stats[topic] = (stats[topic] ?? 0) + 1;
      }

      setState(() {
        topicStats = stats;
        isLoading = false;
      });
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Failed to load topics')),
        );
        setState(() => isLoading = false);
      }
    }
  }

  void _navigateToTopicPosts(String topic) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => TopicPostsScreen(topic: topic),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Topics Dashboard'),
        centerTitle: true,
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchTopicStats,
            tooltip: 'Refresh Stats',
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _fetchTopicStats,
        child: isLoading 
          ? const Center(child: CircularProgressIndicator())
          : topicStats.isEmpty
            ? const Center(
                child: Text(
                  'No topics found',
                  style: TextStyle(fontSize: 16),
                ),
              )
            : GridView.builder(
                padding: const EdgeInsets.all(16.0),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16.0,
                  mainAxisSpacing: 16.0,
                  childAspectRatio: 1.1,
                ),
                itemCount: topicStats.length,
                itemBuilder: (context, index) {
                  final topic = topicStats.keys.elementAt(index);
                  final count = topicStats[topic]!;
                  
                  return PostStatsCard(
                    title: topic,
                    value: count.toString(),
                    icon: Icons.topic,
                    color: Colors.primaries[index % Colors.primaries.length],
                    onTap: () => _navigateToTopicPosts(topic),
                  );
                },
              ),
      ),
    );
  }
}