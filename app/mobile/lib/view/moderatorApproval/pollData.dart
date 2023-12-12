import 'dart:ui';

class PollData {


  final String pollId;
  final String pollTitle;
  final List<String> options;
  final List<String> tags;
  final List<String> imageURLs;
  final String dueDate;
  final String userName;
  final String userUsername;
  final String profilePictureUrl;
  final List<Color> tagColors;
  final String creationDate; //dateTime
  final String outcome;
  final String outcomeSource;


  const PollData({
    required this.pollId,
    required this.pollTitle,
    required this.options,
    required this.tags,
    required this.imageURLs,
    required this.dueDate,
    required this.userName,
    required this.userUsername,
    required this.profilePictureUrl,
    required this.tagColors,
    required this.creationDate,
    required this.outcome,
    required this.outcomeSource,



  });
}
