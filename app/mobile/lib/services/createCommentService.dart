import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class PostCommentService {
  Future<Response> postComment(String pollId, String commentBody) async {
    final String commentEndpoint = '/comment/$pollId';

    try {
      final Response response = await ApiService.dio.post(
        commentEndpoint,
        data: {
          'description': commentBody,
        },
      );
      return response;
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
  }

  static Future<bool> deleteComment(String commentId) async {
    final String commentEndpoint = '/comment/$commentId';

    try {
      final Response response = await ApiService.dio.delete(commentEndpoint);
      return response.statusCode == 200;
    } catch (e) {
      print('Error: $e');
      return false;
    }
  }
}
