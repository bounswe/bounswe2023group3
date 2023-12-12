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

  Future<Response> settlePoll(bool decision, String feedback, String id) async {
    String pollSettleEndpoint = '/poll/settle/$id';
    try {
      final Response response = await ApiService.dio.post(
        pollSettleEndpoint,
        data: {
          'decision': decision,
          'settle_poll_request_feedback': feedback,
        },
      );

      return response;
    } catch (e) {
      rethrow;
    }
    }


}
