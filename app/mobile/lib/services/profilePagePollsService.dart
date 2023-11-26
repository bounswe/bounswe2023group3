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
    await Future.delayed(const Duration(seconds: 1));
    return [];
  }
}
