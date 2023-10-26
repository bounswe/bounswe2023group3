import 'package:flutter/material.dart';
import 'package:mobile_app/view/pollRequest/pollRequestScreen.dart';

// added this main here for debugging purposes.
// to run this window directly.
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Poll Request',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const PollRequestPage(),
    );
  }
}
