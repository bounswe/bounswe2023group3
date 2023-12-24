import 'package:flutter/material.dart';

import '../pollView/tagWidget.dart';
class TagListWidget extends StatelessWidget {
  final List<String> tags;
  final List<Color> tagColors;

  const TagListWidget({super.key, required this.tags, required this.tagColors});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          for (int i = 0; i < tags.length; i++)
            Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4.0),
                child: TagWidget(tagText: tags[i], tagColor: tagColors[i])),
        ],
      ),
    );
  }
}