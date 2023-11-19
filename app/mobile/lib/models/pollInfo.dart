import 'dart:ui';

import 'package:mobile_app/models/comment.dart';

class PollInfo {
  final String userName;
  final String userUsername;
  final String profilePictureUrl;
  final String postTitle;
  final List<String> tags;
  final List<Color>
      tagColors; // This will depend on how you define Color in your code
  final int voteCount;
  final List<String> postOptions;
  final int likeCount;
  final DateTime dateTime;
  final List<CommentData> comments;

  PollInfo({
    required this.userName,
    required this.userUsername,
    required this.profilePictureUrl,
    required this.postTitle,
    required this.tags,
    required this.tagColors,
    required this.voteCount,
    required this.postOptions,
    required this.likeCount,
    required this.dateTime,
    required this.comments,
  });

  factory PollInfo.fromJson(Map<String, dynamic> json) {
    var tagColorList = <Color>[];
    if (json['tagColors'] != null) {
      // Assuming each tag color is a string in the format "#RRGGBB"
      tagColorList = json['tagColors'].map<Color>((colorStr) {
        return Color(int.parse(colorStr.replaceFirst('#', '0xff')));
      }).toList();
    }

    return PollInfo(
      userName: json['userName'],
      userUsername: json['userUsername'],
      profilePictureUrl: json['profilePictureUrl'] ?? '',
      postTitle: json['postTitle'],
      tags: List<String>.from(json['tags']),
      tagColors: tagColorList,
      voteCount: json['voteCount'],
      postOptions: List<String>.from(json['postOptions']),
      likeCount: json['likeCount'],
      dateTime: DateTime.parse(json['dateTime']),
      comments: (json['comments'] as List)
          .map((i) => CommentData.fromJson(i))
          .toList(),
    );
  }
}
