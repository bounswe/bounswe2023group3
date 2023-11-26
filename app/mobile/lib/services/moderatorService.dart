import 'dart:ui';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/services/apiService.dart';

import '../view/moderatorHomePage/requestViewHome.dart';


class ModeratorService {


  static Future<List<RequestViewHome>> getPollRequests() async {
    const String getPollsEndpoint = '/poll';
    print("bbb");
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

        posts.add(RequestViewHome(
          userName: creator['username'],
          userUsername: creator['username'],
          profilePictureUrl: "", // Replace with the actual key
          postTitle: post['question'],
          tags: tagsList,
          tagColors: tagColorsList,
          dateTime: post['creation_date'], // You might want to format the date
        ));
      }
      return posts;
    } catch (e) {
      rethrow;
    }

  }
}