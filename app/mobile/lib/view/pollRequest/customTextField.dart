import 'package:flutter/material.dart';

class CustomTextField extends StatelessWidget {
  final TextEditingController controller;
  final FocusNode focusNode;
  final FocusNode? nextFocusNode;
  final int? lines;
  final Function(String) onChanged;
  final String label;

  const CustomTextField({
    Key? key,
    required this.controller,
    required this.focusNode,
    this.nextFocusNode,
    required this.onChanged,
    required this.label,
    this.lines,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      focusNode: focusNode,
      onChanged: onChanged,
      minLines: lines ?? 1,
      maxLines: 7,
      onSubmitted: (_) {
        if (nextFocusNode != null && controller.text.isNotEmpty) {
          FocusScope.of(context).requestFocus(nextFocusNode);
        }
      },
      decoration: InputDecoration(
        border: const OutlineInputBorder(),
        labelText: label,
      ),
    );
  }
}
