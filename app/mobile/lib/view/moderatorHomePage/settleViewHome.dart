import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/pollView/tagWidget.dart';
import 'package:mobile_app/view/pollView/userInformationWidget.dart';
import 'package:intl/intl.dart';

import '../helpers/dateTime.dart';
import '../helpers/tag.dart';

class SettleViewHome extends StatelessWidget {
  final String pollId;
  final String userName;
  final String userUsername;
  final String profilePictureUrl;
  final String postTitle;
  final List<String> tags;
  final List<Color> tagColors;
  final String dateTime;
  final List<String> options;
  final String dueDate;
  final String outcome;
  final String outcomeSource;
  final List<String> imageUrls;

  const SettleViewHome({
    super.key,
    required this.pollId,
    required this.userName,
    required this.userUsername,
    required this.profilePictureUrl,
    required this.postTitle,
    required this.tags,
    required this.tagColors,
    required this.dateTime,
    required this.options,
    required this.dueDate,
    required this.outcome,
    required this.outcomeSource,
    required this.imageUrls,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child:
            Column(crossAxisAlignment: CrossAxisAlignment.stretch, children: [
          UserInformationWidget(
            userName: userName,
            userUsername: userUsername,
            profilePictureUrl: profilePictureUrl,
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(postTitle,
                style: const TextStyle(
                    fontSize: 18.0, fontWeight: FontWeight.bold)),
          ),
          TagListWidget(tags: tags, tagColors: tagColors),
          Row(
            children: [
              DateTimeWidget(dateTime: DateTime.parse(dateTime), color: navy),
            ],
          ),
        ]),
      ),
    );
  }
}
