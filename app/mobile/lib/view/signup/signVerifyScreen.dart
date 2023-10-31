import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
import 'package:mobile_app/services/signUpVerification.dart';
import 'package:dio/dio.dart';
import 'package:mobile_app/view/forgetPassword/customTextField.dart';

class SignVerifyScreen extends StatefulWidget {
  const SignVerifyScreen({super.key});

  @override
  State<SignVerifyScreen> createState() => _SignVerifyScreen();
}

class _SignVerifyScreen extends State<SignVerifyScreen> {
  bool isEmailValid = true; // Track email validation
  bool emptyEmail = false;
  bool emptyOTP = false;
  bool isOTPNumeric = true;
  bool isOTPCorrectLength = true;

  final TextEditingController emailController = TextEditingController();
  final TextEditingController OTPController = TextEditingController();

  void validateEmail(String email) {
    setState(() {
      emptyEmail = false;
      emptyOTP = false;
      if (email.isEmpty) {
        isEmailValid = true;
      } else {
        isEmailValid = EmailValidator.validate(email);
      }
    });
  }

  void validateOTP(String OTP) {
    setState(() {
      emptyOTP = false;
      emptyEmail = false;

      RegExp numericPattern =
          RegExp(r'^-?[0-9]+$'); //check if the string is numeric or not

      if (OTP.isEmpty) {
        isOTPNumeric = true;
        isOTPCorrectLength = true;
      } else {
        isOTPCorrectLength =
            OTP.length == 4; // For example, OTP length must be 4.
        isOTPNumeric = numericPattern.hasMatch(OTP);
      }
    });
  }

  String errorTextOTP() {
    String errorText = "";
    if (isOTPNumeric && isOTPCorrectLength) {
      errorText = "";
    } else if (isOTPNumeric) {
      errorText = "Code must be 4 digits!";
    } else if (isOTPCorrectLength) {
      errorText = "Code must contain only numbers!";
    } else {
      errorText = "Code must contain only numbers and must be 4 digits!";
    }
    return errorText;
  }

  void verify() async {
    String email = emailController.text;
    String OTP = OTPController.text;
    if (email.isEmpty) {
      setState(() {
        emptyEmail = true;
      });
    }

    if (OTP.isEmpty) {
      setState(() {
        emptyOTP = true;
      });
    }
    if (emptyEmail || emptyOTP) {
      return;
    }
    // Perform email verification and navigate to the next screen if successful
    SignUpVerification signUpVerification = SignUpVerification();

    try {
      Response response =
          await signUpVerification.submitMailandOTP(email, int.parse(OTP));

      if (response.statusCode == 201) {
        if (!context.mounted) return;
        Navigator.pushNamed(context, '/welcome');
      } else {
        if (!context.mounted) return;
      }
    } catch (e) {
      showErrorMessage(context);
    }
  }

  void showErrorMessage(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Email or OTP or both are incorrect'),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      appBar: AppBar(
        title: Text('Verify Your Email'),
      ),
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                'Enter your email and verification code for verification',
                style: TextStyle(fontSize: 15.0),
              ),
              const SizedBox(height: 20.0),
              CustomTextField(
                labelText: 'Email',
                controller: emailController,
                keyboardType: TextInputType.emailAddress,
                onChanged: validateEmail,
                errorText: isEmailValid ? "" : 'Enter a valid email',
              ),
              const SizedBox(height: 20.0),
              CustomTextField(
                labelText: 'Verification Code',
                controller: OTPController,
                onChanged: validateOTP,
                errorText: errorTextOTP(),
              ),
              const SizedBox(height: 20.0),
              ElevatedButton(
                onPressed: (isEmailValid && isOTPNumeric && isOTPCorrectLength)
                    ? verify
                    : null,
                child: Text('Verify!'),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: Column(
                  children: [
                    Text(
                      emptyEmail ? 'Email cannot be empty' : '',
                      style: TextStyle(
                        color: Colors.red[900],
                      ),
                    ),
                    Text(
                      emptyOTP ? 'OTP cannot be empty' : '',
                      style: TextStyle(
                        color: Colors.red[900],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
