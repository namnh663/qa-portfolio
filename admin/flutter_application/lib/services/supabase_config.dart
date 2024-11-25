import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class SupabaseConfig {
  static final supabase = Supabase.instance.client;

  static Future<void> initialize() async {
    await dotenv.load(fileName: '.env');

    await Supabase.initialize(
      url: 'REACT_APP_SUPABASE_URL',
      anonKey: 'REACT_APP_SUPABASE_KEY',
    );
  }
}