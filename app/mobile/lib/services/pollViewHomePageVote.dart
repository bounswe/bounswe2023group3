import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class PollViewHomePageLike{
  Future<bool> like(String pollId) async {
    final String likeEndpoint = '/like/$pollId';

    try {
      final Response response = await ApiService.dio.post(
        likeEndpoint,
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
  Future<bool> unlike(String pollId) async {
    final String likeEndpoint = '/like/$pollId';

    try {
      final Response response = await ApiService.dio.delete(
        likeEndpoint,
      );
      print(response.statusCode);
      if (response.statusCode == 200) {
        return true; // Like successful
      }
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
    return false;
  }
}
