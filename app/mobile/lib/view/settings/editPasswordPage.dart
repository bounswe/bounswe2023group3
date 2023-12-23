import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/ScreenArguments.dart';
import 'package:mobile_app/services/passwordEditService.dart';

import 'package:mobile_app/view/settings/customTextField.dart';

class EditPasswordPage extends StatefulWidget {

  const EditPasswordPage({super.key});

  @override
  State<EditPasswordPage> createState() => _EditPasswordPageState();
}

class _EditPasswordPageState extends State<EditPasswordPage> {

  bool emptyPassword = false;
  bool emptyOldPassword = false;
  bool emptyConfirmPassword = false;

  bool isPasswordValid = true;
  bool arePasswordsMatch = true;
  bool isOldPasswordCorrect = true;


  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  final TextEditingController oldPasswordController = TextEditingController();


  // Add more validation logic for password as needed
  void validatePassword(String password) {
    setState(() {
      emptyPassword = false;

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



  void resetPass() async {
    String password = passwordController.text;
    String confirmPassword = confirmPasswordController.text;
    String oldPassword = oldPasswordController.text;

    if (password.isEmpty) {
      setState(() {
        emptyPassword = true;
      });
    }
    if (confirmPassword.isEmpty) {
      setState(() {
        emptyConfirmPassword = true;
      });
    }
    if (oldPassword.isEmpty) {
      setState(() {
        emptyOldPassword = true;
      });
    }


    if (emptyPassword || emptyOldPassword || emptyConfirmPassword) {
      return;
    }
    // Perform code verification and navigate to the next screen if successful
    PasswordEditService passwordEditService = PasswordEditService();

    try {

      Response response = await passwordEditService.submitPass(password, oldPassword);
      if(response.statusCode == 201) {

        if(!context.mounted) return;
        Navigator.pop(context,"Password is changed successfully.");

      }

      else {
        if(!context.mounted) return;
        showErrorMessage(context,"Could not change the password.");

      }
    }
    catch (e) {
      print(e);


    }
  }





  void showErrorMessage(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {


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
                noValidator: true,
                labelText: 'Old Password',
                controller: oldPasswordController,
                errorText: "",

              ),
              const SizedBox(height: 10.0),
              CustomTextField(
                noValidator: false,
                labelText: 'New Password',
                controller: passwordController,
                onChanged: validatePassword,
                errorText: isPasswordValid ? "" : 'Please satisfy password constraints!',
                obscureText: true,
              ),
              SizedBox(height: 10.0),
              CustomTextField(
                noValidator: false,
                labelText: 'Confirm New Password',
                controller: confirmPasswordController,
                onChanged: validateConfirmPassword,
                errorText: arePasswordsMatch ? "" : 'Passwords do not match!',
                obscureText: true,
              ),
              ElevatedButton(
                onPressed: (isPasswordValid && arePasswordsMatch) ? resetPass : null,
                child: Text('Change Password!'),
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
                      emptyOldPassword ? 'Old Password cannot be empty' : '',
                      style: TextStyle(
                        color: Colors.red[900],
                      ),
                    ),
                    Text(
                      emptyConfirmPassword ? 'Confirm Password cannot be empty' : '',
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

