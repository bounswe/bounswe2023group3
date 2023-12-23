import 'package:flutter/material.dart';
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Annotate Poll'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            const Text("Title"),
            TextField(
              controller: titleControl,
              readOnly: true,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8), // Adds spacing between the fields
            const Text("Description"),
            TextField(
              controller: descrControl,
              readOnly: true,
              style: const TextStyle(
                fontSize: 18, // Adjusted for description
              ),
              maxLines: null, // Allows multi-line input
            ),
          ],
        ),
      ),
    );
  }
}
