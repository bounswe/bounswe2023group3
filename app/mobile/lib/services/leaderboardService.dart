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
      final List<dynamic> rankingsJson = response.data;
      List<PersonData> rankings = [];
      for (var rank in rankingsJson) {
        final name = rank['name'];
        final ranking = rank['ranking'];
        rankings.add(PersonData(
          name: name,
          ranking: ranking,
        ));

      }
      return rankings;
    } catch (e) {
      rethrow;
    }

  }



}

