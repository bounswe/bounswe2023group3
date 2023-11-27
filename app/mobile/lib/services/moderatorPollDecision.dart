import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/moderatorApiService.dart';

class ModeratorPollDecision {

  Future<Response> answerPoll(bool isApproved, String id) async {
    String pollAnswerEndpoint =
        '/moderator/approve/$id';



    final Map<String, bool> data = {
      'approveStatus': isApproved,
    };



    try {
      final Response response = await ModeratorApiService.dio.post(
        pollAnswerEndpoint,
        data: data
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
