import 'package:flutter/material.dart';
import 'package:mobile_app/view/welcome/welcome.dart';
import 'view/login/loginScreen.dart';
import 'view/signup/signupScreen.dart';
import 'package:mobile_app/view/homePage/homePage.dart';


void main() => runApp(MaterialApp(
      initialRoute: '/welcome',
      routes: {
        '/login': (context) => const LoginScreen(),
        '/welcome': (context) => const WelcomeScreen(),
        '/sign': (context) => const SignupScreen(),
        '/home': (context) => const HomePage(),
      },
    ));
