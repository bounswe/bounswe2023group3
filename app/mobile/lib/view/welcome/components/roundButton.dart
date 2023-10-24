import 'package:flutter/material.dart';

class RoundButton extends StatelessWidget {
  const RoundButton({super.key});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Colors.blue,
      body: SafeArea(
        child: Center(
          child: ElevatedButton(
            onPressed: () {
              // Navigate to Sign Up Page
              print("welcome.WelcomeScreen.build.Scaffold.Center.Column."
                  "ElevatedButton: navigate to sign up page");
            },
            child: Stack(
              children: [
                const Text(
                  'Sign Up',
                  style: TextStyle(
                      fontSize: 20,
                      color: Colors.white,
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Container(
                      padding: EdgeInsets.all(7),
                      child: Icon(Icons.arrow_forward, color: Colors.white),
                    )
                  ],
                )
              ],
            ),
            style: ElevatedButton.styleFrom(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
              minimumSize: Size(size.width * 0.7, 50),
            ),
          ),
        ),
      ),
    );
  }
}
