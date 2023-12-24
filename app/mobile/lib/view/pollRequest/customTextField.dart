import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/pollRequest/customContainer.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final FocusNode focusNode;
  final FocusNode? nextFocusNode;
  final int? lines;
  final void Function(String)? onChanged;
  final void Function()? onTap;
  final String label;

  /// checks for controller is empty.
  /// if not empty, calls onSubmitted.
  /// if nextFocusNode is not null, focuses on nextFocusNode.
  /// see [skipNexWhenEmpty]
  final void Function(String)? onSubmitted;
  final bool readOnly;

  /// if true, skips nextFocusNode even if the controller is empty.
  final bool skipNexWhenEmpty;
  const CustomTextField({
    Key? key,
    required this.controller,
    required this.focusNode,
    this.nextFocusNode,
    this.onChanged,
    required this.label,
    this.lines = 1,
    this.onSubmitted,
    this.skipNexWhenEmpty = false,
    this.readOnly = false,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CustomContainer(
      backgroundColor: whitish,
      borderRadius: 10.0,
      borderWidth: 2.0,
      borderColor: navy,
      child: TextField(
        onTap: onTap,
        readOnly: readOnly,
        controller: controller,
        focusNode: focusNode,
        onChanged: onChanged,
        minLines: lines,
        maxLines: lines,
        onSubmitted: (val) {
          if ((skipNexWhenEmpty || controller.text.isNotEmpty) &&
              nextFocusNode != null) {
            FocusScope.of(context).requestFocus(nextFocusNode);
          }
          if (controller.text.isNotEmpty && onSubmitted != null) {
            onSubmitted!(val);
            return;
          }
        },
        decoration: InputDecoration(
          border: const OutlineInputBorder(),
          labelText: label,
        ),
      ),
    );
  }
}
