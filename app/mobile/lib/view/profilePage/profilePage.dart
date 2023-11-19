import 'package:flutter/material.dart';
import 'package:mobile_app/services/profilePagePollsService.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/pollView/pollView.dart';
import 'package:mobile_app/view/pollViewHomePage/pollViewHomePage.dart';
import 'package:mobile_app/view/profilePage/userInfoSection.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart';

enum ProfilePagePollType { Created, Liked, Voted }

class ProfilePage extends StatefulWidget {
  final String profilePictureUrl;
  final String username;
  final String nickname;

  const ProfilePage({
    Key? key,
    required this.profilePictureUrl,
    required this.username,
    required this.nickname,
  }) : super(key: key);

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  List<PollViewHomePage> polls = [];
  bool isLoading = false;
  ProfilePagePollType activeCategory = ProfilePagePollType.Created;

  @override
  void initState() {
    super.initState();
    _loadPolls(ProfilePagePollType.Created); // Load 'Created' polls initially
  }

  Future<void> _loadPolls(ProfilePagePollType category) async {
    setState(() {
      isLoading = true;
      activeCategory = category;
    });

    // Simulate a network call to fetch polls based on the category
    await Future.delayed(const Duration(seconds: 1));

    // Set the state to display the fetched polls
    setState(() {
      switch (category) {
        case ProfilePagePollType.Created:
          polls = ProfilePagePollsService.getCreatedPolls(widget.username);
          break;
        case ProfilePagePollType.Liked:
          polls = ProfilePagePollsService.getLikedPolls(widget.username);
          break;
        case ProfilePagePollType.Voted:
          polls = ProfilePagePollsService.getVotedPolls(widget.username);
          break;
        default:
          polls = [];
      }
      isLoading = false;
    });
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
            child: UserInfoSection(
              profilePictureUrl: widget.profilePictureUrl,
              username: widget.username,
              nickname: widget.nickname,
            ),
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
          if (isLoading)
            const SliverFillRemaining(
              child: Center(child: CircularProgressIndicator()),
            )
          else
            SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final post = polls[index];
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
                            dateTime: post.dateTime,
                            comments: post.comments),
                      ),
                    ),
                  );
                },
                childCount: polls.length,
              ),
            ),
        ],
      ),
    );
  }

  void tapOnPoll(BuildContext context, PollViewHomePage poll) {
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
            dateTime: poll.dateTime,
            comments: poll.comments),
      ),
    );
  }

  double calculatePostHeight(PollViewHomePage post) {
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
