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
    this.isFollowingVisible = true,
    this.isFollowersVisible = true,
    this.isCreatedPollsVisible = true,
    this.isLikedPollsVisible = true,
    this.isVotedPollsVisible = true,
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
      isFollowingVisible: json['isFollowingVisible'] ?? true,
      isFollowersVisible: json['isFollowersVisible'] ?? true,
      isCreatedPollsVisible: json['isCreatedPollsVisible'] ?? true,
      isLikedPollsVisible: json['isLikedPollsVisible'] ?? true,
      isVotedPollsVisible: json['isVotedPollsVisible'] ?? true,
      ranks: List<String>.from(json['ranks'] ?? []),
      badges: List<String>.from(json['badges'] ?? []),
      isLoggedInUser: json['id'] == AppState.loggedInUserId,
    );
  }
}
