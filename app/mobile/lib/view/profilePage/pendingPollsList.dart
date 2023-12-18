import 'package:flutter/material.dart';
import 'package:mobile_app/models/pollInfo.dart';
import 'package:mobile_app/services/profilePagePollsService.dart';
import 'package:mobile_app/view/profilePage/pendingPollView.dart';

class PendingPollList extends StatefulWidget {
  final String userId;
  const PendingPollList({super.key, required this.userId});
  @override
  State<PendingPollList> createState() => _PendingPollListState();
}

class _PendingPollListState extends State<PendingPollList> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<PollInfo>>(
      future: ProfilePagePollsService.getPendingPolls(widget.userId),
      builder: (BuildContext context, AsyncSnapshot<List<PollInfo>> snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
          return const Center(child: Text('No pending polls'));
        } else {
          List<PollInfo> polls = snapshot.data!;
          return Scaffold(
            appBar: AppBar(
              title: const Text('Pending Polls'),
            ),
            body: ListView.builder(
              itemCount: polls.length,
              itemBuilder: (context, index) {
                final poll = polls[index];
                double postHeight = calculatePostHeight(poll);
                return SizedBox(
                  height: postHeight,
                  child: PendingPollView.fromPollInfo(pollInfo: poll),
                );
              },
            ),
          );
        }
      },
    );
  }

  double calculatePostHeight(PollInfo poll) {
    double height = 0;
    // Calculate height based on the components in PendingPollView
    height += 150; // For user info and title
    height += poll.options.length * 65; // For each poll option
    height += 30; // Additional spacing or elements
    return height;
  }
}
