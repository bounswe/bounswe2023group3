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
    this.isFollowingVisible = false,
    this.isFollowersVisible = false,
    this.isCreatedPollsVisible = false,
    this.isLikedPollsVisible = false,
    this.isVotedPollsVisible = false,
    this.ranks = const [],
    this.badges = const [],
    this.isLoggedInUser = false,
  });

  factory ProfileInfo.fromJson(Map<String, dynamic> json) {
    var testPPicture =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXLfPCb2ltrAdwEV"
        "LhU048H3s_pJuN27Ts8A";
    return ProfileInfo(
      id: json['id'],
      profilePictureUrl: json['profilePictureUrl'] ?? testPPicture,
      username: json['username'],
      followingCount: json['followingCount'] ?? 0,
      followersCount: json['followersCount'] ?? 0,
      isFollowingVisible: json['isFollowingVisible'] ?? false,
      isFollowersVisible: json['isFollowersVisible'] ?? false,
      isCreatedPollsVisible:
          json['isCreatedPollsVisible'] ?? AppState.random.nextBool(),
      isLikedPollsVisible:
          json['isLikedPollsVisible'] ?? AppState.random.nextBool(),
      isVotedPollsVisible:
          json['isVotedPollsVisible'] ?? AppState.random.nextBool(),
      ranks: List<String>.from(json['ranks'] ?? []),
      badges: List<String>.from(json['badges'] ?? []),
      isLoggedInUser: json['id'] == AppState.loggedInUserId,
    );
  }
}
