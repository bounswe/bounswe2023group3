import 'dart:ui';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/services/apiService.dart';

import '../view/moderatorHomePage/requestViewHome.dart';


class ModeratorService {


  static Future<List<RequestViewHome>> getPollRequests() async {
    const String getPollsEndpoint = '/poll';
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
          tagColorsList.add(Colors.blue); // You might want to generate colors dynamically
        }

        List<String> optionsList = [];
        for (var option in post['options']) {
          optionsList.add(option['answer']);
        }

        posts.add(RequestViewHome(
          userName: creator['username'],
          userUsername: creator['username'],
          profilePictureUrl: "", // Replace with the actual key
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
}