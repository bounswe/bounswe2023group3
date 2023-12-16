import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/pollView/tagWidget.dart';
import 'package:mobile_app/view/pollView/userInformationWidget.dart';
import 'package:intl/intl.dart';

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
    required this.dueDate, required this.outcome, required this.outcomeSource,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
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
                  DateTimeWidget(dateTime: DateTime.parse(dateTime)),
                ],
              ),
            ]
        ),
      ),
    );
  }

}


class TagListWidget extends StatelessWidget {
  final List<String> tags;
  final List<Color> tagColors;

  const TagListWidget({super.key, required this.tags, required this.tagColors});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          for (int i = 0; i < tags.length; i++)
            Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4.0),
                child: TagWidget(tagText: tags[i], tagColor: tagColors[i])),
        ],
      ),
    );
  }
}

class DateTimeWidget extends StatelessWidget {
  final DateTime dateTime;

  const DateTimeWidget({Key? key, required this.dateTime}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    String formattedDateTime = DateFormat.yMMMMd('en_US').add_jm().format(dateTime);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 25.0),
      child: Row(
        children: [
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20.0),
              border: Border.all(color: Colors.pink),
              color: Colors.pink,
            ),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                formattedDateTime,
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
          ),
        ],
      ),
    );
  }
}