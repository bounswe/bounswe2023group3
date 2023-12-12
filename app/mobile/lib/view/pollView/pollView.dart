import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/comment.dart';
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/services/createCommentService.dart';
import 'package:mobile_app/services/pollCommentService.dart';
import 'package:mobile_app/view/pollView/commentWidget.dart';
import 'package:mobile_app/view/pollView/tagWidget.dart';
import 'package:mobile_app/view/pollView/postOptionWidget.dart';
import 'package:mobile_app/view/pollView/userInformationWidget.dart';
import 'package:mobile_app/services/pollViewHomePageLike.dart';

import '../constants.dart';

class PollPage extends StatefulWidget {
  final String pollId;
  final String userName;
  final String userUsername;
  final String profilePictureUrl;
  final String postTitle;
  final List<String> tags;
  final List<Color> tagColors;
  final int voteCount;
  final List<String> postOptions;
  final int likeCount;
  final String dateTime;
  final List<CommentData> comments;
  final int isSettled;

  const PollPage({
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
    required this.comments,
    required this.isSettled,
  });

  @override
  State<PollPage> createState() => _PollPageState();

  Future<List<CommentData>> fetchComments() async {
    return await PollCommentService.getComments(pollId);
  }
}

class _PollPageState extends State<PollPage> {
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
            for (String option in widget.postOptions)
              PostOptionWidget(
                  optionText: option,
                  onPressed: () => handleOptionPress(option)),
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
                DateTimeWidget(dateTime: widget.dateTime),
              ],
            ),
            CommentEntryFieldWidget(
                pollId: widget.pollId,
                parentSetState: () {
                  setState(() {});
                }),
            FutureBuilder<List<CommentData>>(
              future: widget
                  .fetchComments(), // Your asynchronous data fetch function
              builder: (BuildContext context,
                  AsyncSnapshot<List<CommentData>> snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  // Show a loading indicator while waiting for the comments to load
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  // If we run into an error, display it to the user
                  return Text('Error: ${snapshot.error}');
                } else {
                  var comments = snapshot.hasData ? snapshot.data! : [];
                  // Whether we have data or not, display the number of comments
                  int commentCount = comments.length;
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Text('$commentCount Comments',
                            style: const TextStyle(fontSize: 16.0)),
                      ),
                      // If we have data, display the list of comments
                      if (snapshot.hasData)
                        ...comments
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

  void handleOptionPress(String option) {
    // Handle option press based on the selected option
    print("pressed $option");
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

class DateTimeWidget extends StatelessWidget {
  final String dateTime;

  const DateTimeWidget({super.key, required this.dateTime});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 16.0),
      child: Row(
        children: [
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20.0),
              border: Border.all(color: pink),
              color: pink,
            ),
            child: Text(dateTime,
                style: const TextStyle(fontSize: 16.0, color: whitish)),
          ),
        ],
      ),
    );
  }
}

class TagListWidget extends StatelessWidget {
  final List<String> tags;
  final List<Color> tagColors;

  const TagListWidget({super.key, required this.tags, required this.tagColors});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          for (int i = 0; i < tags.length; i++)
            Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4.0),
                child: TagWidget(tagText: tags[i], tagColor: tagColors[i])),
        ],
      ),
    );
  }
}
