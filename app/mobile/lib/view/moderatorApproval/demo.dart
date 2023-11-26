import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/moderatorApproval/moderatorApprovalScreen.dart';
import 'pollData.dart';

// added this main here for debugging purposes.
// to run this window directly.
void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});



  @override
  Widget build(BuildContext context) {

    return MaterialApp(
      title: 'Poll Request',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primaryColor: navy,
        scaffoldBackgroundColor: lightBlue,
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: navy,
            textStyle: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        buttonTheme: const ButtonThemeData(
          buttonColor: blue,
          textTheme: ButtonTextTheme.primary,
        ),
        textTheme: const TextTheme(
          labelLarge: TextStyle(
            color: whitish,
          ),
        ),
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            foregroundColor: navy, textStyle: const TextStyle(
            // fontSize: 15,
            // fontWeight: FontWeight.bold,
          ),
          ),
        ),
        appBarTheme: const AppBarTheme(
          backgroundColor: deepDarkBlue,
          elevation: 0,
          titleTextStyle: TextStyle(
            color: whitish,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
          iconTheme: IconThemeData(
            color: Colors.white,
          ),
        ),
      ),
      home: const ModeratorApprovalScreen(
        tagColors: [Colors.pink, Colors.blue],
        pollData: const PollData(
          pollId: "1",
          pollTitle: "Kim kazanir?",
          pollDescription: "Kimin kazanacagini secebilir misiniz  helimin kazanacagini secebilir misiniz  heimin kazanacagini secebilir misiniz  heimin kazanacagini secebilir misiniz  heppp?",
          dueDate: "18/11/2023",
          imageURLs: [],
          tags: ["Football", "Sports"],
          options: ["Basaksehir", "Besiktas"],
        ),
      ),
    );
  }
}
