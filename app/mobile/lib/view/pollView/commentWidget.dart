import 'package:flutter/material.dart';

class CommentWidget extends StatelessWidget {
  final String user;
  final String commentText;

  const CommentWidget(
      {super.key, required this.user, required this.commentText});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(user),
      subtitle: Text(commentText),
    );
  }
}
