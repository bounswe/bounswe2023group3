import 'package:flutter/material.dart';
import 'package:mobile_app/view/pollView/commentWidget.dart';
import 'package:mobile_app/view/pollView/tagWidget.dart';
import 'package:mobile_app/view/pollView/postOptionWidget.dart';
import 'package:mobile_app/view/pollView/userInformationWidget.dart';
import 'package:mobile_app/view/pollView/pollView.dart';

class PollViewHomePage extends StatelessWidget {
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

  const PollViewHomePage({
    super.key,
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
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            UserInformationWidget(
              userName: userName,
              userUsername: userUsername,
              profilePictureUrl: profilePictureUrl,
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Text(postTitle,
                  style: const TextStyle(
                      fontSize: 18.0, fontWeight: FontWeight.bold)),
            ),
            TagListWidget(tags: tags, tagColors: tagColors),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Text('Vote Count: $voteCount',
                  style: const TextStyle(fontSize: 16.0)),
            ),
            for (String option in postOptions)
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
                LikeCountWidget(likeCount: likeCount),
                DateTimeWidget(dateTime: dateTime),
              ],
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: Text('${comments.length} Comments',
                  style: const TextStyle(fontSize: 16.0)),
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
    print("pressed like");
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
              border: Border.all(color: Colors.blue),
              color: Colors.blue,
            ),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text('$likeCount Likes',
                  style: const TextStyle(fontSize: 16.0)),
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
              border: Border.all(color: Colors.grey),
              color: Colors.blue,
            ),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(dateTime,
                  style: const TextStyle(fontSize: 16.0)),
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
