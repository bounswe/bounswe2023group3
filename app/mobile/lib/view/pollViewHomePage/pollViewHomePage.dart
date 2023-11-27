import 'package:flutter/material.dart';
import 'package:mobile_app/models/comment.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/pollView/commentWidget.dart';
import 'package:mobile_app/view/pollView/tagWidget.dart';
import 'package:mobile_app/view/pollView/postOptionWidget.dart';
import 'package:mobile_app/view/pollView/userInformationWidget.dart';
import 'package:mobile_app/view/pollView/pollView.dart';
import 'package:mobile_app/services/pollViewHomePageLike.dart';

class PollViewHomePage extends StatefulWidget {
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

  const PollViewHomePage({
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
  _PollViewHomePageState createState() => _PollViewHomePageState();
}

class _PollViewHomePageState extends State<PollViewHomePage> {
  late int likeCount;

  @override
  void initState() {
    super.initState();
    likeCount = widget.likeCount;
  }

  void handleLikePress(String pollId) {
    PollViewHomePageLike pollLike = PollViewHomePageLike();
    pollLike.like(pollId);
    setState(() {
      likeCount++;
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          UserInformationWidget(
            userName: widget.userName,
            userUsername: widget.userUsername,
            profilePictureUrl: widget.profilePictureUrl,
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(widget.postTitle,
                overflow: TextOverflow.ellipsis,
                maxLines: 3,
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
                optionText: option, onPressed: () => handleOptionPress(option)),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: ElevatedButton.icon(
              onPressed: () => handleLikePress(widget.pollId),
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
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20),
            child: Text('${widget.comments.length} Comments',
                style: const TextStyle(fontSize: 16.0)),
          ),
        ],
      ),
    );
  }

  void handleOptionPress(String option) {
    // Handle option press based on the selected option
    print("pressed $option");
  }

  //void handleLikePress(String pollId) {
   // PollViewHomePageLike pollLike = PollViewHomePageLike();
   // pollLike.like(pollId);
    //print("pressed like");
  //}
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
      padding: const EdgeInsets.symmetric(horizontal: 25.0),
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
              child: Text(dateTime,
                  style: const TextStyle(fontSize: 16.0, color: whitish)),
            ),
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
