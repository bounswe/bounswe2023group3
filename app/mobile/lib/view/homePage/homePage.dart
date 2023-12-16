import 'package:flutter/material.dart';
import 'package:mobile_app/models/comment.dart';
import 'package:mobile_app/services/homePageService.dart';
import 'package:mobile_app/services/pollCommentService.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart'; // Import your custom drawer widget
import 'package:mobile_app/view/pollViewHomePage/pollViewHomePage.dart';
import 'package:mobile_app/view/pollView/pollView.dart';

class HomePage extends StatefulWidget {
  HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void tapOnPoll(
      BuildContext context,
      pollId,
      userName,
      userUsername,
      profilePictureUrl,
      postTitle,
      tags,
      tagColors,
      voteCount,
      postOptions,
      likeCount,
      dateTime,
      isSettled,
      didLike,
      commentCount,
      chosenVoteIndex) async {
    var awaitedComments = await comments;
    if (!mounted) return;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => PollPage(
          pollId: pollId,
          userName: userName,
          userUsername: userUsername,
          profilePictureUrl: profilePictureUrl,
          postTitle: postTitle,
          tags: tags,
          tagColors: tagColors,
          voteCount: voteCount,
          postOptions: postOptions,
          likeCount: likeCount,
          dateTime: dateTime,
          isSettled: isSettled,
          chosenVoteIndex: chosenVoteIndex,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<PollViewHomePage>>(
        future: HomePageService.getPollRequests(),
        builder: (BuildContext context,
            AsyncSnapshot<List<PollViewHomePage>> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            // Show a loading indicator while the data is being fetched
            return const CircularProgressIndicator();
          } else if (snapshot.hasError) {
            // Show an error message if there is an error
            print(snapshot);
            print("ccc");
            return Text('Error: ${snapshot.error}');
            // } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            // Handle the case where no data is available

            print("ddd");
            return const Text('No data available');
          } else {
            // Build your UI using the fetched data
            List<PollViewHomePage> posts = snapshot.data!;
            return Scaffold(
              appBar: AppBar(
                title: const Text('Home'),
              ),
              drawer: const Sidebar(), // Use the custom drawer widget
              body: Column(
                children: [
                  TabBar(
                    controller: _tabController,
                    tabs: const [
                      Tab(text: 'Active'),
                      Tab(text: 'Settled'),
                    ],
                  ),
                  Expanded(
                    child: TabBarView(controller: _tabController, children: [
                      ListView.separated(
                        separatorBuilder: (context, index) => const SizedBox(
                            height: 20), // Add spacing between posts
                        shrinkWrap: true,
                        itemCount: posts
                            .where((post) =>
                                post.isSettled == 0 &&
                                post.approvedStatus == true)
                            .length,
                        itemBuilder: (context, index) {
                          final filteredPosts = posts
                              .where((post) =>
                                  post.isSettled == 0 &&
                                  post.approvedStatus == true)
                              .toList();
                          final post = filteredPosts[index];
                          double postHeight = calculatePostHeight(post);
                          return SizedBox(
                            child: GestureDetector(
                              onTap: () {
                                tapOnPoll(
                                    context,
                                    post.pollId,
                                    post.userName,
                                    post.userUsername,
                                    post.profilePictureUrl,
                                    post.postTitle,
                                    post.tags,
                                    post.tagColors,
                                    post.voteCount,
                                    post.postOptions,
                                    post.likeCount,
                                    post.dateTime,
                                    post.isSettled,
                                    post.didLike,
                                    post.commentCount,
                                    post.chosenVoteIndex);
                              },
                              child: SizedBox(
                                height: postHeight,
                                child: PollViewHomePage(
                                  pollId: post.pollId,
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
                                  comments: post.comments,
                                  isSettled: post.isSettled,
                                  approvedStatus: post.approvedStatus,
                                  didLike: post.didLike,
                                  commentCount: post.commentCount,
                                  chosenVoteIndex: post.chosenVoteIndex,
                                ),
                              ),
                            ),
                          );
                        },
                      ),
                      ListView.separated(
                        separatorBuilder: (context, index) => const SizedBox(
                            height: 20), // Add spacing between posts
                        shrinkWrap: true,
                        itemCount: posts
                            .where((post) =>
                                post.isSettled == 1 &&
                                post.approvedStatus == true)
                            .length,
                        itemBuilder: (context, index) {
                          final filteredPosts = posts
                              .where((post) =>
                                  post.isSettled == 1 &&
                                  post.approvedStatus == true)
                              .toList();
                          final post = filteredPosts[index];
                          double postHeight = calculatePostHeight(post);
                          return SizedBox(
                            child: GestureDetector(
                              onTap: () {
                                tapOnPoll(
                                    context,
                                    post.pollId,
                                    post.userName,
                                    post.userUsername,
                                    post.profilePictureUrl,
                                    post.postTitle,
                                    post.tags,
                                    post.tagColors,
                                    post.voteCount,
                                    post.postOptions,
                                    post.likeCount,
                                    post.dateTime,
                                    post.isSettled,
                                    post.didLike,
                                    post.commentCount,
                                    post.chosenVoteIndex);
                              },
                              child: SizedBox(
                                height: postHeight,
                                child: PollViewHomePage(
                                  pollId: post.pollId,
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
                                  isSettled: post.isSettled,
                                  approvedStatus: post.approvedStatus,
                                  didLike: post.didLike,
                                  commentCount: post.commentCount,
                                  chosenVoteIndex: post.chosenVoteIndex,
                                ),
                              ),
                            ),
                          );
                        },
                      )
                    ]),
                  ),
                ],
              ),
            );
          }
        });
  }

  double calculatePostHeight(PollViewHomePage post) {
    if (post == null) {
      // Handle null case
      return 0;
    }
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
