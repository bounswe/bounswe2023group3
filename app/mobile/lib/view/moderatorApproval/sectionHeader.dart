import 'package:flutter/material.dart';

import '../constants.dart';

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
          color: navy,
          fontWeight: FontWeight.bold,
          fontSize: 18,
        ),
      ),
    );
  }
}
