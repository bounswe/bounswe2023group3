import 'dart:convert';
import 'dart:ui';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/comment.dart';
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/view/constants.dart';

import '../view/pollViewHomePage/pollViewHomePage.dart';
import 'annotationService.dart';

class HomePageService {
  static Future<List<PollViewHomePage>> getPollRequests() async {
    const String getPollsEndpoint = '/poll/my-followings2';
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
      const String getAnnotationsEndpoint =
          'http://34.118.192.246:1938/annotation';
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
          groupedAnnotations.forEach((source, annotations) {
            annotations.sort((a, b) => a['start'].compareTo(b['start']));
          });
        }
      } catch (e) {
        print(e);
      }
      List<PollViewHomePage> posts = [];
      for (var post in postsJson) {
        List<String> imageUrls = post['image_urls'] != null
            ? (post['image_urls'] as List).map((e) => e as String).toList()
            : [];
        String pollId = "http://34.118.192.246:1923/${post['id']}";
        List<Map<String, dynamic>> annotations =
            groupedAnnotations[pollId] ?? [];
        List<List<int>> indices =
            annotations.map<List<int>>((e) => [e['start'], e['end']]).toList();
        List<String> bodies =
            annotations.map<String>((e) => e['body']['value']).toList();
        final creator = post['creator'];
        final List<dynamic> tagsJson = post['tags'];
        final List<dynamic> optionsJson = post['options'];

        //NEWLY ADDED

        final List<dynamic> votesJson = post['voteDistribution'] ?? [];
        Map<String,int> voteCountDistributions = {};

        if(votesJson!=[]) {
          for (var vote in votesJson) {
            voteCountDistributions[vote["optionId"]] = int.parse(vote["count"]);
          }
        }
        final myVotedOptionID = post['votedOption']?["id"] ?? "";

        List<String> tagsList = [];
        List<Color> tagColorsList = [];

        for (var tag in tagsJson) {
          tagsList.add(tag['name']);
          tagColorsList.add(pink);
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
          voteCount: post['voteCount'],
          postOptions: optionsJson,
          likeCount: post['likeCount'],
          commentCount: post['commentCount'],
          dateTime: post['creation_date'],
          isSettled: post['is_settled'],
          approvedStatus: post['approveStatus'],
          imageURLs: imageUrls,

          didLike:
              post['didLike'] ?? false, // You might want to format the date

          //NEWLY ADDED
          voteCountDistributions: voteCountDistributions,
          myVotedOptionId: myVotedOptionID,
          outcomeOptionId: post['outcome'] ?? "",

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
