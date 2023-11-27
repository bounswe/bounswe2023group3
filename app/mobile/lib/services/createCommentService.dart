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
}