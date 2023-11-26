import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class ModeratorPollDecision {

  Future<Response> answerPoll(bool isApproved, String id) async {
    String pollAnswerEndpoint =
        '/moderator/approve/$id';




    try {
      final Response response = await ApiService.dio.post(
        pollAnswerEndpoint,
        data: {'approveStatus': isApproved,
          },
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
