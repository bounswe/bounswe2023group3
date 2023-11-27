import 'package:flutter/material.dart';

class WelcomeScreen extends StatelessWidget {


  const WelcomeScreen({super.key});






  @override
  Widget build(BuildContext context) {
    final GlobalKey<ScaffoldState> scaffoldKey = new GlobalKey<ScaffoldState>();

    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        title: const Text('Welcome'),
        centerTitle: true,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            const SizedBox(height: 80),
            Padding(
              padding: const EdgeInsets.all(30.0),
              child: const Text(
                "Poll'up",
                style: TextStyle(fontSize: 50),
                textAlign: TextAlign.start,
              ),
            ),
            const SizedBox(height: 60),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/login');
              },
              style: ElevatedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                minimumSize: const Size(150, 50),
              ),
              child: const Text(
                'Login',
                style: TextStyle(fontSize: 20),
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // Navigate to Sign Up Page
                Navigator.pushNamed(context, '/sign');
              },
              style: ElevatedButton.styleFrom(
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                minimumSize: Size(150, 50),
              ),
              child: const Text(
                'Sign Up',
                style: TextStyle(fontSize: 20),
              ),
            ),
            const SizedBox(height: 20),
            TextButton(
              onPressed: () {
                // Continue as Guest
                print("welcome.WelcomeScreen.build.Scaffold.Center.Column."
                    "TextButton: Continue as guest");
              },
              child: const Text('Continue as Guest',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),),
            ),

            const SizedBox(height: 5),
            TextButton(
              onPressed: () {
                // Navigate to the Moderator Login page
                Navigator.pushNamed(context, '/moderatorLogin');

              },
              child: const Text('Login as Moderator',
                style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),),
            ),
          ],
        ),
      ),
    );
  }
}
