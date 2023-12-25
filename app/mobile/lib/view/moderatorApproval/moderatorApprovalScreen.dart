import 'package:flutter/material.dart';
import 'package:mobile_app/services/moderatorPollDecision.dart';
import 'package:mobile_app/view/moderatorApproval/pollData.dart';
import 'package:mobile_app/view/moderatorApproval/sectionHeader.dart';
import 'package:mobile_app/view/pollView/pollView.dart';
import '../helpers/dateTime.dart';
import 'readOnlyTextField.dart';
import 'package:dio/dio.dart';
import 'package:mobile_app/view/constants.dart';

class ModeratorApprovalScreen extends StatelessWidget {
  final List<Color> tagColors;
  final PollData pollData;
  final TextEditingController feedbackController = TextEditingController();

  ModeratorApprovalScreen({
    super.key,
    required this.tagColors,
    required this.pollData,
  });

  void answerPoll(
      BuildContext context, bool isApproved, String id, String feedback) async {
    // Perform email verification and navigate to the next screen if successful
    ModeratorPollDecision moderatorPollDecision = ModeratorPollDecision();

    try {
      Response response =
          await moderatorPollDecision.answerPoll(isApproved, id, feedback);

      if (response.statusCode == 201) {
        if (!context.mounted) return;
        Navigator.pop(
            context,
            isApproved
                ? "Poll is approved successfully"
                : "Poll is rejected successfully.");
      } else {
        showMessageSnackBar(context,
            "There is a problem about the existing of poll or the system.");
      }
    } catch (e) {
      showMessageSnackBar(context, "Catch block is executed.");
    }
  }

  void showMessageSnackBar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Approve or Reject the Poll "),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: ListView(
          children: <Widget>[
            // poll title
            const SizedBox(height: 4),
            const SectionHeader(headerText: "Title"),
            const SizedBox(height: 4),
            ReadOnlyTextField(
              text: pollData.pollTitle,
            ),
            const SizedBox(height: 4),
            const SectionHeader(headerText: "Due Date"),
            const SizedBox(height: 4),
            DateTimeWidget(
                dateTime: DateTime.parse(pollData.dueDate), color: Colors.red),

            // added tags
            const SizedBox(height: 16),
            const SectionHeader(headerText: "Tags"),
            Wrap(
              spacing: 8,
              children: pollData.tags.map((tag) {
                return Chip(
                  backgroundColor: pink,
                  label: Text(tag),
                );
              }).toList(),
            ),

            const SizedBox(height: 16),
            const SectionHeader(headerText: "Options"),
            for (var i = pollData.options.length - 1; i >= 0; i--)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: ReadOnlyTextField(
                  text: pollData.options[i],
                ),
              ),

            // image url input
            const SizedBox(height: 16),
            const SectionHeader(headerText: "Images"),
            const SizedBox(height: 16),

            ...pollData.imageURLs.map((url) => ListTile(
                  title: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Expanded(child: Text(url)),
                      const SizedBox(width: 5),
                      // Image preview
                      Container(
                        width: 300,
                        decoration: BoxDecoration(
                          border: Border.all(color: Colors.grey.shade300),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        clipBehavior: Clip.antiAlias,
                        child: Image.network(
                          url,
                          fit: BoxFit.fitWidth,
                          errorBuilder: (BuildContext context, Object exception,
                              StackTrace? stackTrace) {
                            return const Icon(Icons.error_outline,
                                color: Colors.red);
                          },
                        ),
                      ),
                    ],
                  ),
                )),
            const SizedBox(height: 16),
            const SectionHeader(headerText: "Feedback"),
            const SizedBox(height: 4),
            TextFormField(
              controller: feedbackController,
              decoration: const InputDecoration(
                hintText: 'Enter your feedback...',
                border: OutlineInputBorder(),
              ),
            ),

            const SizedBox(height: 16),
            // submit and cancel buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                ElevatedButton(
                  onPressed: () => answerPoll(
                      context, true, pollData.pollId, feedbackController.text),
                  child: const Text('Approve!'),
                ),
                ElevatedButton(
                  onPressed: () => answerPoll(
                      context, false, pollData.pollId, feedbackController.text),
                  child: const Text('Reject!'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
