import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:mobile_app/services/pollRequestService.dart';
import 'package:mobile_app/services/tagCompletionService.dart';
import 'package:mobile_app/view/pollRequest/customContainer.dart';
import 'package:mobile_app/view/pollRequest/customTextField.dart';
import 'package:mobile_app/view/pollRequest/pollCreationAnnotate.dart';
import 'package:mobile_app/models/pollCreationData.dart';
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
  final _pollTagFocus = FocusNode();
  final List<FocusNode> _pollOptionFocuses = [
    FocusNode(),
    FocusNode(),
  ];
  final _pollImageUrlFocus = FocusNode();

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
    bool isDueDateBeforeToday = pollData.dueDate.isBefore(DateTime.now());
    if (!dateTimeEdited || isDueDateBeforeToday) {
      int scrollUpDurationMillis = 300;
      var allertMessage = dateTimeEdited
          ? "Due date cannot be before than today"
          : "You didn't enter Date/Time";
      _showAlert(allertMessage, () {
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

    if (pollData.question.isEmpty) {
      _showAlert('Title field cannot be empty', () {});
      FocusScope.of(context).requestFocus(_pollTitleFocus);
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
    pollData.creationDate = DateTime.now();
    try {
      await PollRequestService.createPoll(pollData);
      _showAlert("Your poll creation request is succesfully sent", () {
        Navigator.pop(context);
      });

      setState(() {});
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
                    child: CustomTextField(
                      nextFocusNode: null,
                      onTap: _selectDateTime,
                      controller: _pollCreationDateTimeController,
                      focusNode: _dateTimeFocus,
                      label: 'Select Date and Time',
                      readOnly: true, // Prevent manual editing
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
                nextFocusNode: _pollTagFocus,
                onChanged: (value) => pollData.question = value,
                label: 'Enter Question',
                lines: null,
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
              CustomTextField(
                  label: 'Enter tag',
                  controller: _pollTagController,
                  focusNode: _pollTagFocus,
                  nextFocusNode: _pollOptionFocuses[0],
                  skipNexWhenEmpty: true,
                  onSubmitted: (value) {
                    setState(() {
                      pollData.tags.add(value);
                      _pollTagController.clear();
                    });
                  }),

              const SizedBox(height: 16),
              const SectionHeader(headerText: "Options"),
              for (var i = 0; i < _pollOptionControllers.length; i++)
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: CustomTextField(
                    label: 'Enter option ${i + 1}',
                    controller: _pollOptionControllers[i],
                    focusNode: _pollOptionFocuses[i],
                    onChanged: (_) => _updateOptionFields(),
                    skipNexWhenEmpty: true,
                    nextFocusNode: i == _pollOptionControllers.length - 1
                        ? _pollImageUrlFocus
                        : _pollOptionFocuses[i + 1],
                  ),
                ),

              // image url input
              const SizedBox(height: 16),
              const SectionHeader(headerText: "Image URLs"),
              const SizedBox(height: 16),
              CustomTextField(
                controller: _pollImageUrlController,
                focusNode: _pollImageUrlFocus,
                nextFocusNode: _pollImageUrlFocus,
                label: "Enter image URL",
                onSubmitted: (value) {
                  pollData.imageURLs.add(value);
                  _pollImageUrlController.clear();
                  // show a snackbar to inform the user
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Image URL added"),
                      duration: Duration(seconds: 1),
                    ),
                  );
                  setState(() {});
                },
              ),
              // already added image urlss and their previews and delete buttons
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
                            border: Border.all(color: gray),
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
              // submit and annotate buttons
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  ElevatedButton(
                    onPressed: sendForApproval,
                    child: const Text('Send for Approval'),
                  ),
                  const SizedBox(width: 20),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.of(context)
                          .push(MaterialPageRoute(builder: (_) {
                        return PollCreationAnnotate(pollInfo: pollData);
                      }));
                      // Handle the Cancel action here
                    },
                    child: const Text('Annotate'),
                  ),
                  IconButton(
                    icon: const Icon(Icons.info_outline),
                    onPressed: () => _showAlert(
                        "You can select the parts of your"
                        " poll title and description "
                        "and add explanations about them.",
                        () {}),
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
