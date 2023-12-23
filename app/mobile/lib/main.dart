import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/guestFeed/guestFeed.dart';
import 'package:mobile_app/view/moderatorApply/moderatorApplyScreen.dart';
import 'package:mobile_app/view/moderatorLogin/moderatorLoginScreen.dart';
import 'package:mobile_app/view/signup/signVerifyScreen.dart';
import 'package:mobile_app/view/welcome/welcome.dart';
import 'view/login/loginScreen.dart';
import 'view/signup/signupScreen.dart';
import 'view/forgetPassword/forgetPassInitScreen.dart';
import 'view/forgetPassword/forgetPassVerifyScreen.dart';
import 'package:mobile_app/view/homePage/homePage.dart';
import 'package:mobile_app/view/moderatorHomePage/moderatorHomePage.dart';
import 'package:mobile_app/services/apiService.dart';
import 'view/pollRequest/pollRequestScreen.dart';
import 'view/searchPage/searchPage.dart';
import 'package:flutter/services.dart';

void main() async {
  ApiService.setup();
  await ApiService.init();
  // TODO uncomment
  // SystemSound.play(SystemSoundType.click);
  runApp(MaterialApp(
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
          foregroundColor: navy,
          textStyle: const TextStyle(
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
    initialRoute: '/welcome',
    routes: {
      '/login': (context) => const LoginScreen(),
      '/welcome': (context) => const WelcomeScreen(),
      '/sign': (context) => const SignupScreen(),
      '/home': (context) => HomePage(),
      '/search': (context) => const SearchPage(),
      '/fpassinit': (context) => const ForgetPassInitScreen(),
      '/fpassverify': (context) => const ForgetPassVerifyScreen(),
      '/pollreq': (context) => const PollRequestPage(),
      '/signverify': (context) => const SignVerifyScreen(),
      '/moderatorHome': (context) => const ModeratorHomePage(),
      '/moderatorLogin': (context) => const ModeratorLoginScreen(),
      '/moderatorApply': (context) => const ModeratorApplyScreen(),
      '/guest': (context) => const GuestFeed(),
    },
  ));
}
