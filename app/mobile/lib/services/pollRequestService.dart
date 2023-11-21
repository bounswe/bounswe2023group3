import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/view/pollRequest/pollCreationData.dart';

class PollRequestService {
  static Future<Response> createPoll(PollCreationData pollData) async {
    const String createPollEndpoint =
        '/poll'; // This will be the actual endpoint

    // Convert the dueDate to a string format that the API expects
    String dueDateString = pollData.dueDate.toIso8601String();

    // Prepare the data to send to the API
    final Map<String, dynamic> data = {
      'creator_id': pollData.creatorId,
      'pol_title': pollData.pollTitle,
      'question': pollData.pollTitle,
      'poll_description': pollData.pollDescription,
      'options': pollData.options,
      'imageURLs': pollData.imageURLs,
      'tags': pollData.tags,
      'due_date': dueDateString,
    };

    try {
      final Response response = await ApiService.dio.post(
        createPollEndpoint,
        data: data,
      );
      return response;
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
  }
}
