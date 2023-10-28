import 'package:flutter/material.dart';
import 'package:mobile_app/view/welcome/welcome.dart';
import 'view/login/loginScreen.dart';
import 'view/signup/signupScreen.dart';
import 'view/pollView/pollView.dart';

void main() => runApp(MaterialApp(
      initialRoute: '/demo_post',
      routes: {
        '/login': (context) => const LoginScreen(),
        '/welcome': (context) => const WelcomeScreen(),
        '/sign': (context) => const SignupScreen(),
        '/demo_post': (context) => PollPage(
          userName: 'John Doe',
          userUsername: '@john_doe',
          profilePictureUrl: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
          postTitle: 'Awesome Post',
          tags: const ['Flutter', 'Dart'],
          tagColors: const [Colors.blue, Colors.green],
          voteCount: 100,
          postOptions: const ['Option 1', 'Option 2'],
          likeCount: 50,
          dateTime: 'YYYY-MM-DD HH:mm',
          comments: [
            CommentData(user: 'User1', commentText: 'Great post!'),
            CommentData(user: 'User2', commentText: 'I agree!'),
            // Add more comments as needed
          ],
        )
      },
    ));
