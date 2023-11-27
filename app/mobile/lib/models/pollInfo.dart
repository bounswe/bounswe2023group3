import 'package:flutter/material.dart';
import 'package:mobile_app/models/comment.dart';
import 'package:mobile_app/services/pollCommentService.dart';

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
  List<CommentData> _comments;
  bool _commentsAreFetched;

  final List<String> optionIds;
  final List<String> options;

  final DateTime dueDate;
  final DateTime creationDate;

  final bool approvedStatus;
  final int isSettled;

  Future<List<CommentData>> get comments async {
    if (!_commentsAreFetched) {
      _comments = await PollCommentService.getComments("pollId");
      // TODO I am not sure if all comments are going to be returned or a subset
      // of them. so assumed the initialy set commentCount is always stay same
      // for the entire life time of this objcet.
      // commentCount = _comments.length;
      _commentsAreFetched = true;
    }
    return _comments;
  }

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
    required this.approvedStatus,
    required this.isSettled,
    required this.pollId,
    required this.optionIds,
    required this.tagIds,
  })  : _comments = [],
        _commentsAreFetched = false;

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
        tagColorList.add(Colors.blue);
      }
    }
    List<dynamic> options = json['options'];
    List<dynamic> tags = json['tags'];

    return PollInfo.withoutComments(
      pollId: json['id'],
      userName: json['creator']['username'],
      userUsername: json['creator']['username'],
      profilePictureUrl: json['creator']['profile_picture_url'] ?? '',
      postTitle: json['question'],
      tags: tags.map((e) => e['name'] as String).toList(),
      tagIds: tags.map((e) => e['id'] as String).toList(),
      tagColors: tagColorList,
      voteCount: json['vote_count'],
      options: options.map((e) => e['answer'] as String).toList(),
      optionIds: options.map((e) => e['id'] as String).toList(),

      likeCount: json['likeCount'] ?? 0,
      dueDate: DateTime.parse(json['due_date']),
      creationDate: DateTime.parse(json['creation_date']),
      // comments: (json['comments'] as List)
      //     .map((i) => CommentData.fromJson(i))
      //     .toList(),
      commentCount: json['commentCount'] ?? 0,
      approvedStatus: json['approveStatus'] ?? false,
      isSettled: json['is_settled'] ?? 0,
    );
  }
}
