import 'package:flutter/material.dart';
import 'package:mobile_app/models/annotation.dart';
import 'package:mobile_app/models/pollInfo.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/moderatorApproval/sectionHeader.dart';
import 'package:mobile_app/models/pollCreationData.dart';

class PollCreationAnnotate extends StatefulWidget {
  final PollCreationData pollInfo;

  const PollCreationAnnotate({Key? key, required this.pollInfo})
      : super(key: key);

  @override
  State<PollCreationAnnotate> createState() => _PollCreationAnnotateState();
}

class _PollCreationAnnotateState extends State<PollCreationAnnotate> {
  late TextEditingController questControl;

  @override
  void initState() {
    super.initState();
    questControl = TextEditingController(text: widget.pollInfo.question);
  }

  final TextStyle style = const TextStyle(fontSize: 18, color: Colors.black);
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        _clearSelection();
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Annotate Poll'),
        ),
        body: Stack(children: [
          ListView(
            padding: const EdgeInsets.all(16.0),
            children: [
              const SizedBox(height: 15),
              const SectionHeader(headerText: "Question"),
              TextField(
                controller: questControl,
                readOnly: true,
                style: style,
                maxLines: null,
              ),
              const SizedBox(height: 15),
              if (widget.pollInfo.annotations.isNotEmpty)
                const SectionHeader(headerText: "Added Annotations"),
              ...widget.pollInfo.annotations.map((ann) => ListTile(
                    subtitle: Text(ann.body),
                    title: Text(questControl.text.substring(
                      ann.indices[0],
                      ann.indices[1],
                    )),
                  )),
            ],
          ),
          Positioned(
            bottom: 200,
            right: 15,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(
                onPressed: _showAnnotationPopup,
                child: const Text("Annotate"),
              ),
            ),
          ),
        ]),
      ),
    );
  }

  void _clearSelection() async {
    // TODO burda problem cikabilir. mobilde denemek lazim.
    Future.delayed(const Duration(milliseconds: 100), () {
      setState(() {
        questControl.selection = const TextSelection.collapsed(offset: -1);
      });
    });
  }

  void _showAnnotationPopup() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        String questionSubtring = questControl.selection.isValid
            ? questControl.text.substring(
                questControl.selection.start,
                questControl.selection.end,
              )
            : "";
        bool questionHasSelectedPart = questionSubtring.isNotEmpty;
        if (!questionHasSelectedPart) {
          return AlertDialog(
            content: const Text("You should select a part of the"
                " question to annotate"),
            actions: [
              TextButton(
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                  // _addAnnotation();
                },
              ),
            ],
          );
        }
        String selectedSubstring = questionSubtring;
        TextEditingController controller = TextEditingController();
        return AlertDialog(
          content: Column(
            mainAxisSize: MainAxisSize.min, // Use minimal space for the Column
            children: [
              Text("adding annotation for $selectedSubstring"),
              const SizedBox(height: 15),
              TextField(
                controller: controller,
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: "enter annotation here",
                ),
                maxLines: null, // Allows the text field to expand as needed
              ),
            ],
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
                if (controller.text.isEmpty) {
                  return;
                }
                if (questionHasSelectedPart) {
                  _addAnnotation(
                    controller.text,
                    questControl.selection.start,
                    questControl.selection.end,
                  );
                }
                _clearSelection();
              },
            ),
          ],
        );
      },
    );
  }

  void _addAnnotation(String body, int start, int end) {
    widget.pollInfo.annotations.add(
      Annotation(
        body: body,
        indices: [start, end],
      ),
    );
  }
}
