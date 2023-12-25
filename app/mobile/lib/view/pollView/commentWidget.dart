import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/services/ReportService.dart';
import 'package:mobile_app/services/createCommentService.dart';
import 'package:mobile_app/view/helpers/dateTime.dart';
import 'package:mobile_app/view/pollView/clickableUsername.dart';
import 'package:mobile_app/view/state.dart';

import '../constants.dart';

class CommentWidget extends StatefulWidget {
  final String username;
  final String userId;
  final String commentText;
  final String commentId;
  final String dateTime;
  final void Function() parentSetState;

  const CommentWidget({
    super.key,
    required this.username,
    required this.commentText,
    required this.commentId,
    required this.dateTime,
    required this.userId,
    required this.parentSetState,
  });

  @override
  State<CommentWidget> createState() => _CommentWidgetState();
}

class _CommentWidgetState extends State<CommentWidget> {
  void _deleteComment() async {
    await PostCommentService.deleteComment(widget.commentId);
    widget.parentSetState();
  }

  void report(String reason) async {
    var result = await ReportService.report(widget.userId, reason);
    // show a dialog to inform the user about the result
    if (!context.mounted) return;
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Report User'),
          content: Text(result
              ? 'User reported successfully'
              : 'User could not be reported'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  // a dialog to show input the reason for reporting
  void showReportDialog(BuildContext context) {
    final TextEditingController reasonController = TextEditingController();
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Report User'),
          content: TextField(
            controller: reasonController,
            decoration: const InputDecoration(
              hintText: 'Reason',
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                report(reasonController.text);
                Navigator.pop(context);
              },
              child: const Text('Report'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(8, 0, 8, 6),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
          border: Border.all(color: gray, width: 2),
          color: whitish,
        ),
        child: Stack(
          children: [
            ListTile(
              title: ClickableUsername(
                username: widget.username,
                displayName: widget.username,
              ),
              subtitle: Text(widget.commentText),
            ),
            Positioned(
              top: 12,
              right: 60,
              child: Text(
                DateFormat('MMM d\'th\', HH:mm')
                    .format(DateTime.parse(widget.dateTime)),
              ),
            ),
            if (widget.username == AppState.loggedInUserUsername)
              Positioned(
                top: -4,
                right: -4,
                child: IconButton(
                  icon: const Icon(Icons.delete),
                  color: Colors.grey.shade700,
                  onPressed: () {
                    _deleteComment();
                    print("delete onpressed");
                  },
                ),
              )
            else
              Positioned(
                top: -4,
                right: -4,
                child: IconButton(
                  color: Colors.grey.shade700,
                  icon: const Icon(Icons.report),
                  onPressed: () {
                    showReportDialog(context);
                    print("report onpressed");
                  },
                ),
              )
          ],
        ),
      ),
    );
  }
}
