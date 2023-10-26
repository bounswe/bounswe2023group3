import 'package:flutter/material.dart';

class SectionHeader extends StatelessWidget {
  final String headerText;
  const SectionHeader({super.key, required this.headerText});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        headerText,
        style: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 18,
        ),
      ),
    );
  }
}
