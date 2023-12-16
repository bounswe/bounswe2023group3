import 'dart:ui';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/comment.dart';
import 'package:mobile_app/services/apiService.dart';

import '../view/pollViewHomePage/pollViewHomePage.dart';

class HomePageService {
  static Future<List<PollViewHomePage>> getPollRequests() async {
    const String getPollsEndpoint = '/poll';
    print("bbb");
    try {
      final Response response = await ApiService.dio.get(
        getPollsEndpoint,
      );
      print(response.data);
      final List<dynamic> postsJson = response.data;
      List<PollViewHomePage> posts = [];
      for (var post in postsJson) {
        final creator = post['creator'];
        final List<dynamic> tagsJson = post['tags'];
        final List<dynamic> optionsJson = post['options'];

        List<String> tagsList = [];
        List<Color> tagColorsList = [];

        for (var tag in tagsJson) {
          tagsList.add(tag['name']);
          tagColorsList.add(
              Colors.blue); // You might want to generate colors dynamically
        }


        posts.add(PollViewHomePage(
          pollId: post['id'],
          userName: creator['username'],
          userUsername: creator['username'],
          profilePictureUrl: "", // Replace with the actual key
          postTitle: post['question'],
          tags: tagsList,
          tagColors: tagColorsList,
          voteCount: post['vote_count'],
          postOptions: optionsJson,
          likeCount: post['likeCount'],
          comments: const [],
          commentCount : post['commentCount'],
          dateTime: post['creation_date'],
          isSettled: post['is_settled'],
          approvedStatus: post['approveStatus'],
          didLike: post['didLike'],// You might want to format the date
          chosenVoteIndex: -1, //it will be post['chosenVoteIndex']

        ));

      }
      print(posts);
      return posts;
    } catch (e) {
      rethrow;
    }
  }
}
