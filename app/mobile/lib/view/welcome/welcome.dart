import 'package:flutter/material.dart';

import '../../constants.dart';


class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        title: Text('Welcome'),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton(

                onPressed: () {
                  Navigator.pushNamed(context, '/login');
                },
                style: ElevatedButton.styleFrom(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  minimumSize: Size(size.width*0.7, 50),
                  backgroundColor: primaryColor,

                ),
                child: Text(
                  'Login',
                  style: TextStyle(fontSize: 20),
                ),

              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Navigate to Sign Up Page
                print("welcome.WelcomeScreen.build.Scaffold.Center.Column."
                    "ElevatedButton: navigate to sign up page");
              },
              child: Text(
                'Sign Up',
                style: TextStyle(fontSize: 20),
              ),
              style: ElevatedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                minimumSize: Size(size.width*0.7, 50),
                backgroundColor: primaryLightColor,
              ),
            ),
            SizedBox(height: 20),
            TextButton(
              onPressed: () {
                // Continue as Guest
                print("welcome.WelcomeScreen.build.Scaffold.Center.Column."
                    "TextButton: Continue as Guest");
              },
              child: Text('Continue as Guest'),
            ),
          ],
        ),
      ),
    );
  }
}
