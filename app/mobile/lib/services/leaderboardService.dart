import 'dart:ui';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/tag.dart';
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/services/tagsRequestService.dart';
import 'package:mobile_app/services/tuple2.dart';

import 'package:mobile_app/view/leaderboard/personData.dart';

import '../view/moderatorHomePage/settleViewHome.dart';


class LeaderboardService {


  static Future<List<PersonData>> getRankings(String tagId) async {
    try {
      final Response response = await ApiService.dio.get(
        '/ranking/$tagId',
      );
      final Map<String,dynamic> leaderboardJson = response.data;

      final rankingJson = leaderboardJson['ranking'];
      final currentUserTemp = leaderboardJson['currenUser'];
      final PersonData currentUser = new PersonData(username: currentUserTemp["user"]["username"], score: currentUserTemp["score"], userId: currentUserTemp["user"]["id"]);
      List<PersonData> rankingData = [];
      rankingData.add(currentUser);
      for (var ranking in rankingJson) {
        final username = ranking["user"]['username'];
        final userId = ranking["user"]['id'];
        final score = ranking["score"];
        rankingData.add(PersonData(
          username: username,
          score: score,
          userId: userId,
        ));

      }
      return rankingData;
    } catch (e) {
      rethrow;
    }

  }



}

