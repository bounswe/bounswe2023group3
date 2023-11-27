import 'package:flutter/material.dart';
import 'package:mobile_app/ScreenArguments.dart';

class WelcomeScreen extends StatefulWidget {


  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {

  final GlobalKey<ScaffoldState> scaffoldKey = new GlobalKey<ScaffoldState>();


  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance!.addPostFrameCallback((_) {
      showSnackBarIfNeeded();
    });
  }

  void showSnackBarIfNeeded(){
    final argsTemp = ModalRoute.of(context)?.settings.arguments;

    if(argsTemp!=null){
      final args = argsTemp as ScreenArguments;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(args.message),
          duration: Duration(seconds: 3),
          backgroundColor: Color(0xFF61EE64),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {



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
            const SizedBox(height: 30),
            Image.asset(
              "assets/app-logo-white.png",
              scale: 3.5,
              color: Colors.black,

            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(30.0,40.0,30.0,0),
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
