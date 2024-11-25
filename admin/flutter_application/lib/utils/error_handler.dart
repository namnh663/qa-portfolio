import 'package:logging/logging.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class ErrorHandler {
  static final _logger = Logger('ErrorHandler');

  static String handleError(dynamic error) {
    _logger.warning('Error occurred: $error');
    
    if (error is PostgrestException) {
      return _handleDatabaseError(error);
    } else if (error is AuthException) {
      return _handleAuthError(error);
    } else if (error is ServiceException) {
      return _handleServiceError(error);
    }
    
    return 'An unexpected error occurred';
  }

  static String _handleDatabaseError(PostgrestException error) {
    switch (error.code) {
      case '23505':
        return 'A record with this information already exists';
      case '23503':
        return 'This operation would violate database constraints';
      case '42P01':
        return 'The requested resource was not found';
      default:
        return 'Database operation failed: ${error.message}';
    }
  }

  static String _handleAuthError(AuthException error) {
    switch (error.statusCode) {
      case '401':
        return 'Authentication failed: Invalid credentials';
      case '403':
        return 'You do not have permission to perform this action';
      default:
        return 'Authentication error: ${error.message}';
    }
  }

  static String _handleServiceError(ServiceException error) {
    return '${error.message} during ${error.operation}';
  }

  static void logError(String context, dynamic error, [StackTrace? stackTrace]) {
    _logger.severe('Error in $context:', error, stackTrace);
  }
}

class ServiceException {
  final String message;
  final String operation;

  ServiceException(this.message, this.operation);

  @override
  String toString() => '$message in $operation';
}