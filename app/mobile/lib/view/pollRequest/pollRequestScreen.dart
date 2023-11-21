import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:mobile_app/services/PollRequestService.dart';
import 'package:mobile_app/services/tagCompletionService.dart';
import 'package:mobile_app/view/pollRequest/customTextField.dart';
import 'package:mobile_app/view/pollRequest/pollCreationData.dart';
import 'package:mobile_app/view/pollRequest/sectionHeader.dart';
import 'package:mobile_app/view/state.dart';

import '../constants.dart';

class PollRequestPage extends StatefulWidget {
  const PollRequestPage({super.key});

  @override
  State<PollRequestPage> createState() => _PollRequestPageState();
}

class _PollRequestPageState extends State<PollRequestPage> {
  PollCreationData pollData = PollCreationData();

  final _listViewScrollController = ScrollController();

  final _pollTitleController = TextEditingController();
  final _pollDescriptionController = TextEditingController();
  final _pollTagController = TextEditingController();
  final List<TextEditingController> _pollOptionControllers = [
    TextEditingController(),
    TextEditingController(),
  ];
  final _pollImageUrlController = TextEditingController();
  final _pollCreationDateTimeController = TextEditingController();
  bool dateTimeEdited = false;

  final _dateTimeFocus = FocusNode();
  final _pollTitleFocus = FocusNode();
  final _pollDescriptionFocus = FocusNode();
  final _pollTagFocus = FocusNode();
  final List<FocusNode> _pollOptionFocuses = [
    FocusNode(),
    FocusNode(),
  ];
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

  String _formatDateTime(DateTime dateTime) {
    return "${dateTime.year}-${dateTime.month}-${dateTime.day} ${dateTime.hour}"
        ":${dateTime.minute}";
  }

  void _updateOptionFields() {
    bool allFilled = _pollOptionControllers.every(
      (controller) => controller.text.isNotEmpty,
    );

    // Check for more than one empty field when there's at least one filled field.
    int emptyFields =
        _pollOptionControllers.where((c) => c.text.isEmpty).length;
    bool hasFilledField = _pollOptionControllers.any((c) => c.text.isNotEmpty);

    if (allFilled) {
      _pollOptionControllers.add(TextEditingController());
      _pollOptionFocuses.add(FocusNode());
    } else if (emptyFields > 1 && hasFilledField) {
      // Remove all empty fields except one
      while (emptyFields > 1) {
        int lastEmpty =
            _pollOptionControllers.lastIndexWhere((c) => c.text.isEmpty);
        if (lastEmpty > -1) {
          _pollOptionControllers.removeAt(lastEmpty);
          _pollOptionFocuses.removeAt(lastEmpty);
          emptyFields--;
        }
      }
    }

    setState(() {});
  }

  List<String> nonEmptyTexts(List<TextEditingController> controllers) {
    return controllers
        .map((c) => c.text)
        .where((text) => text.isNotEmpty)
        .toList();
  }

  void sendForApproval() async {
    //pollData.creatorId = AppState.loggedInUserId;
    if (!dateTimeEdited) {
      int scrollUpDurationMillis = 300;
      _showAlert('You didn\'t enter Date/Time', () {
        _listViewScrollController.animateTo(
          0, // Scroll to the top of the ListView
          duration: Duration(milliseconds: scrollUpDurationMillis),
          curve: Curves.easeInOut, // This is the animation curve
        );
        Future.delayed(Duration(milliseconds: scrollUpDurationMillis), () {
          // FocusScope.of(context).requestFocus(_dateTimeFocus);
          _selectDateTime();
        });
      });
      return;
    }

    if (pollData.pollTitle.isEmpty) {
      _showAlert('Title field cannot be empty', () {});
      FocusScope.of(context).requestFocus(_pollTitleFocus);
      return;
    }

    if (pollData.pollDescription.isEmpty) {
      _showAlert('Description field cannot be empty', () {});
      FocusScope.of(context).requestFocus(_pollDescriptionFocus);
      return;
    }
    if (pollData.tags.isEmpty) {
      _showAlert('At least one tag is required', () {});
      FocusScope.of(context).requestFocus(_pollTagFocus);
      return;
    }
    pollData.options = nonEmptyTexts(_pollOptionControllers);
    if (pollData.options.length < 2) {
      _showAlert('At least two options are required', () {});
      int lastEmpty =
          _pollOptionControllers.lastIndexWhere((c) => c.text.isEmpty);
      FocusScope.of(context).requestFocus(_pollOptionFocuses[lastEmpty]);
      return;
    }

    try {
      await PollRequestService.createPoll(pollData);
      _showAlert("Your poll creation request is succesfully sent", () {});
    } catch (e) {
      _showAlert(
          "There was an error sending your poll creation "
          "request ${e.toString()}",
          () {});
    }
  }

