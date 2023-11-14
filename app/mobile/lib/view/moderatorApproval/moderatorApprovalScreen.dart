import 'package:flutter/material.dart';
import 'package:mobile_app/services/moderatorPollDecision.dart';
import 'package:mobile_app/view/moderatorApproval/pollData.dart';
import 'package:mobile_app/view/moderatorApproval/sectionHeader.dart';
import 'readOnlyTextField.dart';
import 'package:dio/dio.dart';
import 'package:mobile_app/view/constants.dart';

class AlwaysDisabledFocusNode extends FocusNode {
  @override
  bool get hasFocus => false;
}

class ModeratorApprovalScreen extends StatefulWidget {

  final List<Color> tagColors;
  final PollData pollData;
  const ModeratorApprovalScreen({
    super.key,
    required this.tagColors,
    required this.pollData,

  });

  @override
  State<ModeratorApprovalScreen> createState() => _ModeratorApprovalScreenState();
}

class _ModeratorApprovalScreenState extends State<ModeratorApprovalScreen> {



  void answerPoll(bool isApproved) async{
    // Perform email verification and navigate to the next screen if successful
    ModeratorPollDecision moderatorPollDecision = ModeratorPollDecision();

    try {
      Response response = await moderatorPollDecision.answerPoll(isApproved);

      if (response.statusCode == 201) {
        if (!context.mounted) return;
        Navigator.pop(context);
      }

      else {
        if (!context.mounted) return;
      }
    }
    catch (e) {
      showErrorMessage(context);
    }
  }

  void showErrorMessage(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Email is incorrect'),
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
            ReadOnlyTextField(
              label: widget.pollData.pollTitle,
            ),

            // poll description
            const SizedBox(height: 16),
            const SectionHeader(headerText: "Description"),
            ReadOnlyTextField(
              label: widget.pollData.pollDescription,
            ),

            // added tags
            const SizedBox(height: 16),
            const SectionHeader(headerText: "Tags"),
            Wrap(
              spacing: 8,
              children: widget.pollData.tags.map((tag) {
                return Chip(
                  backgroundColor: pink,
                  label: Text(tag),
                );
              }).toList(),
            ),

            /*// new tag input
            Container(
              decoration: BoxDecoration(
                color: whitish,
                border: Border.all(color: navy),
                borderRadius: BorderRadius.circular(4),
              ),
              child: TypeAheadField(
                textFieldConfiguration: TextFieldConfiguration(
                  controller: _pollTagController,
                  focusNode: _pollTagFocus,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Enter tag',
                  ),
                  onSubmitted: (_) {
                    if (_pollTagController.text.isEmpty) {
                      FocusScope.of(context)
                          .requestFocus(_pollOptionFocuses[0]);
                    } else {
                      FocusScope.of(context).unfocus();
                    }
                  },
                ),
                suggestionsCallback: (pattern) async {
                  return await TagCompletionService.getPossibleCompletions(
                      pattern);
                },
                itemBuilder: (context, suggestion) {
                  return ListTile(
                    title: Text(suggestion),
                  );
                },
                onSuggestionSelected: (suggestion) {
                  setState(() {
                    pollData.tags.add(suggestion);
                    _pollTagController.clear();
                  });
                  FocusScope.of(context).requestFocus(_pollOptionFocuses[0]);
                },
              ),
            ),
*/
            const SizedBox(height: 16),
            const SectionHeader(headerText: "Options"),
            for (var i = 0; i < widget.pollData.options.length; i++)
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: ReadOnlyTextField(
                  label: widget.pollData.options[i],
                ),
              ),

            // image url input
            const SizedBox(height: 16),
            const SectionHeader(headerText: "Image URLs"),
            const SizedBox(height: 16),

            ...widget.pollData.imageURLs.map((url) => ListTile(
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

            const SizedBox(height: 16),
            // submit and cancel buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                ElevatedButton(
                  onPressed: ()=>answerPoll(true),
                  child: const Text('Approve!'),
                ),
                ElevatedButton(
                  onPressed: ()=>answerPoll(false),
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
