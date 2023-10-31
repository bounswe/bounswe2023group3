import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
import 'package:mobile_app/services/passwordResetVerification.dart';
import 'package:mobile_app/services/emailVerification.dart';
import 'package:mobile_app/view/forgetPassword/customTextField.dart';
import 'dart:developer';

class ForgetPassVerifyScreen extends StatefulWidget {

  const ForgetPassVerifyScreen({super.key});

  @override
  State<ForgetPassVerifyScreen> createState() => _ForgetPassVerifyScreenState();
}

class _ForgetPassVerifyScreenState extends State<ForgetPassVerifyScreen> {

  bool emptyPassword = false;
  bool emptyOTP = false;

  bool isPasswordValid = true;
  bool isOTPNumeric = true;
  bool isOTPCorrectLength = true;
  bool arePasswordsMatch = true;
  bool emptyMail = false;


  final TextEditingController passwordController = TextEditingController();
  final TextEditingController OTPController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  String email = "";

  // Add more validation logic for password as needed
  void validatePassword(String password) {
    setState(() {
      emptyPassword = false;
      emptyOTP = false;

      if(password.isEmpty){
        isPasswordValid = true;
      }
      else{
        // Define patterns to check for each password criteria
        final lengthPattern = RegExp(r'.{6,}');
        final uppercasePattern = RegExp(r'[A-Z]');
        final lowercasePattern = RegExp(r'[a-z]');
        final specialCharPattern = RegExp(r'[!@#\$%^&*(),.?":{}|<>]');
        final digitPattern = RegExp(r'[0-9]');

        // Check each criteria
        final isLengthValid = lengthPattern.hasMatch(password);
        final isUppercaseValid = uppercasePattern.hasMatch(password);
        final isLowercaseValid = lowercasePattern.hasMatch(password);
        final isSpecialCharValid = specialCharPattern.hasMatch(password);
        final isDigitValid = digitPattern.hasMatch(password);

        // Set isPasswordValid to true if all criteria are met
        isPasswordValid = isLengthValid &&
            isUppercaseValid &&
            isLowercaseValid &&
            isSpecialCharValid &&
            isDigitValid;
      }


    });
  }


  void validateConfirmPassword(String confirmPassword){
    setState(() {
      arePasswordsMatch =  passwordController.text == confirmPassword;
    });
  }


  void validateOTP(String OTP){
    setState(() {
      emptyPassword = false;
      emptyOTP = false;

      RegExp numericPattern = RegExp(r'^-?[0-9]+$'); //check if the string is numeric or not

      if (OTP.isEmpty) {
        isOTPNumeric = true;
        isOTPCorrectLength = true;
      } else {
        isOTPCorrectLength = OTP.length == 4; // For example, OTP length must be 4.
        isOTPNumeric = numericPattern.hasMatch(OTP);
      }
    });
  }

  String errorTextOTP(){
    String errorText="";
    if(isOTPNumeric && isOTPCorrectLength) {
      errorText="";
    }
    else if(isOTPNumeric){
      errorText="Code must be 4 digits!";
    }
    else if(isOTPCorrectLength){
      errorText="Code must contain only numbers!";
    }
    else{
      errorText="Code must contain only numbers and must be 4 digits!";
    }
    return errorText;
  }



  void resetPass() async {
    String password = passwordController.text;
    String confirmPassword = confirmPasswordController.text;
    String OTP = OTPController.text;

    if (password.isEmpty) {
      setState(() {
        emptyPassword = true;
      });
    }
    if(email.isEmpty){
      setState(() {
        emptyMail = true;
      });
    }
    if (OTP.isEmpty) {
      setState(() {
        emptyOTP = true;
      });
    }
    if (emptyPassword || emptyMail || emptyOTP) {
      return;
    }
    // Perform code verification and navigate to the next screen if successful
    PasswordResetVerification passwordResetVerification = PasswordResetVerification();

    try {

      Response response = await passwordResetVerification.submitPass(int.parse(OTP) , email, password);
      if(response.statusCode == 201) {

        if(!context.mounted) return;
        Navigator.pushReplacementNamed(context, '/welcome',arguments:{
          'message':'Password is changed successfully!'});
      }

      else {
        Navigator.pushReplacementNamed(context, '/welcome',arguments:{
          'message':'Password is changed successfully!'});

        if(!context.mounted) return;
      }
    }
    catch (e) {
      print(e);
      showErrorMessage(context);

    }
  }





  void showErrorMessage(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text(''),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final data = ModalRoute.of(context)!.settings.arguments as String;
    email = data;

    return Scaffold(
      resizeToAvoidBottomInset: true,
      appBar: AppBar(
        title: Text('Change Your Password'),
      ),
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Text(
                'Enter your username, new password, and token in your email',
                style: TextStyle(fontSize: 15.0),
              ),
              const SizedBox(height: 10.0),
              CustomTextField(

                labelText: 'Reset Password Token',
                controller: OTPController,
                onChanged: validateOTP,
                errorText: errorTextOTP(),
              ),
              const SizedBox(height: 10.0),
              CustomTextField(
                labelText: 'New Password',
                controller: passwordController,
                onChanged: validatePassword,
                errorText: isPasswordValid ? "" : 'Please satisfy password constraints!',
                obscureText: true,
              ),
              SizedBox(height: 10.0),
              CustomTextField(
                labelText: 'Confirm New Password',
                controller: confirmPasswordController,
                onChanged: validateConfirmPassword,
                errorText: arePasswordsMatch ? "" : 'Passwords do not match!',
                obscureText: true,
              ),
              ElevatedButton(
                onPressed: (isPasswordValid && arePasswordsMatch && isOTPNumeric && isOTPCorrectLength) ? resetPass : null,
                child: Text('Reset Password'),
              ),
              Padding(
                padding: const EdgeInsets.all(10),
                child: Column(
                  children: [
                    Text(
                      emptyPassword ? 'Password cannot be empty' : '',
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
              )
            ],
          ),
        ),
      ),
    );
  }
}
