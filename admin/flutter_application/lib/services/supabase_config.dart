import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class SupabaseConfig {
  static late SupabaseClient supabase;

  static Future<void> initialize() async {
    // Load environment variables from the .env.local file
    await dotenv.load(fileName: '.env');

    // Retrieve values from environment variables
    final supabaseUrl = dotenv.env['REACT_APP_SUPABASE_URL'];
    final supabaseKey = dotenv.env['REACT_APP_SUPABASE_KEY'];

    if (supabaseUrl == null || supabaseKey == null) {
      throw Exception('Supabase URL or Key is not set in the .env file');
    }

    // Initialize Supabase with the retrieved URL and key
    await Supabase.initialize(
      url: supabaseUrl,
      anonKey: supabaseKey,
    );

    // Assign the initialized client
    supabase = Supabase.instance.client;
  }
}