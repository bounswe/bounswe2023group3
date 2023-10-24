import 'package:flutter/material.dart';
import 'view/login/loginScreen.dart';
import 'view/signup/signupScreen.dart';

void main() => runApp(MaterialApp(
    initialRoute: '/login',
    routes: {
      '/login': (context) => const LoginScreen(),
      '/sign': (context) => const SignupScreen(),
    }
));