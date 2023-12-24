import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/models/comment.dart';
import 'package:mobile_app/services/createCommentService.dart';
import 'package:mobile_app/services/pollViewHomePageVote.dart';
import 'package:mobile_app/services/pollCommentService.dart';
import 'package:mobile_app/view/pollView/commentWidget.dart';
import 'package:mobile_app/view/pollView/tagWidget.dart';
import 'package:mobile_app/view/pollView/postOptionWidget.dart';
import 'package:mobile_app/view/pollView/userInformationWidget.dart';
import 'package:mobile_app/services/pollViewHomePageLike.dart';

import '../constants.dart';
import '../helpers/dateTime.dart';
import '../helpers/tag.dart';
import '../waitingScreen/fancyWaitingScreen.dart';

class PollPage extends StatefulWidget {
  final String pollId;
  final String userName;
  final String userUsername;
  final String profilePictureUrl;
  final String postTitle;
  final List<String> tags;
  final List<Color> tagColors;
  final int voteCount;
  final List<dynamic> postOptions;
  final int likeCount;
  final String dateTime;
  final int isSettled;
  final bool? approvedStatus;
  final int chosenVoteIndex;

  PollPage({
    super.key,
    required this.pollId,
    required this.userName,
    required this.userUsername,
    required this.profilePictureUrl,
    required this.postTitle,
    required this.tags,
    required this.tagColors,
    required this.voteCount,
    required this.postOptions,
    required this.likeCount,
    required this.dateTime,
    required this.isSettled,
    this.approvedStatus,
    required this.chosenVoteIndex,
  });

  @override
  State<PollPage> createState() => _PollPageState();
}

class _PollPageState extends State<PollPage> {
  late int chosenVoteIndex;
  late List<CommentData> comments;
  Future<List<CommentData>> fetchComments() async {
    comments = await PollCommentService.getComments(widget.pollId);
    return comments;
  }

  @override
  void initState() {
    super.initState();
    comments = [];
    chosenVoteIndex = widget.chosenVoteIndex;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Post Page'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            UserInformationWidget(
              userName: widget.userName,
              userUsername: widget.userUsername,
              profilePictureUrl: widget.profilePictureUrl,
              pollId: widget.isSettled == 0 ? widget.pollId : "",
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Text(widget.postTitle,
                  style: const TextStyle(
                      fontSize: 18.0, fontWeight: FontWeight.bold)),
            ),
            TagListWidget(tags: widget.tags, tagColors: widget.tagColors),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Text('Vote Count: ${widget.voteCount}',
                  style: const TextStyle(fontSize: 16.0)),
            ),
            for (int index = 0; index < widget.postOptions.length; index++)
              PostOptionWidget(
                //(100*int.parse(widget.postOptions[index]["voteCount"])/widget.voteCount).toInt()
                optionText: widget.postOptions[index]["answer"],
                isSelected: chosenVoteIndex >= 0 ? true : false,
                isChosen: chosenVoteIndex == index,
                percentage: 30,
                onPressed: () =>
                    handleOptionPress(widget.postOptions[index]["id"], index),
                isSettled: widget.isSettled,
              ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: ElevatedButton.icon(
                onPressed: handleLikePress,
                icon: const Icon(Icons.thumb_up),
                label: const Text('Like'),
              ),
            ),
            Row(
              children: [
                LikeCountWidget(likeCount: widget.likeCount),
                DateTimeWidget(dateTime: DateTime.parse(widget.dateTime), color: blue),
              ],
            ),
            CommentEntryFieldWidget(
                pollId: widget.pollId,
                parentSetState: () {
                  setState(() {});
                }),
            FutureBuilder<List<CommentData>>(
              future: fetchComments(),
              builder: (BuildContext context,
                  AsyncSnapshot<List<CommentData>> snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  // Show a loading indicator while waiting for the comments to load
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  // If we run into an error, display it to the user
                  return Text('Error: ${snapshot.error}');
                } else {
                  var fetchedComments = snapshot.hasData ? snapshot.data! : [];

                  // Whether we have data or not, display the number of fetchedComments
                  int commentCount = fetchedComments.length;
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Text('$commentCount Comments',
                            style: const TextStyle(fontSize: 16.0)),
                      ),
                      // If we have data, display the list of fetchedComments
                      if (snapshot.hasData)
                        ...fetchedComments
                            .map((comment) => CommentWidget(
                                  user: comment.user,
                                  commentText: comment.commentText,
                                ))
                            .toList(),
                      // If there's no data, there's nothing else to add to the column
                    ],
                  );
                }
              },
            ),
          ],
        ),
      ),
    );
  }

  void handleOptionPress(String optionId, int index) async {
    // Handle option press based on the selected option
    PollViewHomePageVote pollVote = PollViewHomePageVote();
    bool voteSuccess = await pollVote.vote(optionId);
    if (voteSuccess) {
      setState(() {
        chosenVoteIndex = index;
      });
    }
  }

  void handleLikePress() {
    PollViewHomePageLike pollLike = PollViewHomePageLike();
    pollLike.like(widget.pollId);
    print("pressed like");
  }
}

class CommentEntryFieldWidget extends StatelessWidget {
  CommentEntryFieldWidget(
      {Key? key, required this.pollId, required this.parentSetState})
      : super(key: key);
  final String pollId;
  final VoidCallback parentSetState;
  final TextEditingController commentController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20.0),
              border: Border.all(color: Colors.blue),
              color: Colors.white,
            ),
            child: TextFormField(
              controller: commentController,
              decoration: const InputDecoration(
                labelText: 'Add a comment...',
                border: InputBorder.none,
              ),
            ),
          ),
          const SizedBox(height: 8.0),
          // Add some space between the text field and the button
          ElevatedButton(
            onPressed: () {
              // Handle button press here
              addComment();
            },
            child: const Text('Post Comment'),
          ),
        ],
      ),
    );
  }

  Future<void> addComment() async {
    PostCommentService postCommentService = PostCommentService();
    Response response =
        await postCommentService.postComment(pollId, commentController.text);
    if (response.statusCode == 201) {
      print("Comment added successfully");
      parentSetState();
    } else {
      print("Comment could not be added");
    }
  }
}

class LikeCountWidget extends StatelessWidget {
  final int likeCount;

  const LikeCountWidget({super.key, required this.likeCount});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0),
      child: Row(
        children: [
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20.0),
              border: Border.all(color: pink),
              color: pink,
            ),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text('$likeCount Likes',
                  style: const TextStyle(fontSize: 16.0, color: whitish)),
            ),
          ),
        ],
      ),
    );
  }
}
