import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
import 'package:mobile_app/services/emailVerification.dart';
import 'package:mobile_app/view/forgetpassword/customTextField.dart';
import 'package:http/http.dart' as http;

class ForgetPassInitScreen extends StatefulWidget {

  const ForgetPassInitScreen({super.key});

  @override
  State<ForgetPassInitScreen> createState() => _ForgetPassInitScreenState();
}

class _ForgetPassInitScreenState extends State<ForgetPassInitScreen> {

  bool isEmailValid = true; // Track email validation
  bool emptyEmail = false;
  bool emailFound = false;


  final TextEditingController emailController = TextEditingController();

  void validateEmail(String email) {
    setState(() {
      emptyEmail = false;
      if (email.isEmpty) {
        isEmailValid = true;
      } else {
        isEmailValid = EmailValidator.validate(email);
      }
    });
  }

  void resetPass() async {
    String email = emailController.text;
    if (email.isEmpty) {
      setState(() {
        emptyEmail = true;
      });
    }

    if (emptyEmail) {
      return;
    }
    // Perform email verification and navigate to the next screen if successful
    EmailVerification emailVerification = EmailVerification();
    http.Response response = await emailVerification.login(email);
    print(response.body);

    //NEW: there will be code that connects response to emailFound
    Navigator.pushReplacementNamed(context, '/fpassOTP',);
    if(emailFound == true){
      //Navigator.pushNamed(context, "");
    }



  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Forget Password'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Enter your email to reset your password',
              style: TextStyle(fontSize: 15.0),
            ),
            SizedBox(height: 20.0),
            CustomTextField(
              labelText: 'Email',
              controller: emailController,
              keyboardType: TextInputType.emailAddress,
              onChanged: validateEmail,
              errorText: isEmailValid ? "" : 'Enter a valid email',
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              onPressed: isEmailValid ? resetPass : null,
              child: Text('Reset Password'),
            ),

          ],
        ),
      ),
    );
  }
}
