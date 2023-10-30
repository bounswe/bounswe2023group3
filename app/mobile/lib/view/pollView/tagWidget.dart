import 'package:flutter/material.dart';

class TagWidget extends StatelessWidget {
  final String tagText;
  final Color tagColor;

  const TagWidget({super.key, required this.tagText, required this.tagColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 6.0),
      decoration: BoxDecoration(
        color: tagColor,
        borderRadius: BorderRadius.circular(20.0),
      ),
      child: Text(tagText, style: const TextStyle(color: Colors.white)),
    );
  }
}
