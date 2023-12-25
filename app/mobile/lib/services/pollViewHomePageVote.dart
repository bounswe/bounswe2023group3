import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class PollViewHomePageVote{
  Future<bool> vote(String optionID) async {
    final String voteEndPoint = '/vote';

    try {

      final Response response = await ApiService.dio.post(
        voteEndPoint,
        data: {
          'option_id': optionID,
        },
      );
      print(response.statusCode);

      if (response.statusCode == 201 || response.statusCode == 200) {
        return true; // vote successful
      }
      else if(response.statusCode == 409){
        return false; // vote unsuccessful
      }
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
    return false;
  }

}
