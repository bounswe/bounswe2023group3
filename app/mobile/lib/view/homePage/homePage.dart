import 'package:flutter/material.dart';
import 'package:mobile_app/services/homePageService.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart'; // Import your custom drawer widget
import 'package:mobile_app/view/pollViewHomePage/pollViewHomePage.dart';
import 'package:mobile_app/view/pollView/pollView.dart';

class HomePage extends StatelessWidget {
  HomePage({super.key});

  void tapOnPoll(BuildContext context, userName, userUsername,
      profilePictureUrl, postTitle, tags, tagColors, voteCount, postOptions,
      likeCount, dateTime, comments) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) =>
            PollPage(userName: userName,
                userUsername: userUsername,
                profilePictureUrl: profilePictureUrl,
                postTitle: postTitle,
                tags: tags,
                tagColors: tagColors,
                voteCount: voteCount,
                postOptions: postOptions,
                likeCount: likeCount,
                dateTime: dateTime,
                comments: comments),
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
                  Expanded(
                    child: ListView.separated(
                      separatorBuilder: (context, index) => const SizedBox(height: 20), // Add spacing between posts
                      shrinkWrap: true,
                      itemCount: posts.length,
                      itemBuilder: (context, index) {
                        final post = posts[index];
                        double postHeight = calculatePostHeight(post);
                        return SizedBox(
                          child: GestureDetector(
                            onTap: (){tapOnPoll(context,
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
                                post.comments);},
                            child: SizedBox(
                              height: postHeight,
                              child: PollViewHomePage(pollId: post.pollId,
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
                              ),
                            ),
                          ),
                        );
                      },
                    ),
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
    height += post.postOptions.length * 65; // Assuming a fixed height for each option
    height += 100; // Adjust as needed for padding or spacing
    height += 50; // Adjust as needed for the Like button
    height += 50; // Adjust as needed for the Row with LikeCount and DateTime
    height += 30; // Adjust as needed for padding or spacing
    height += 16; // Adjust as needed for the 'Comments' text

    return height;
  }


}
