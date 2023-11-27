import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class PollViewHomePageLike{
  void like(String pollId) async {
    final String likeEndpoint = '/like/$pollId';

    try {
      final Response response = await ApiService.dio.post(
        likeEndpoint,
      );
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
  }
}
