import 'package:flutter/material.dart';
import 'package:flutter_application/services/supabase_config.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:flutter_application/providers/posts_provider.dart';
import 'package:provider/provider.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    await SupabaseConfig
        .initialize(); // Use the initialize method from SupabaseConfig
  });

  group('Posts List Screen Tests', () {
    testWidgets('should display error message on fetch failure',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => PostsProvider(),
          child: MaterialApp(
            home: Scaffold(
              body: Consumer<PostsProvider>(
                builder: (context, provider, child) {
                  if (provider.isLoading) {
                    return const CircularProgressIndicator();
                  } else if (provider.error != null) {
                    return Column(
                      children: [
                        Text(provider.error!),
                        TextButton(
                          onPressed: () {},
                          child: const Text('Retry'),
                        ),
                      ],
                    );
                  } else {
                    return ListView(
                      children: provider.posts
                          .map(
                              (post) => ListTile(title: Text(post.title ?? '')))
                          .toList(),
                    );
                  }
                },
              ),
            ),
          ),
        ),
      );

      final postsProvider = Provider.of<PostsProvider>(
          tester.element(find.byType(Scaffold)),
          listen: false);
      postsProvider.setError('Failed to fetch posts');
      await tester.pumpAndSettle();

      expect(find.text('Failed to fetch posts'), findsOneWidget);
      expect(find.text('Retry'), findsOneWidget);
    });

    testWidgets('should display list of posts', (WidgetTester tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => PostsProvider(),
          child: MaterialApp(
            home: Scaffold(
              body: Consumer<PostsProvider>(
                builder: (context, provider, child) {
                  if (provider.isLoading) {
                    return const CircularProgressIndicator();
                  } else if (provider.error != null) {
                    return Column(
                      children: [
                        Text(provider.error!),
                        TextButton(
                          onPressed: () {},
                          child: const Text('Retry'),
                        ),
                      ],
                    );
                  } else {
                    return ListView(
                      children: provider.posts
                          .map(
                              (post) => ListTile(title: Text(post.title ?? '')))
                          .toList(),
                    );
                  }
                },
              ),
            ),
          ),
        ),
      );

      final postsProvider = Provider.of<PostsProvider>(
          tester.element(find.byType(Scaffold)),
          listen: false);
      await postsProvider.loadPosts();
      await tester.pumpAndSettle();

      expect(find.byType(ListTile), findsWidgets);
    });

    testWidgets('should navigate to post detail screen on tap',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => PostsProvider(),
          child: MaterialApp(
            home: Scaffold(
              body: Consumer<PostsProvider>(
                builder: (context, provider, child) {
                  if (provider.isLoading) {
                    return const CircularProgressIndicator();
                  } else if (provider.error != null) {
                    return Column(
                      children: [
                        Text(provider.error!),
                        TextButton(
                          onPressed: () {},
                          child: const Text('Retry'),
                        ),
                      ],
                    );
                  } else {
                    return ListView(
                      children: provider.posts
                          .map((post) => ListTile(
                                title: Text(post.title ?? ''),
                                onTap: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) => Scaffold(
                                        appBar: AppBar(
                                          title: const Text('Post Detail'),
                                        ),
                                        body: Center(
                                          child: Text(post.title ?? ''),
                                        ),
                                      ),
                                    ),
                                  );
                                },
                              ))
                          .toList(),
                    );
                  }
                },
              ),
            ),
          ),
        ),
      );

      final postsProvider = Provider.of<PostsProvider>(
          tester.element(find.byType(Scaffold)),
          listen: false);
      await postsProvider.loadPosts();
      await tester.pumpAndSettle();

      await tester.tap(find.byType(ListTile).first);
      await tester.pumpAndSettle();

      expect(find.text('Post Detail'), findsOneWidget);
    });

    testWidgets('should refresh posts list on pull down',
        (WidgetTester tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => PostsProvider(),
          child: MaterialApp(
            home: Scaffold(
              body: Consumer<PostsProvider>(
                builder: (context, provider, child) {
                  if (provider.isLoading) {
                    return const CircularProgressIndicator();
                  } else if (provider.error != null) {
                    return Column(
                      children: [
                        Text(provider.error!),
                        TextButton(
                          onPressed: () {},
                          child: const Text('Retry'),
                        ),
                      ],
                    );
                  } else {
                    return RefreshIndicator(
                      onRefresh: provider.loadPosts,
                      child: ListView(
                        children: provider.posts
                            .map((post) =>
                                ListTile(title: Text(post.title ?? '')))
                            .toList(),
                      ),
                    );
                  }
                },
              ),
            ),
          ),
        ),
      );

      final postsProvider = Provider.of<PostsProvider>(
          tester.element(find.byType(Scaffold)),
          listen: false);
      await postsProvider.loadPosts();
      await tester.pumpAndSettle();

      await tester.drag(find.byType(ListView), const Offset(0, 300));
      await tester.pumpAndSettle();

      expect(find.byType(ListTile), findsWidgets);
    });
  });
}