  void _showAlert(String message, Function okeyPressed) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: Text(message),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
                okeyPressed();
              },
            ),
          ],
        );
      },
    );
  }

  Future<void> _selectDateTime() async {
    var dateTimeTheme = ThemeData.light().copyWith(
      colorScheme: const ColorScheme.light(
        primary: blue, // header background color
        onPrimary: whitish, // header text color
        onSurface: deepDarkBlue, // body text color
      ),
      dialogBackgroundColor: whitish,
    );
    DateTime? pickedDate = await showDialog(
      context: context,
      builder: (BuildContext context) {
        return Theme(
          data: dateTimeTheme,
          child: DatePickerDialog(
            initialDate: pollData.dueDate,
            firstDate: DateTime(2000),
            lastDate: DateTime(2100),
          ),
        );
      },
    );

    if (!mounted) return;
    if (pickedDate != null) {
      TimeOfDay? pickedTime = await showDialog(
        context: context,
        builder: (BuildContext context) {
          return Theme(
            data: dateTimeTheme,
            child: TimePickerDialog(
              initialTime: TimeOfDay.fromDateTime(pollData.dueDate),
            ),
          );
        },
      );
      dateTimeEdited = true;

      if (pickedTime != null) {
        setState(() {
          pollData.dueDate = DateTime(
            pickedDate.year,
            pickedDate.month,
            pickedDate.day,
            pickedTime.hour,
            pickedTime.minute,
          );
          _pollCreationDateTimeController.text =
              _formatDateTime(pollData.dueDate);
        });
      }
    }

    // Focus on the next field only if the context is still mounted after the dialogs.
    if (mounted) {
      FocusScope.of(context).requestFocus(_pollTitleFocus);
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
            controller: _listViewScrollController,
            children: <Widget>[
              const SizedBox(height: 16),
              Row(
                children: <Widget>[
                  Expanded(
                    child: Container(
                      decoration: BoxDecoration(
                        color: whitish,
                        borderRadius: BorderRadius.circular(10.0),
                        border: Border.all(
                          color: navy,
                        ),
                      ),
                      child: TextField(
                        onTap: _selectDateTime,
                        controller: _pollCreationDateTimeController,
                        focusNode: _dateTimeFocus,
                        decoration: const InputDecoration(
                          labelText: 'Select Date and Time',
                          border: OutlineInputBorder(),
                        ),
                        readOnly: true, // Prevent manual editing
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.calendar_today),
                    onPressed: _selectDateTime,
                  ),
                ],
              ),
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
                    backgroundColor: pink,
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

              const SizedBox(height: 16),
              const SectionHeader(headerText: "Options"),
              for (var i = 0; i < _pollOptionControllers.length; i++)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: Container(
                    decoration: BoxDecoration(
                      color: whitish,
                      border: Border.all(color: navy),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    // padding: const EdgeInsets.fromLTRB(0, 16, 0, 0),
                    child: TextField(
                      controller: _pollOptionControllers[i],
                      focusNode: _pollOptionFocuses[i],
                      onChanged: (_) => _updateOptionFields(),
                      onSubmitted: (_) {
                        if (_pollOptionControllers[i].text.isNotEmpty &&
                            i < _pollOptionControllers.length - 1) {
                          FocusScope.of(context)
                              .requestFocus(_pollOptionFocuses[i + 1]);
                        } else {
                          FocusScope.of(context)
                              .requestFocus(_pollImageUrlFocus);
                        }
                      },
                      decoration: InputDecoration(
                        border: const OutlineInputBorder(),
                        labelText: 'Enter option ${i + 1}',
                      ),
                    ),
                  ),
                ),

              // image url input
              const SizedBox(height: 16),
              const SectionHeader(headerText: "Image URLs"),
              const SizedBox(height: 16),
              Container(
                decoration: BoxDecoration(
                  color: whitish,
                  border: Border.all(color: navy),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: TextField(
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
              ),

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

              const SizedBox(height: 16),
              // submit and cancel buttons
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  ElevatedButton(
                    onPressed: sendForApproval,
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
