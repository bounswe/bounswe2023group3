import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class PollViewHomePageVote{
  Future<bool> vote(String optionID) async {
    final String voteEndPoint = '/vote/$optionID';

    try {
      final Response response = await ApiService.dio.post(
        voteEndPoint,
      );
      print(response.statusCode);

      if (response.statusCode == 201) {
        return true; // Like successful
      }
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
    return false;
  }

}
