import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class ModeratorPollDecision {

  Future<Response> answerPoll(bool isApproved) async {
    const String pollAnswerEndpoint =
        '/moderator/pollApprove';




    try {
      final Response response = await ApiService.dio.post(
        pollAnswerEndpoint,
        data: {'approve': isApproved,
          },
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
