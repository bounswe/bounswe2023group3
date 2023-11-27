import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class ModeratorPollDecision {

  Future<Response> answerPoll(bool isApproved, String id) async {
    String pollAnswerEndpoint =
        '/moderator/approve/$id';



    final Map<String, bool> data = {
      'approveStatus': isApproved,
    };



    try {
      final Response response = await ApiService.dio.post(
        pollAnswerEndpoint,
        data: data
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
