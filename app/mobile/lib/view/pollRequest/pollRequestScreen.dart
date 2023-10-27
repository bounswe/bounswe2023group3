import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:mobile_app/services/tagCompletionService.dart';
import 'package:mobile_app/view/pollRequest/customTextField.dart';
import 'package:mobile_app/view/pollRequest/pollCreationData.dart';
import 'package:mobile_app/view/pollRequest/sectionHeader.dart';

class PollRequestPage extends StatefulWidget {
  const PollRequestPage({super.key});

  @override
  State<PollRequestPage> createState() => _PollRequestPageState();
}

class _PollRequestPageState extends State<PollRequestPage> {
  PollCreationData pollData = PollCreationData();

  final _pollTitleController = TextEditingController();
  final _pollDescriptionController = TextEditingController();
  final _pollTagController = TextEditingController();
  final _pollOptionController = TextEditingController();
  final _pollImageUrlController = TextEditingController();

  final _pollTitleFocus = FocusNode();
  final _pollDescriptionFocus = FocusNode();
  final _pollTagFocus = FocusNode();
  final _pollOptionFocus = FocusNode();
  final _pollImageUrlFocus = FocusNode();

  void addContentIfExists(
      {required List<String> targetList,
      required TextEditingController controller}) {
    if (controller.text.isNotEmpty) {
      setState(() {
        targetList.add(controller.text);
        controller.clear();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Create New Poll Request'),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16),
          child: ListView(
            children: <Widget>[
              // poll title
              const SizedBox(height: 4),
              CustomTextField(
                controller: _pollTitleController,
                focusNode: _pollTitleFocus,
                nextFocusNode: _pollDescriptionFocus,
                onChanged: (value) => pollData.pollTitle = value,
                label: 'Enter poll title',
              ),

              // poll description
              const SizedBox(height: 16),
              CustomTextField(
                controller: _pollDescriptionController,
                focusNode: _pollDescriptionFocus,
                nextFocusNode: _pollTagFocus,
                onChanged: (value) => pollData.pollDescription = value,
                label: 'Enter poll description',
                lines: 3,
              ),

              // added tags
              const SizedBox(height: 16),
              Wrap(
                spacing: 8,
                children: pollData.tags.map((tag) {
                  return Chip(
                    label: Text(tag),
                    deleteIcon: const Icon(Icons.close),
                    onDeleted: () {
                      setState(() {
                        pollData.tags.remove(tag);
                      });
                    },
                  );
                }).toList(),
              ),

              // new tag input
              TypeAheadField(
                textFieldConfiguration: TextFieldConfiguration(
                  controller: _pollTagController,
                  focusNode: _pollTagFocus,
                  decoration: const InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Enter tag',
                  ),
                  // onSubmitted: (_) {
                  //   if (_pollTagController.text.isNotEmpty) {
                  //     FocusScope.of(context).requestFocus(_pollTagFocus);
                  //   }
                  // },
                ),
                suggestionsCallback: (pattern) async {
                  print("v\nvsuggestioncallback\nv\n");
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
                  // FocusScope.of(context).unfocus();
                  // Future.delayed(const Duration(milliseconds: 50), () {
                  // });
                  FocusScope.of(context).requestFocus(_pollOptionFocus);
                },
              ),

              const SizedBox(height: 16),
              const SectionHeader(headerText: "Options"),
              ...pollData.options.map((option) => ListTile(
                    title: Text(option),
                    trailing: IconButton(
                      icon: const Icon(Icons.remove_circle_outline),
                      onPressed: () {
                        setState(() {
                          pollData.options.remove(option);
                        });
                      },
                    ),
                  )),

              // new option input
              const SizedBox(height: 16),
              TextField(
                controller: _pollOptionController,
                focusNode: _pollOptionFocus,
                onSubmitted: (_) {
                  // TODO: burasini kontrol et
                  if (_pollOptionController.text.isNotEmpty) {
                    setState(() {
                      pollData.options.add(_pollOptionController.text);
                      _pollOptionController.clear();
                    });
                    FocusScope.of(context).requestFocus(_pollImageUrlFocus);
                  }
                },
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Enter option',
                ),
              ),

              const SizedBox(height: 16),
              const SectionHeader(headerText: "Image URLs"),
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
                    trailing: IconButton(
                      icon: const Icon(Icons.remove_circle_outline),
                      onPressed: () {
                        setState(() {
                          pollData.imageURLs.remove(url);
                        });
                      },
                    ),
                  )),

              // image url input
              const SizedBox(height: 16),
              TextField(
                controller: _pollImageUrlController,
                focusNode: _pollImageUrlFocus,
                decoration: InputDecoration(
                  border: const OutlineInputBorder(),
                  labelText: 'URL of image resource',
                  suffixIcon: IconButton(
                    icon: const Icon(Icons.add),
                    onPressed: () => addContentIfExists(
                      targetList: pollData.imageURLs,
                      controller: _pollImageUrlController,
                    ),
                  ),
                ),
              ),

              const SizedBox(height: 16),
              // submit and cancel buttons
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  ElevatedButton(
                    onPressed: () {
                      // Handle the Send for Approval action here
                      print(pollData.pollTitle);
                      print(pollData.pollDescription);
                      print(pollData.options);
                      print(pollData.imageURLs);
                      print(pollData.tags);
                    },
                    child: const Text('Send for Approval'),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      // Handle the Cancel action here
                    },
                    child: const Text('Cancel'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
