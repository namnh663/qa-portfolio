import 'package:flutter_application/services/supabase_config.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:flutter_application/screens/dashboard_screen.dart';
import 'package:flutter_application/widgets/posts/post_stats_card.dart';
import 'package:flutter/material.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    await SupabaseConfig
        .initialize(); // Use the initialize method from SupabaseConfig
  });

  group('Dashboard Screen Tests', () {
    testWidgets('Dashboard loads and displays correctly',
        (WidgetTester tester) async {
      await tester.pumpWidget(const MaterialApp(home: DashboardScreen()));
      await tester.pump();

      // Verify AppBar elements
      expect(find.text('Topics Dashboard'), findsOneWidget);
      expect(find.byIcon(Icons.refresh), findsOneWidget);

      // After loading, either shows grid or "No topics found"
      await tester.pumpAndSettle();
      bool hasGrid = find.byType(GridView).evaluate().isNotEmpty;
      bool hasNoTopics = find.text('No topics found').evaluate().isNotEmpty;
      expect(hasGrid || hasNoTopics, isTrue);
    });

    testWidgets('Refresh functionality works', (WidgetTester tester) async {
      await tester.pumpWidget(const MaterialApp(home: DashboardScreen()));
      await tester.pumpAndSettle();

      // Test refresh button
      await tester.tap(find.byIcon(Icons.refresh));
      await tester.pumpAndSettle();

      // Test pull-to-refresh
      await tester.drag(find.byType(RefreshIndicator), const Offset(0, 300));
      await tester.pumpAndSettle();
    });

    testWidgets('Topic card navigation works', (WidgetTester tester) async {
      await tester.pumpWidget(const MaterialApp(home: DashboardScreen()));
      await tester.pumpAndSettle();

      // If there are topic cards, test navigation
      if (find.byType(PostStatsCard).evaluate().isNotEmpty) {
        await tester.tap(find.byType(PostStatsCard).first);
        await tester.pumpAndSettle();

        // Verify navigation to TopicPostsScreen
        expect(find.byType(DashboardScreen), findsNothing);
      }
    });
  });
}