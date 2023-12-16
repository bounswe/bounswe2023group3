import 'package:flutter/material.dart';
import 'package:mobile_app/view/profilePage/profilePage.dart';

class ClickableUsername extends StatefulWidget {
  final String username;
  final TextStyle? textStyle;

  const ClickableUsername({Key? key, required this.username, this.textStyle})
      : super(key: key);

  @override
  State<ClickableUsername> createState() => _ClickableUsernameState();
}

class _ClickableUsernameState extends State<ClickableUsername> {
  bool isUnderlined = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => setState(() => isUnderlined = true),
      onTapUp: (_) => setState(() => isUnderlined = false),
      onTap: () => navigateToProfile(context, widget.username),
      child: Text(
        widget.username,
        style: widget.textStyle?.copyWith(
                decoration: isUnderlined
                    ? TextDecoration.underline
                    : TextDecoration.none) ??
            TextStyle(
                decoration: isUnderlined
                    ? TextDecoration.underline
                    : TextDecoration.none),
      ),
    );
  }

  void navigateToProfile(BuildContext context, String username) {
    // Navigate to the profile page
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ProfilePage.withUsername(username: username),
      ),
    );
  }
}
