import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/comment.dart';
import 'package:mobile_app/services/voteDistributionService.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/pollView/commentWidget.dart';
import 'package:mobile_app/view/pollView/tagWidget.dart';
import 'package:mobile_app/view/pollView/postOptionWidget.dart';
import 'package:mobile_app/view/pollView/userInformationWidget.dart';
import 'package:mobile_app/view/pollView/pollView.dart';
import 'package:mobile_app/services/pollViewHomePageLike.dart';
import 'package:mobile_app/services/pollViewHomePageVote.dart';

import '../helpers/dateTime.dart';
import '../helpers/tag.dart';

class PollViewHomePage extends StatefulWidget {
  final String pollId;
  final String userName;
  final String userUsername;
  final String profilePictureUrl;
  final String postTitle;
  final List<String> tags;
  final List<Color> tagColors;
  final int voteCount;
  final List<dynamic> postOptions; // {"id":"", "answer":""}
  final int likeCount;
  final String dateTime;
  final int isSettled;
  final bool? approvedStatus;
  final bool didLike;
  final int commentCount;
  final List<List<int>> annotationIndices;
  final List<String> annotationTexts;
  final Map<String,int> voteCountDistributions;
  final String myVotedOptionId;
  final String outcomeOptionId;
  final List<String> imageURLs;


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
    required this.isSettled,
    required this.approvedStatus,
    required this.didLike,
    required this.commentCount,
    required this.annotationIndices,
    required this.annotationTexts,
    required this.voteCountDistributions,
    required this.myVotedOptionId,
    required this.outcomeOptionId, required this.imageURLs,

  });
  _PollViewHomePageState createState() => _PollViewHomePageState();
}

class _PollViewHomePageState extends State<PollViewHomePage> {
  late int likeCount;
  late bool didLike;
  late String myVotedOptionId;
  late Map<String, int> voteCountDistributions;
  late int voteCount;


  @override
  void initState() {
    super.initState();
    likeCount = widget.likeCount;
    didLike = widget.didLike;
    myVotedOptionId = widget.myVotedOptionId;
    voteCountDistributions = widget.voteCountDistributions;
    voteCount = widget.voteCount;
  }

  void handleLikePress(String pollId) async {
    PollViewHomePageLike pollLike = PollViewHomePageLike();
    pollLike.like(pollId);
    bool likeSuccess = await pollLike.like(pollId);
    if (likeSuccess) {
      setState(() {
        likeCount++;
        didLike = true;
      });
    }
  }

  void handleUnlikePress(String pollId) async {
    PollViewHomePageLike pollLike = PollViewHomePageLike();
    bool unlikeSuccess =
        await pollLike.unlike(pollId); // Assuming an unlike method exists
    if (unlikeSuccess) {
      setState(() {
        likeCount--;
        didLike = false;
      });
    }
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
            pollId: widget.isSettled == 0 ? widget.pollId : "",
          ),
          Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              // child: Text(widget.postTitle,
              //     overflow: TextOverflow.ellipsis,
              //     maxLines: 3,
              //     style: const TextStyle(
              //         fontSize: 18.0, fontWeight: FontWeight.bold)),
              child: buildRichText(widget.postTitle, widget.annotationIndices,
                  widget.annotationTexts)),
          TagListWidget(tags: widget.tags, tagColors: widget.tagColors),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text('Votes: ${voteCount}',
                style: const TextStyle(fontSize: 16.0)),
          ),
          for (int index = 0; index < widget.postOptions.length; index++)
            PostOptionWidget(
                optionText: widget.postOptions[index]["answer"],
                isSelected: myVotedOptionId!="" ? true : false,
                isChosen: myVotedOptionId == widget.postOptions[index]["id"],
                percentage: (voteCountDistributions[widget.postOptions[index]["id"]] != null && voteCount!=0 && myVotedOptionId!="") || (widget.isSettled ==2 &&voteCountDistributions[widget.postOptions[index]["id"]] != null && voteCount!=0)?((voteCountDistributions[widget.postOptions[index]["id"]]!/voteCount)*100).round():0,
                onPressed: widget.isSettled!=2?() =>
                  handleOptionPress(widget.postOptions[index]["id"]):() => {},
                isSettled: widget.isSettled,
                isCorrect: widget.postOptions[index]["id"] == widget.outcomeOptionId,
                ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: didLike
                ? ElevatedButton.icon(
                    onPressed: () => handleUnlikePress(widget.pollId),
                    icon: const Icon(Icons.thumb_down),
                    label: const Text('Unlike'),
                  )
                : ElevatedButton.icon(
                    onPressed: () => handleLikePress(widget.pollId),
                    icon: const Icon(Icons.thumb_up),
                    label: const Text('Like'),
                  ),
          ),
          Row(
            children: [
              LikeCountWidget(likeCount: likeCount),
              DateTimeWidget(
                  dateTime: DateTime.parse(widget.dateTime), color: navy),
            ],
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20),
            child: Text('${widget.commentCount} Comments',
                style: const TextStyle(fontSize: 16.0)),
          ),
        ],
      ),
    );
  }

  RichText buildRichText(
      String fullText, List<List<int>> indices, List<String> annotationTexts) {
    try {
      List<TextSpan> textSpans = [];

      int previousIndex = 0;

      for (int i = 0; i < indices.length; i++) {
        int startIndex = indices[i][0];
        int endIndex = indices[i][1];
        String annotationText = annotationTexts[i];

        // Add non-underlined text before the current underlined part
        textSpans.add(
          TextSpan(
            text: fullText.substring(previousIndex, startIndex),
            style: const TextStyle(color: Colors.black),
          ),
        );

        // Add underlined text with tap gesture recognizer
        textSpans.add(
          TextSpan(
            text: fullText.substring(startIndex, endIndex),
            style: const TextStyle(
              color: Colors.blue,
              decoration: TextDecoration.underline,
            ),
            recognizer: TapGestureRecognizer()
              ..onTap = () {
                // Handle tap on the underlined text
                _showPopup(context, annotationText);
                print(
                    'Tapped on underlined text from index $startIndex to $endIndex!');
              },
          ),
        );

        // Update the previous index to the end index of the current underlined part
        previousIndex = endIndex;
      }

      // Add any remaining non-underlined text after the last underlined part
      textSpans.add(
        TextSpan(
          text: fullText.substring(previousIndex),
          style: const TextStyle(color: Colors.black),
        ),
      );

      return RichText(
        text: TextSpan(
          children: textSpans,
        ),
      );
    }
    catch (e) {
      return RichText(
        text: TextSpan(
          text: fullText,
          style: const TextStyle(color: Colors.black),
        ),
      );
    }
  }

  void _showPopup(BuildContext context, String underlinedText) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          // title: const Text('Popup Title'),
          content: Text(underlinedText),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Close'),
            ),
          ],
        );
      },
    );
  }
  void handleOptionPress(String optionId) async {

    // Handle option press based on the selected option
    PollViewHomePageVote pollVote = PollViewHomePageVote();
    bool voteSuccess = await pollVote.vote(optionId);
    VoteDistributionService voteDistributionService = VoteDistributionService();
    voteCountDistributions= await voteDistributionService.getVoteDistribution(widget.pollId);





    if (voteSuccess) {
      setState(() {
        myVotedOptionId = optionId;
        voteCount++;
      });
    }
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
              border: Border.all(color: navy),
              color: navy,
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
