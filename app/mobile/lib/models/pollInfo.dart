import 'package:flutter/material.dart';
import 'package:mobile_app/models/annotation.dart';
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

  final List<String> imageUrls;

  final DateTime dueDate;
  final DateTime creationDate;

  final bool isPending;
  final bool approvedStatus;
  final int isSettled;
  final bool didlike;


  List<Annotation> annotations = [];

  final String myVotedOptionId;
  final String outcomeOptionId;
  final Map<String,int> voteCountDistributions;

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
    required this.voteCountDistributions,
    required this.myVotedOptionId,
    required this.outcomeOptionId,
    required this.imageUrls,
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



    //NEWLY ADDED
    final List<Map<String, dynamic>> votesJson = json['voteDistribution'] ?? [];
    Map<String,int> voteCountDistributions = {};

    if(votesJson!=[]) {
      for (var vote in votesJson) {
        voteCountDistributions[vote["optionId"]] = vote["count"];
      }
    }
    final myVotedOptionID = json['votedOption']?["id"] ?? "";

    var creator = json['creator'];
    List<String> imageUrls = json['image_urls'] != null
        ? (json['image_urls'] as List).map((e) => e as String).toList()
        : [];

    return PollInfo.withoutComments(
      imageUrls: imageUrls,
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
      voteCount: json['voteCount'] ?? 0,
      options: options.map((e) => e['answer'] as String).toList(),
      optionIds: options.map((e) => e['id'] as String).toList(),
      // TODO vote_count field'i kontrol edilecek

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
      didlike: json['didLike'] ?? false,
      voteCountDistributions: json['voteCountDistributions'] ?? {},
      myVotedOptionId: myVotedOptionID,
      outcomeOptionId: json['outcome'] ?? "",
      );
  }
}
