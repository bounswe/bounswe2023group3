import 'package:flutter/material.dart';
import 'package:mobile_app/services/moderatorPollDecision.dart';
import 'package:mobile_app/view/moderatorApproval/pollData.dart';
import 'package:mobile_app/view/moderatorApproval/sectionHeader.dart';
import 'readOnlyTextField.dart';
import 'package:dio/dio.dart';
import 'package:mobile_app/view/constants.dart';




class ModeratorSettleApproval extends StatelessWidget {
  final List<Color> tagColors;
  final PollData pollData;
  final TextEditingController feedbackController = TextEditingController();

  ModeratorSettleApproval({
    super.key,
    required this.tagColors,
    required this.pollData,

  });

  void settlePoll(BuildContext context, bool decision, String feedback, String id) async{
    // Perform email verification and navigate to the next screen if successful
    ModeratorPollDecision moderatorPollDecision = ModeratorPollDecision();

    try {
      Response response = await moderatorPollDecision.settlePoll(decision, feedback, id);

      if (response.statusCode == 201) {

        if (!context.mounted) return;
        Navigator.pop(context, decision ? "Poll is approved successfully" :"Poll is rejected successfully.");
      }

      else {
        showMessageSnackBar(context, "There is a problem about the existing of poll or the system.");
      }

    }
    catch (e) {
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
        title: const Text("Approve or Reject the Poll Settle Request "),
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
            for (var i = pollData.options.length-1; i >=0 ; i--)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: ReadOnlyTextField(
                  text: pollData.options[i],
                ),
              ),

            // image url input
            const SizedBox(height: 16),
            const SectionHeader(headerText: "Image URLs"),
            const SizedBox(height: 16),

            ...pollData.imageURLs.map((url) => ListTile(
              title: Row(

                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(child: Text(url)),
                  const SizedBox(width: 5),
                  // Image preview
                  Container(
                    width: 50,
                    decoration: BoxDecoration(
                      border: Border.all(color: Colors.grey.shade300),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: Image.network(
                      url,
                      fit: BoxFit.fitWidth,
                      errorBuilder: (BuildContext context,
                          Object exception, StackTrace? stackTrace) {
                        return const Icon(Icons.error_outline,
                            color: Colors.red);
                      },
                    ),
                  ),
                ],
              ),

            )),
            const SizedBox(height: 4),
            const SectionHeader(headerText: "Outcome"),
            const SizedBox(height: 4),
            ReadOnlyTextField(
              text: pollData.outcome, // Use the appropriate field from PollData
            ),

            // Outcome Source field
            const SizedBox(height: 16),
            const SectionHeader(headerText: "Outcome Source"),
            const SizedBox(height: 4),
            ReadOnlyTextField(
              text: pollData.outcomeSource, // Use the appropriate field from PollData
            ),

            // Feedback field
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
                  onPressed: ()=>settlePoll(context, true, feedbackController.text, pollData.pollId),
                  child: const Text('Approve!'),
                ),
                ElevatedButton(
                  onPressed: ()=>settlePoll(context, false, feedbackController.text, pollData.pollId),
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
