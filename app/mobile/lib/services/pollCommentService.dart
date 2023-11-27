import 'package:dio/dio.dart';
import 'package:mobile_app/models/comment.dart';
import 'package:mobile_app/services/apiService.dart';

class PollCommentService {
  static Future<List<CommentData>> getComments(String id) async {
    try {
      Response commentsResponse = await ApiService.dio.get('/comment/$id');
      List<dynamic> comments = commentsResponse.data;
      List<CommentData> commentsToRender =
          comments.map((e) => CommentData.fromJson(e)).toList();
      return commentsToRender;
    } catch (e) {
      print("PollCommentService.getComments(): ${e.toString()}");
      return [];
    }
  }
}
