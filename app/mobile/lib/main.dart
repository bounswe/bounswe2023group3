import 'package:flutter/material.dart';
import 'view/login/loginScreen.dart';

void main() => runApp(MaterialApp(
    initialRoute: '/login',
    routes: {
      '/login': (context) => const LoginScreen(),
    }
));