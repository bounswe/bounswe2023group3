import 'package:mobile_app/models/pollInfo.dart';
import 'package:mobile_app/view/state.dart';

class ProfileInfo {
  String id;
  String profilePictureUrl;
  String username;
  String firstname;
  String lastname;
  int followingCount;
  int followersCount;
  bool isFollowingVisible;
  bool isFollowersVisible;
  bool isCreatedPollsVisible;
  bool isLikedPollsVisible;
  bool isVotedPollsVisible;
  List<String> ranks = [];
  List<String> badges = [];
  List<String> followingIds = [];
  List<String> followerIds = [];
  bool isLoggedInUser = false;

  ProfileInfo({
    required this.id,
    required this.profilePictureUrl,
    required this.username,
    required this.firstname,
    required this.lastname,
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
    this.followerIds = const [],
    this.followingIds = const [],
  });

  factory ProfileInfo.fromJson(Map<String, dynamic> json) {
    List<dynamic> followers = json['followers'];
    List<dynamic> followings = json['followings'];
    List<dynamic> badges = json['badges'];

    return ProfileInfo(
      id: json['id'],
      profilePictureUrl: json['profile_picture'] ?? '',
      username: json['username'],
      firstname: json['firstname'] ?? '',
      lastname: json['lastname'] ?? '',
      followingCount: json['followingCount'] ?? 0,
      followersCount: json['followersCount'] ?? 0,
      isFollowingVisible: json['isFollowingVisible'] ?? true,
      isFollowersVisible: json['isFollowersVisible'] ?? true,
      isCreatedPollsVisible: json['isCreatedPollsVisible'] ?? true,
      isLikedPollsVisible: json['isLikedPollsVisible'] ?? true,
      isVotedPollsVisible: json['isVotedPollsVisible'] ?? true,
      ranks: List<String>.from(json['ranks'] ?? []),
      badges: badges.map((e) => e['name'] as String).toList(),
      isLoggedInUser: json['id'] == AppState.loggedInUserId,
      followerIds: followers.map((e) => e['id'] as String).toList(),
      followingIds: followings.map((e) => e['id'] as String).toList(),
    );
  }

  ProfileInfo copy() {
    return ProfileInfo(
      id: id,
      profilePictureUrl: profilePictureUrl,
      username: username,
      firstname: firstname,
      lastname: lastname,
      followingCount: followingCount,
      followersCount: followersCount,
      isFollowingVisible: isFollowingVisible,
      isFollowersVisible: isFollowersVisible,
      isCreatedPollsVisible: isCreatedPollsVisible,
      isLikedPollsVisible: isLikedPollsVisible,
      isVotedPollsVisible: isVotedPollsVisible,
      ranks: List<String>.from(ranks),
      badges: List<String>.from(badges),
      followingIds: List<String>.from(followingIds),
      followerIds: List<String>.from(followerIds),
      isLoggedInUser: isLoggedInUser,
    );
  }
}
