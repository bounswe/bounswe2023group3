import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/moderatorApproval/sectionHeader.dart';
import 'package:mobile_app/view/pollRequest/customContainer.dart';
import 'package:mobile_app/view/pollRequest/pollCreationData.dart';

class PollCreationAnnotate extends StatefulWidget {
  final PollCreationData pollInfo;

  const PollCreationAnnotate({Key? key, required this.pollInfo})
      : super(key: key);

  @override
  State<PollCreationAnnotate> createState() => _PollCreationAnnotateState();
}

class _PollCreationAnnotateState extends State<PollCreationAnnotate> {
  late TextEditingController titleControl;
  late TextEditingController descrControl;

  @override
  void initState() {
    super.initState();
    titleControl = TextEditingController(text: widget.pollInfo.pollTitle);
    descrControl = TextEditingController(text: widget.pollInfo.pollDescription);
  }

  final TextStyle style = const TextStyle(fontSize: 18, color: Colors.black);
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Annotate Poll'),
        ),
        body:
            // !!! modify here to be a stack, bottom element is that padding
            // top element is a positioned, whose child is a button:
            // and rendered with condition isSelectionValid
            // [Annotate]
            // the behavior of that button is explained below.
            Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              const SizedBox(height: 15),
              const SectionHeader(headerText: "Title"),
              GestureDetector(
                onTapUp: (details) {
                  // !!! check the selection
                  // if selection contains a substring
                  // isSelectionValid <- true
                  // adjust the position of the button to the
                  // details.globalPosition
                  // creates a popup:
                  // adding annotation for "substring"
                  // [--inp-fld--]
                  // [add] // logic is gong to be implemented by me.
                  // the pop up should be a separate function,
                  // called with parameters: position, substring
                  // details.globalPosition
                },
                child: TextField(
                  controller: titleControl,
                  readOnly: true,
                  style: style,
                ),
              ),
              const SizedBox(height: 30), // Adds spacing between the fields
              const SectionHeader(headerText: "Description"),
              // !!! do similar gesture detector logic here.
              TextField(
                controller: descrControl,
                readOnly: true,
                style: style,
                maxLines: null, // Allows multi-line input
              ),
            ],
          ),
        ),
      ),
    );
  }
}
