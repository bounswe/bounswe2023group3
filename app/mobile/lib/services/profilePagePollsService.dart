import 'package:dio/dio.dart';
import 'package:mobile_app/models/pollInfo.dart';
import 'package:mobile_app/services/apiService.dart';

class ProfilePagePollsService {
  static Future<List<PollInfo>> getLikedPolls(String userId) async {
    // TODO make filtering
    // TODO handle errors
    String pollsEndpoint = "/poll";
    Response response = await ApiService.dio.get(pollsEndpoint);
    var polls = List.from(response.data).map((e) => PollInfo.fromJson(e));
    return polls.toList();
  }

  static Future<List<PollInfo>> getVotedPolls(String userId) async {
    // TODO make filtering
    // TODO handle errors
    String pollsEndpoint = "/poll";
    Response response = await ApiService.dio.get(pollsEndpoint);
    var polls = List.from(response.data).map((e) => PollInfo.fromJson(e));
    return polls.toList();
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
      return polls;
    } catch (e) {
      // Handle error properly - you can throw an exception or return an empty list based on your app's needs
      print(e);
      return [];
    }
  }
}
