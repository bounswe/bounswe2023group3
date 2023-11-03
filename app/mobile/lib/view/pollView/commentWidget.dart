import 'package:flutter/material.dart';

import '../constants.dart';

class CommentWidget extends StatelessWidget {
  final String user;
  final String commentText;

  const CommentWidget(
      {super.key, required this.user, required this.commentText});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20.0),
          border: Border.all(color: navy),
          color: gray,
        ),
        child: ListTile(
          title: Text(user),
          subtitle: Text(commentText),
        ),
      ),
    );
  }
}
