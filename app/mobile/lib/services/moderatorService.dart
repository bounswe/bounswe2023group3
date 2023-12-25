import 'dart:ui';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/view/constants.dart';

import '../view/moderatorHomePage/requestViewHome.dart';
import '../view/moderatorHomePage/settleViewHome.dart';

class ModeratorService {
  static Future<List<RequestViewHome>> getPollRequests() async {
    const String getPollsEndpoint = '/moderator/polls';
    try {
      final Response response = await ApiService.dio.get(
        getPollsEndpoint,
      );
      final List<dynamic> postsJson = response.data;
      List<RequestViewHome> posts = [];
      for (var post in postsJson) {
        final creator = post['creator'];
        final List<dynamic> tagsJson = post['tags'];

        List<String> tagsList = [];
        List<Color> tagColorsList = [];

        for (var tag in tagsJson) {
          tagsList.add(tag['name']);
          tagColorsList.add(pink);
        }

        List<String> optionsList = [];
        for (var option in post['options']) {
          optionsList.add(option['answer']);
        }

        posts.add(RequestViewHome(
          userName: creator['firstname'] != null || creator['lastname'] != null
              ? ((creator['firstname'] ?? "") +
                  " " +
                  (creator["lastname"] ?? ""))
              : creator['username'],
          userUsername: creator['username'],
          profilePictureUrl: creator['profile_picture'] ?? "",
          postTitle: post['question'],
          tags: tagsList,
          tagColors: tagColorsList,
          dateTime: post['creation_date'],
          pollId: post['id'], // You might want to format the date
          options: optionsList,
          dueDate: post['due_date'],
        ));
      }
      return posts;
    } catch (e) {
      rethrow;
    }
  }

  static Future<List<SettleViewHome>> getSettleRequests() async {
    const String getPollsEndpoint = '/moderator/polls/query';
    try {
      final Response response = await ApiService.dio.get(
        getPollsEndpoint,
        queryParameters: {
          "is_settled": 1,
        },
      );
      final List<dynamic> postsJson = response.data;
      List<SettleViewHome> posts = [];
      for (var post in postsJson) {
        final creator = post['creator'];
        final List<dynamic> tagsJson = post['tags'];

        List<String> tagsList = [];
        List<Color> tagColorsList = [];

        for (var tag in tagsJson) {
          tagsList.add(tag['name']);
          tagColorsList.add(pink);
        }

        List<String> optionsList = [];
        for (var option in post['options']) {
          optionsList.add(option['answer']);
        }

        posts.add(SettleViewHome(
          userName: creator['firstname'] != null || creator['lastname'] != null
              ? ((creator['firstname'] ?? "") +
                  " " +
                  (creator["lastname"] ?? ""))
              : creator['username'],
          userUsername: creator['username'],
          profilePictureUrl: creator['profile_picture'] ?? "",
          postTitle: post['question'],
          tags: tagsList,
          tagColors: tagColorsList,
          dateTime: post['creation_date'],
          pollId: post['id'], // You might want to format the date
          options: optionsList,
          dueDate: post['due_date'],
          outcome: post['outcome'] ?? "",
          outcomeSource: post['outcome_source'] ?? "",
        ));
      }
      return posts;
    } catch (e) {
      rethrow;
    }
  }
}
