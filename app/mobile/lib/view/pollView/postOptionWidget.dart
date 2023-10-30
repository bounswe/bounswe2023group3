import 'package:flutter/material.dart';

class PostOptionWidget extends StatelessWidget {
  final String optionText;
  final VoidCallback onPressed;

  const PostOptionWidget(
      {super.key, required this.optionText, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: GestureDetector(
        onTap: onPressed,
        child: Container(
          padding: const EdgeInsets.all(8.0),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20.0),
            border: Border.all(color: Colors.grey),
            color: Colors.grey[200],
          ),
          child: Text(optionText),
        ),
      ),
    );
  }
}
