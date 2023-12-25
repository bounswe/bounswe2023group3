import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class VoteDistributionService{

  Future<Map<String,int>> getVoteDistribution(String pollId) async {
    String applicationEndpoint =
        '/poll/$pollId'; //if you change this, change the endpoint in the backend too



    final Map<String, dynamic> data = {
    };



    try {
      final Response response = await ApiService.dio.get(
        applicationEndpoint,
        data: data,
      );
      Map<String, dynamic> poll = response.data;
      print(response.data);
      final List<dynamic> votesJson = poll['voteDistribution'] ?? [];
      Map<String,int> voteCountDistributions = {};

      if(votesJson!=[]) {
        for (var vote in votesJson) {
          voteCountDistributions[vote["optionId"]] = int.parse(vote["count"]);
        }
      }

      return voteCountDistributions;
    } catch (e) {
      rethrow;
    }
  }

}
