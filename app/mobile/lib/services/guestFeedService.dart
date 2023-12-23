import 'dart:convert';
import 'dart:ui';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/comment.dart';
import 'package:mobile_app/services/apiService.dart';

import '../view/pollViewHomePage/pollViewHomePage.dart';
import 'annotationService.dart';

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
      List<String> pollids = [];
      for (var poll in postsJson) {
        pollids.add(poll['id']);
      }
      String pollIds = pollids.join(',');
      const String getAnnotationsEndpoint = 'http://34.105.66.254:1938/annotation';
      Map<String, List<Map<String, dynamic>>> groupedAnnotations = {};
      try {
        Response annotationsResponse = await AnnotationService.dio.get(
          getAnnotationsEndpoint,
          queryParameters: {
            'pollIds': pollIds,
          },
        );
        if (annotationsResponse.statusCode == 200) {
          Map<String, dynamic> jsonMap = annotationsResponse.data;

          // Access the "annotations" key in the map
          List<dynamic> annotations = jsonMap['annotations'];

          // Group annotations by target source


          // Map each annotation to a Dart object and group by source
          for (var annotation in annotations) {
            String source = annotation['target']['source'];
            if (!groupedAnnotations.containsKey(source)) {
              groupedAnnotations[source] = [];
            }
            groupedAnnotations[source]!.add({
              'body': annotation['body'],
              'start': annotation['target']['selector']['start'],
              'end': annotation['target']['selector']['end'],
            });
          }
        }
      } catch (e) {
        print(e);
      }
      List<PollViewHomePage> posts = [];
      for (var post in postsJson) {
        String pollId = "http://34.105.66.254:1923/${post['id']}";
        List<Map<String, dynamic>> annotations = groupedAnnotations[pollId] ?? [];
        List<List<int>> indices = annotations.map<List<int>>((e) => [e['start'], e['end']]).toList();
        List<String> bodies = annotations.map<String>((e) => e['body']['value']).toList();
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
          voteCount: post['vote_count'],
          postOptions: optionsJson,
          likeCount: post['likeCount'],
          commentCount: post['commentCount'],
          dateTime: post['creation_date'],
          isSettled: post['is_settled'],
          approvedStatus: post['approveStatus'],
          didLike: post['didLike'], // You might want to format the date
          chosenVoteIndex: -1, //it will be post['chosenVoteIndex']
          annotationIndices: indices,
          annotationTexts: bodies,
        ));
      }
      print(posts);
      return posts;
    } catch (e) {
      rethrow;
    }
  }
}
