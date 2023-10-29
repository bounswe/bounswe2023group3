import 'package:flutter/material.dart';
import 'package:mobile_app/view/welcome/welcome.dart';
import 'view/login/loginScreen.dart';
import 'view/signup/signupScreen.dart';
import 'package:mobile_app/services/apiService.dart';

void main() async{
  ApiService.setup();
  await ApiService.init();
  runApp(MaterialApp(
    initialRoute: '/welcome',
    routes: {
      '/login': (context) => const LoginScreen(),
      '/welcome': (context) => const WelcomeScreen(),
      '/sign': (context) => const SignupScreen(),
    },
  ));
}