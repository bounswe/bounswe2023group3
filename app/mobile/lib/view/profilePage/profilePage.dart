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
import 'package:mobile_app/view/state.dart';

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
  List<PollInfo> createdPolls = [];
  bool isLoadingPolls = false;
  bool isLoadingProfile = false;
  ProfilePagePollType activeCategory = ProfilePagePollType.Created;
  Map<ProfilePagePollType, bool> categoryLocked = {
    ProfilePagePollType.Created: true,
    ProfilePagePollType.Liked: true,
    ProfilePagePollType.Voted: true,
  };
  _fetchUserData() async {
    isLoadingProfile = true;
    setState(() {});
    print("fetch user data");
    Response response = await ApiService.dio.get('/user/${widget.userId}');
    if (response.statusCode == 200) {
      var userData = response.data;
      profileInfo = ProfileInfo.fromJson(userData);
    }
    isLoadingProfile = false;
    categoryLocked = {
      ProfilePagePollType.Created: !profileInfo!.isCreatedPollsVisible,
      ProfilePagePollType.Liked: !profileInfo!.isLikedPollsVisible,
      ProfilePagePollType.Voted: !profileInfo!.isVotedPollsVisible,
    };
    setState(() {});
    _loadPolls(activeCategory);
  }

  @override
  void initState() {
    super.initState();
    print("init state");
    _fetchUserData();
  }

  Future<void> _loadPolls(ProfilePagePollType category) async {
    isLoadingPolls = true;
    activeCategory = category;
    setState(() {});

    switch (category) {
      case ProfilePagePollType.Created:
        createdPolls = viewedPolls = createdPolls.isEmpty
            ? await ProfilePagePollsService.getCreatedPolls(widget.userId)
            : createdPolls;
        createdPolls = viewedPolls =
            createdPolls.where((element) => element.approvedStatus).toList();
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
    bool isOwnProfile = AppState.loggedInUserId == widget.userId;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
      ),
      drawer: const Sidebar(),
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
                          onTap: () =>
                              //  !isOwnProfile || isCategoryLocked
                              //     ? () {
                              //         activeCategory = type;
                              //       }
                              //     :
                              _loadPolls(type),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Row(
                                children: [
                                  categoryLocked[type]!
                                      ? Icon(
                                          Icons.lock_outline,
                                          color: isActive ? navy : gray,
                                        )
                                      : Container(),
                                  Text(
                                    type.name,
                                    style: TextStyle(
                                      color: isActive ? navy : gray,
                                      fontSize: 18, // Bigger text
                                    ),
                                  ),
                                ],
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
          // show poll list if possible
          if (isLoadingPolls || isLoadingProfile)
            const SliverFillRemaining(
              child: Center(
                child: CircularProgressIndicator(),
              ),
            )
          else if (isOwnProfile && viewedPolls.isNotEmpty)
            _viewPollList()
          else if (isOwnProfile)
            SliverToBoxAdapter(
              child: Center(
                child: Text("You don't have any ${activeCategory.name} poll"),
              ),
            )
          else if (categoryLocked[activeCategory]!)
            SliverToBoxAdapter(
              child: Center(
                child: Text("This user's ${activeCategory.name} polls are not"
                    " visible to others"),
              ),
            )
          else if (viewedPolls.isEmpty)
            SliverToBoxAdapter(
              child: Center(
                child: Text("This user doesn't have any ${activeCategory.name}"
                    " poll"),
              ),
            )
          else
            _viewPollList()
        ],
      ),
    );
  }

  Widget _viewPollList() {
    return SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          final post = viewedPolls[index];
          return SizedBox(
            child: GestureDetector(
              onTap: () => tapOnPoll(context, post),
              child: SizedBox(
                height: calculatePostHeight(post),
                child: PollViewHomePage(
                  pollId: post.pollId,
                  userName: post.userName,
                  userUsername: post.userUsername,
                  profilePictureUrl: post.profilePictureUrl,
                  postTitle: post.postTitle,
                  tags: post.tags,
                  tagColors: post.tagColors,
                  voteCount: post.voteCount,
                  postOptions: post.optionIdCouples,
                  likeCount: post.likeCount,
                  dateTime: post.dueDate.toString(),
                  isSettled: post.isSettled,
                  approvedStatus: post.approvedStatus,
                  didLike: false,
                  chosenVoteIndex: post.chosenVoteIndex,
                  commentCount: post.commentCount,
                ),
              ),
            ),
          );
        },
        childCount: viewedPolls.length,
      ),
    );
  }

  void tapOnPoll(BuildContext context, PollInfo poll) async {
    if (!mounted) return;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => PollPage(
          pollId: poll.pollId,
          userName: poll.userName,
          userUsername: poll.userUsername,
          profilePictureUrl: poll.profilePictureUrl,
          postTitle: poll.postTitle,
          tags: poll.tags,
          tagColors: poll.tagColors,
          voteCount: poll.voteCount,
          postOptions: poll.optionIdCouples,
          likeCount: poll.likeCount,
          dateTime: poll.dueDate.toString(),
          isSettled: poll.isSettled,
          chosenVoteIndex: poll.chosenVoteIndex,
        ),
      ),
    );
  }

  double calculatePostHeight(PollInfo post) {
    double height = 0;

    // Add the heights of various components within PollViewHomePage
    height += 150;
    height +=
        post.options.length * 65; // Assuming a fixed height for each option
    height += 100; // Adjust as needed for padding or spacing
    height += 50; // Adjust as needed for the Like button
    height += 50; // Adjust as needed for the Row with LikeCount and DateTime
    height += 30; // Adjust as needed for padding or spacing
    height += 16; // Adjust as needed for the 'Comments' text

    return height;
  }
}
