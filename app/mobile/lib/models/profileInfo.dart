import 'package:mobile_app/models/pollInfo.dart';
import 'package:mobile_app/view/state.dart';

class ProfileInfo {
  String id;
  String profilePictureUrl;
  String username;
  int followingCount;
  int followersCount;
  bool isFollowingVisible;
  bool isFollowersVisible;
  List<PollInfo> createdPolls = [];
  bool isCreatedPollsVisible;
  bool isLikedPollsVisible;
  bool isVotedPollsVisible;
  List<String> ranks = [];
  List<String> badges = [];
  bool isLoggedInUser = false;

  ProfileInfo({
    required this.id,
    required this.profilePictureUrl,
    required this.username,
    required this.followingCount,
    required this.followersCount,
    this.isFollowingVisible = false,
    this.isFollowersVisible = false,
    this.createdPolls = const [],
    this.isCreatedPollsVisible = false,
    this.isLikedPollsVisible = false,
    this.isVotedPollsVisible = false,
    this.ranks = const [],
    this.badges = const [],
    this.isLoggedInUser = false,
  });

  factory ProfileInfo.fromJson(Map<String, dynamic> json) {
    return ProfileInfo(
      id: json['id'],
      profilePictureUrl: json['profilePictureUrl'] ?? '',
      username: json['username'],
      followingCount: json['followingCount'] ?? 0,
      followersCount: json['followersCount'] ?? 0,
      isFollowingVisible: json['isFollowingVisible'] ?? false,
      isFollowersVisible: json['isFollowersVisible'] ?? false,
      // Assuming these are lists of PollInfo JSON objects
      createdPolls: ((json['polls'] ?? []) as List)
          .map((i) => PollInfo.fromJson(i))
          .toList(),
      /*
      likedPolls: (json['likedPolls'] as List)
          .map((i) => PollInfo.fromJson(i))
          .toList(),
      votedPolls: (json['votedPolls'] as List)
          .map((i) => PollInfo.fromJson(i))
          .toList(),
      */
      isCreatedPollsVisible: json['isCreatedPollsVisible'] ?? false,
      isLikedPollsVisible: json['isLikedPollsVisible'] ?? false,
      isVotedPollsVisible: json['isVotedPollsVisible'] ?? false,
      ranks: List<String>.from(json['ranks'] ?? []),
      badges: List<String>.from(json['badges'] ?? []),
      isLoggedInUser: json['id'] == AppState.loggedInUserId,
    );
  }
}
