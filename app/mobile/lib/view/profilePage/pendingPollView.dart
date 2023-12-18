import 'package:flutter/material.dart';
import 'package:mobile_app/models/pollInfo.dart';
import 'package:mobile_app/view/moderatorHomePage/requestViewHome.dart';
import 'package:mobile_app/view/pollView/postOptionWidget.dart';

class PendingPollView extends StatefulWidget {
  final String pollId;
  final String postTitle;
  final List<String> tags;
  final List<Color> tagColors;
  final List<String> optionTexts;
  final String dueDate; // New field for due date

  const PendingPollView({
    super.key,
    required this.pollId,
    required this.postTitle,
    required this.tags,
    required this.tagColors,
    required this.optionTexts,
    required this.dueDate, // Initialize due date
  });

  PendingPollView.fromPollInfo({
    required PollInfo pollInfo,
    super.key,
  })  : pollId = pollInfo.pollId,
        postTitle = pollInfo.postTitle,
        tags = pollInfo.tags,
        tagColors = pollInfo.tagColors,
        optionTexts = pollInfo.options,
        dueDate = pollInfo.dueDate.toString();

  @override
  State<PendingPollView> createState() => _PendingPollViewState();
}

class _PendingPollViewState extends State<PendingPollView> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Text(
              widget.postTitle,
              overflow: TextOverflow.ellipsis,
              maxLines: 3,
              style:
                  const TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
            ),
          ),
          TagListWidget(tags: widget.tags, tagColors: widget.tagColors),
          for (int index = 0; index < widget.optionTexts.length; index++)
            PostOptionWidget(
              optionText: widget.optionTexts[index],
              isSelected: false,
              isChosen: false,
              percentage: 0,
              onPressed: () {},
              isSettled: 0,
            ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text("Due Date: ${widget.dueDate}",
                style: const TextStyle(fontSize: 16.0, color: Colors.grey)),
          ),
        ],
      ),
    );
  }
}
