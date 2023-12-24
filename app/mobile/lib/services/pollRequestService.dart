import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/models/pollCreationData.dart';

class PollRequestService {
  static Future<Response> createPoll(PollCreationData pollData) async {
    const String createPollEndpoint =
        '/poll'; // This will be the actual endpoint

    // Convert the dueDate to a string format that the API expects
    String dueDateString = pollData.dueDate.toIso8601String();
    String imageUrlsString = pollData.imageURLs.toString();
    // Prepare the data to send to the API
    final Map<String, dynamic> data = {
      'question': pollData.question,
      'options': pollData.options,
      'image_urls': imageUrlsString,
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
