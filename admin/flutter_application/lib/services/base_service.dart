import 'package:logging/logging.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

abstract class BaseService {
  final _supabase = Supabase.instance.client;
  final _logger = Logger('BaseService');

  // Protected getter for supabase client access in derived classes
  SupabaseClient get supabase => _supabase;

  // Protected method for standardized error handling
  Future<T> handleServiceCall<T>({
    required String operation,
    required Future<T> Function() serviceCall,
    T? defaultValue,
  }) async {
    try {
      return await serviceCall();
    } on PostgrestException catch (e) {
      _logError(operation, 'Database error: ${e.message}');
      throw ServiceException('Database operation failed', operation);
    } on AuthException catch (e) {
      _logError(operation, 'Authentication error: ${e.message}');
      throw ServiceException('Authentication failed', operation);
    } catch (e) {
      _logError(operation, 'Unexpected error: $e');
      if (defaultValue != null) {
        return defaultValue;
      }
      throw ServiceException('Operation failed', operation);
    }
  }

  // Protected method for database query execution
  Future<T> executeQuery<T>({
    required String operation,
    required Future<T> Function() query,
    T? defaultValue,
  }) async {
    return handleServiceCall(
      operation: operation,
      serviceCall: query,
      defaultValue: defaultValue,
    );
  }

  // Protected logging methods
  void logInfo(String message) {
    _logger.info(message);
  }

  void logWarning(String message) {
    _logger.warning(message);
  }

  void _logError(String operation, String error) {
    _logger.severe('Error in $operation: $error');
  }
}

class ServiceException implements Exception {
  final String message;
  final String operation;

  ServiceException(this.message, this.operation);

  @override
  String toString() => '$message during $operation';
}