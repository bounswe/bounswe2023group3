import 'package:dio/dio.dart';
import 'package:mobile_app/models/annotation.dart';
import 'package:mobile_app/models/pollInfo.dart';
import 'package:mobile_app/services/apiService.dart';

class ProfilePagePollsService {
  static Future<Map<String, List<Annotation>>> getGroupedAnnotations(
      List<String> pollIds) async {
    const String getAnnotationsEndpoint =
        'http://34.29.3.88:1938/annotation';

    String pollIdsString = pollIds.join(',');
    Map<String, List<Annotation>> groupedAnnotations = {};

    try {
      Response annotationsResponse = await ApiService.dio.get(
        getAnnotationsEndpoint,
        queryParameters: {
          'pollIds': pollIdsString,
        },
      );
      if (annotationsResponse.statusCode == 200) {
        Map<String, dynamic> jsonMap = annotationsResponse.data;

        List<dynamic> annotations = jsonMap['annotations'];

        // Group annotations by target source

        // Map each annotation to a Dart object and group by source
        for (var annotation in annotations) {
          String source = annotation['target']['source'];
          if (!groupedAnnotations.containsKey(source)) {
            groupedAnnotations[source] = [];
          }
          groupedAnnotations[source]!.add(Annotation.fromJson(annotation));
        }

        groupedAnnotations.forEach((source, annotations) {
          annotations.sort((a, b) => a.indices[0].compareTo(b.indices[0]));
        });
      }
    } catch (e) {
      print(e);
    }

    return groupedAnnotations;
  }

  static Future<void> addAnnotationToPolls(List<PollInfo> polls) async {
    List<String> pollIds = polls.map((e) => e.pollId).toList();
    var groupedAnnotatinos = await getGroupedAnnotations(pollIds);

    polls.forEach((poll) {
      String dictKey = "http://34.105.66.254:1923/${poll.pollId}";
      poll.annotations = groupedAnnotatinos[dictKey] ?? [];
    });
    print(polls);
  }

  static Future<List<PollInfo>> getLikedPolls(String userId) async {
    // TODO handle errors
    String pollsEndpoint = "/poll?likedById=$userId";
    Response response = await ApiService.dio.get(pollsEndpoint);
    var polls = List.from(response.data).map((e) => PollInfo.fromJson(e));

    var pollsList = polls.toList();
    await addAnnotationToPolls(pollsList);
    return pollsList;
  }

  static Future<List<PollInfo>> getVotedPolls(String userId) async {
    // TODO make filtering
    // TODO handle errors
    String pollsEndpoint = "/poll?votedById=$userId";
    Response response = await ApiService.dio.get(pollsEndpoint);
    var polls = List.from(response.data).map((e) => PollInfo.fromJson(e));
    var pollsList = polls.toList();
    await addAnnotationToPolls(pollsList);
    // return polls.toList();
    return pollsList;
  }

  static Future<List<PollInfo>> getCreatedPolls(String userId) async {
    // Define endpoint with query parameters for creatorId
    String pollsEndpoint = "/poll?creatorId=$userId";
    try {
      // Perform the GET request with the userId as a query parameter
      Response response = await ApiService.dio.get(pollsEndpoint);
      // Map the response data to PollInfo objects
      var polls =
          List.from(response.data).map((e) => PollInfo.fromJson(e)).toList();
      await addAnnotationToPolls(polls);
      return polls;
    } catch (e) {
      // Handle error properly - you can throw an exception or return an empty list based on your app's needs
      print(e);
      return [];
    }
  }

  static Future<List<PollInfo>> getPendingPolls(String userId) async {
    String pollsEndpoint = "/poll/my-polls/pending";
    try {
      // Perform the GET request with the userId as a query parameter
      Response response = await ApiService.dio.get(pollsEndpoint);
      // Map the response data to PollInfo objects
      var polls = List.from(response.data).map((e) => PollInfo.fromJson(e));
      // .where((element) => element.isPending);

      var pollsList = polls.toList();
      // TODO
      await addAnnotationToPolls(
          pollsList); // do we need to add annotation for pending?
      // are we showing them?
      return pollsList;
    } catch (e) {
      print(e);
      return [];
    }
  }
}
