import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/pollInfo.dart';
import 'package:mobile_app/models/profileInfo.dart';
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/services/profilePagePollsService.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/pollView/pollView.dart';
import 'package:mobile_app/view/pollViewHomePage/pollViewHomePage.dart';
import 'package:mobile_app/view/profilePage/userInfoSection.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart';

enum ProfilePagePollType { Created, Liked, Voted }

class ProfilePage extends StatefulWidget {
  final String userId;
  const ProfilePage({Key? key, required this.userId}) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  List<PollInfo> viewedPolls = [];
  ProfileInfo? profileInfo;
  List<PollInfo> likedPolls = [];
  List<PollInfo> votedPolls = [];
  bool isLoadingPolls = false;
  bool isLoadingProfile = false;
  ProfilePagePollType activeCategory = ProfilePagePollType.Created;

  _fetchUserData() async {
    isLoadingProfile = true;

    Response response = await ApiService.dio.get('/user/${widget.userId}');
    if (response.statusCode == 200) {
      var userData = response.data;
      profileInfo = ProfileInfo.fromJson(userData);
    }
    _loadPolls(activeCategory); // to make sure viewed poll list is updated
    // after user id is fetched.
  }

  @override
  void initState() {
    super.initState();
    _fetchUserData();
    _loadPolls(ProfilePagePollType.Created); // Load 'Created' polls initially
  }

  Future<void> _loadPolls(ProfilePagePollType category) async {
    setState(() {
      isLoadingPolls = true;
      activeCategory = category;
    });

    // Set the state to display the fetched polls

    switch (category) {
      case ProfilePagePollType.Created:
        viewedPolls = profileInfo == null ? [] : profileInfo!.createdPolls;
        break;
      case ProfilePagePollType.Liked:
        likedPolls = viewedPolls = likedPolls.isEmpty
            ? await ProfilePagePollsService.getLikedPolls(widget.userId)
            : likedPolls;
        break;
      case ProfilePagePollType.Voted:
        votedPolls = viewedPolls = votedPolls.isEmpty
            ? await ProfilePagePollsService.getVotedPolls(widget.userId)
            : votedPolls;
        break;
      default:
        viewedPolls = [];
    }
    setState(() {});
    isLoadingPolls = false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
      ),
      drawer: const Sidebar(), // Use the custom drawer widget

      body: CustomScrollView(
        slivers: <Widget>[
          SliverToBoxAdapter(
            child: profileInfo == null
                ? const CircularProgressIndicator()
                : UserInfoSection(profileInfo: profileInfo!),
          ),
          SliverToBoxAdapter(
            child: Container(
              color:
                  lightBlue, // Set the background color same as your app theme
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: ProfilePagePollType.values.map((type) {
                        bool isActive = activeCategory == type;
                        return InkWell(
                          onTap: () => _loadPolls(type),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                type.name,
                                style: TextStyle(
                                  color: isActive ? navy : gray,
                                  fontSize: 18, // Bigger text
                                ),
                              ),
                              const SizedBox(height: 8),
                              isActive
                                  ? Container(
                                      height: 2,
                                      width: 40, // Width of the underline
                                      color: navy, // Active underline color
                                    )
                                  : const SizedBox(height: 2),
                            ],
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                  Container(
                    height: 1,
                    color: gray, // Color for the horizontal line
                  ),
                ],
              ),
            ),
          ),
          if (isLoadingPolls)
            const SliverFillRemaining(
              child: Center(child: CircularProgressIndicator()),
            )
          else
            SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final post = viewedPolls[index];
                  return SizedBox(
                    child: GestureDetector(
                      onTap: () => tapOnPoll(context, post),
                      child: SizedBox(
                        height: calculatePostHeight(post),
                        child: PollViewHomePage(
                            userName: post.userName,
                            userUsername: post.userUsername,
                            profilePictureUrl: post.profilePictureUrl,
                            postTitle: post.postTitle,
                            tags: post.tags,
                            tagColors: post.tagColors,
                            voteCount: post.voteCount,
                            postOptions: post.postOptions,
                            likeCount: post.likeCount,
                            dateTime: post.dateTime.toString(),
                            comments: post.comments),
                      ),
                    ),
                  );
                },
                childCount: viewedPolls.length,
              ),
            ),
        ],
      ),
    );
  }

  void tapOnPoll(BuildContext context, PollInfo poll) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => PollPage(
            userName: poll.userName,
            userUsername: poll.userUsername,
            profilePictureUrl: poll.profilePictureUrl,
            postTitle: poll.postTitle,
            tags: poll.tags,
            tagColors: poll.tagColors,
            voteCount: poll.voteCount,
            postOptions: poll.postOptions,
            likeCount: poll.likeCount,
            dateTime: poll.dateTime.toString(),
            comments: poll.comments),
      ),
    );
  }

  double calculatePostHeight(PollInfo post) {
    double height = 0;

    // Add the heights of various components within PollViewHomePage
    height += 150;
    height +=
        post.postOptions.length * 65; // Assuming a fixed height for each option
    height += 100; // Adjust as needed for padding or spacing
    height += 50; // Adjust as needed for the Like button
    height += 50; // Adjust as needed for the Row with LikeCount and DateTime
    height += 30; // Adjust as needed for padding or spacing
    height += 16; // Adjust as needed for the 'Comments' text

    return height;
  }
}
