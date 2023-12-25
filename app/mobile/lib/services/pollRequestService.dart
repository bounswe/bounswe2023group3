import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/models/pollCreationData.dart';
import 'annotationService.dart';
import 'package:mobile_app/models/annotation.dart';

class PollRequestService {
  static List<String> allTags = [];
  static bool allTagsLoaded = false;

  static Future<void> reloadAllTags() async {
    const String tagEndPoint = '/tag';
    try {
      final Response response = await ApiService.dio.get(tagEndPoint);
      final List<dynamic> tags = response.data;
      allTags = tags.map((tag) => tag['name'].toString()).toList();
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
    // dont touch the boolean, just reload all tags asynchrnously
  }

  /// Get a list of possible completions for the tag field of the poll
  static Future<List<String>> getPossibleCompletions(String prefix) async {
    if (allTagsLoaded) {
      reloadAllTags();
    } else {
      await reloadAllTags();
      allTagsLoaded = true;
    }
    return allTags
        .where((tag) => tag.toLowerCase().startsWith(prefix.toLowerCase()))
        .toList();
  }

  static Future<Response> createPoll(PollCreationData pollData) async {
    const String createPollEndpoint =
        '/poll'; // This will be the actual endpoint

    // Convert the dueDate to a string format that the API expects
    String dueDateString = pollData.dueDate.toIso8601String();
    // Prepare the data to send to the API
    final Map<String, dynamic> data = {
      'question': pollData.question,
      'description': pollData.question,
      'options': pollData.options,
      'image_urls': pollData.imageURLs,
      'tags': pollData.tags,
      'due_date': dueDateString,
    };

    try {
      final Response response = await ApiService.dio.post(
        createPollEndpoint,
        data: data,
      );
      print(response.data);
      String creator_id = response.data['creator']['id'];
      String poll_id = response.data['id'];
      List<Annotation> annotations = pollData.annotations;
      const String annotationEndpoint = 'http://34.105.66.254:1938/annotation';
      for (Annotation annotation in annotations) {
        final Map<String, dynamic> data = {
          "body": {
            "type": "TextualBody",
            "value": annotation.body,
            "format": "text/plain"
          },
          "target": {
            "source": "http://34.105.66.254:1923/$poll_id",
            "selector": {
              "end": annotation.indices[1] == 0 ? 1 : annotation.indices[1],
              "type": "TextPositionSelector",
              "start": annotation.indices[0] == 0 ? 1 : annotation.indices[0]
            }
          },
          "creator": creator_id
        };

        try {
          final Response response =
              await Dio().post(annotationEndpoint, data: data);
          if (response.statusCode == 201) {
            // Handle success
            print('Annotation posted successfully!');
          } else {
            // Handle other status codes
            print(
                'Failed to post annotation. Status code: ${response.statusCode}');
          }
        } catch (e) {
          // Handle exceptions
          print('Error posting annotation: $e');
        }
      }
      return response;
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
  }
}
