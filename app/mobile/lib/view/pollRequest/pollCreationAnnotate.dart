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
              const SectionHeader(headerText: "Title"),
              TextField(
                controller: titleControl,
                readOnly: true,
                style: style,
              ),
              const SizedBox(height: 30),
              const SectionHeader(headerText: "Description"),
              TextField(
                controller: descrControl,
                readOnly: true,
                style: style,
                maxLines: null,
              ),
              const SizedBox(height: 15),
              if (widget.pollInfo.titleAnnotations.isNotEmpty)
                const SectionHeader(headerText: "Title Annotations"),
              ...widget.pollInfo.titleAnnotations.map((ann) => ListTile(
                    subtitle: Text(ann.body),
                    title: Text(titleControl.text.substring(
                      ann.indices[0],
                      ann.indices[1],
                    )),
                  )),
              if (widget.pollInfo.descriptionAnnotations.isNotEmpty)
                const SectionHeader(headerText: "Description Annotations"),
              ...widget.pollInfo.descriptionAnnotations.map((ann) => ListTile(
                    subtitle: Text(ann.body),
                    title: Text(descrControl.text.substring(
                      ann.indices[0],
                      ann.indices[1],
                    )),
                  )),
              // Add more widgets as needed
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
        titleControl.selection = const TextSelection.collapsed(offset: -1);
        descrControl.selection = const TextSelection.collapsed(offset: -1);
      });
    });
  }

  void _showAnnotationPopup() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        String titleSub = titleControl.selection.isValid
            ? titleControl.text.substring(
                titleControl.selection.start,
                titleControl.selection.end,
              )
            : "";
        String descrSub = descrControl.selection.isValid
            ? descrControl.text.substring(
                descrControl.selection.start,
                descrControl.selection.end,
              )
            : "";
        bool titleControlHasSelectedPart = titleSub.isNotEmpty;
        bool descrControlHasSelectedPart = descrSub.isNotEmpty;
        if (!titleControlHasSelectedPart && !descrControlHasSelectedPart) {
          return AlertDialog(
            content: const Text("You should select a part of the"
                " title or the description to annotate"),
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
        String selectedSubstring =
            titleControlHasSelectedPart ? titleSub : descrSub;
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
                if (titleControlHasSelectedPart) {
                  _addAnnotationTitle(
                    controller.text,
                    titleControl.selection.start,
                    titleControl.selection.end,
                  );
                }
                if (descrControlHasSelectedPart) {
                  _addAnnotationDescr(
                    controller.text,
                    descrControl.selection.start,
                    descrControl.selection.end,
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

  void _addAnnotationTitle(String body, int start, int end) {
    widget.pollInfo.titleAnnotations.add(
      Annotation(
        body: body,
        indices: [start, end],
      ),
    );
  }

  void _addAnnotationDescr(String body, int start, int end) {
    widget.pollInfo.descriptionAnnotations.add(
      Annotation(
        body: body,
        indices: [start, end],
      ),
    );
  }
}
