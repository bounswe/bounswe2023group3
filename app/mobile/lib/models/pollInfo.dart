import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';

class PollInfo {
  final String pollId;

  final String userName;
  final String userUsername;
  final String profilePictureUrl;

  final String postTitle;

  final List<String> tagIds;
  final List<String> tags;
  final List<Color> tagColors;

  int voteCount;
  int likeCount;
  int commentCount;

  final List<String> optionIds;
  final List<String> options;
  final List<dynamic> optionIdCouples;
  final List<int> optionsVoteCount;

  final DateTime dueDate;
  final DateTime creationDate;

  final bool isPending;
  final bool approvedStatus;
  final int isSettled;
  final bool didlike;

  final int chosenVoteIndex;

  PollInfo.withoutComments({
    required this.userName,
    required this.userUsername,
    required this.profilePictureUrl,
    required this.postTitle,
    required this.tags,
    required this.tagColors,
    required this.voteCount,
    required this.options,
    required this.likeCount,
    required this.dueDate,
    required this.creationDate,
    required this.commentCount,
    required this.isPending,
    required this.approvedStatus,
    required this.isSettled,
    required this.didlike,
    required this.pollId,
    required this.optionIds,
    required this.optionIdCouples,
    required this.tagIds,
    required this.optionsVoteCount,
    required this.chosenVoteIndex,
  });

  static PollInfo fromJson(Map<String, dynamic> json) {
    var tagColorList = <Color>[];
    if (json['tagColors'] != null) {
      // Assuming each tag color is a string in the format "#RRGGBB"
      tagColorList = json['tagColors'].map<Color>((colorStr) {
        return Color(int.parse(colorStr.replaceFirst('#', '0xff')));
      }).toList();
    } else {
      int length = (json['tags'] as List).length;
      for (int ii = 0; ii < length; ii++) {
        tagColorList.add(pink);
      }
    }
    List<dynamic> options = json['options'];
    List<dynamic> tags = json['tags'];
    var creator = json['creator'];

    return PollInfo.withoutComments(
      optionIdCouples: options,
      pollId: json['id'],
      userName: creator['firstname'] != null || creator['lastname'] != null
          ? ((creator['firstname'] ?? "") + " " + (creator["lastname"] ?? ""))
          : creator['username'],
      userUsername: creator['username'],
      profilePictureUrl: creator['profile_picture'] ?? '',
      postTitle: json['question'],
      tags: tags.map((e) => e['name'] as String).toList(),
      tagIds: tags.map((e) => e['id'] as String).toList(),
      tagColors: tagColorList,
      voteCount: json['voteCount'],
      options: options.map((e) => e['answer'] as String).toList(),
      optionIds: options.map((e) => e['id'] as String).toList(),
      // TODO vote_count field'i kontrol edilecek
      optionsVoteCount:
          options.map((e) => (e['voteCount'] ?? 0) as int).toList(),
      likeCount: json['likeCount'] ?? 0,
      dueDate: DateTime.parse(json['due_date']),
      creationDate: DateTime.parse(json['creation_date']),
      // comments: (json['comments'] as List)
      //     .map((i) => CommentData.fromJson(i))
      //     .toList(),
      commentCount: json['commentCount'] ?? 0,
      isPending: json['approveStatus'] == null,
      approvedStatus: json['approveStatus'] ?? false,
      isSettled: json['is_settled'] ?? 0,
      didlike: json['didLike'],
      chosenVoteIndex: -1, //json['chosenVoteIndex']
    );
  }
}
