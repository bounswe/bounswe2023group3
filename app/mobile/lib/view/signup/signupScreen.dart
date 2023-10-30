import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
import 'package:mobile_app/view/login/customTextField.dart';
import 'package:mobile_app/services/signuser.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  bool isEmailValid = false;
  bool isPasswordValid = false;
  bool emptyEmail = false;
  bool emptyPassword = false;
  Color lengthColor = Colors.red;
  Color uppercaseColor = Colors.red;
  Color lowercaseColor = Colors.red;
  Color specialCharColor = Colors.red;
  Color digitColor = Colors.red;

  void validateEmail(String email) {
    setState(() {
      emptyPassword = false;
      emptyEmail = false;
      if (email.isEmpty) {
        isEmailValid = true;
      } else {
        isEmailValid = EmailValidator.validate(email);
      }
    });
  }

  // Add more validation logic for password as needed
  void validatePassword(String password) {
    setState(() {
      emptyPassword = false;
      emptyEmail = false;

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
    });
  }

  void showErrorMessage() {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Email or password is incorrect'),
      ),
    );
  }

  void signup() async {
    if (isEmailValid && isPasswordValid) {
      String email = emailController.text;
      String password = passwordController.text;
      if (email.isEmpty) {
        setState(() {
          emptyEmail = true;
        });
      }
      if (password.isEmpty) {
        setState(() {
          emptyPassword = true;
        });
      }
      if (emptyEmail || emptyPassword) {
        return;
      }
      SignUser signUser = SignUser();
      Response response = await signUser.sign(email, password);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign Up'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomTextField(
              labelText: 'Email',
              controller: emailController,
              keyboardType: TextInputType.emailAddress,
              onChanged: validateEmail,
              errorText: isEmailValid ? "" : 'Enter a valid email',
            ),
            const SizedBox(height: 16),
            CustomTextField(
              labelText: 'Password',
              controller: passwordController,
              obscureText: true,
              onChanged: validatePassword,
              errorText: isPasswordValid
                  ? ""
                  : 'Password must meet the following criteria:',
            ),
            Text(
              emptyEmail ? 'Email cannot be empty' : '',
              style: TextStyle(
                color: Colors.red[900],
              ),
            ),
            Text(
              emptyPassword ? 'Password cannot be empty' : '',
              style: TextStyle(
                color: Colors.red[900],
              ),
            ),
            const SizedBox(height: 16),
            // Display the password criteria
            Text(
              '• At least 6 characters',
              style: TextStyle(
                color: isPasswordValid || passwordController.text.length >= 6
                    ? Colors.green
                    : Colors.red,
              ),
            ),
            Text(
              '• At least one uppercase character',
              style: TextStyle(
                color: isPasswordValid ||
                        RegExp(r'[A-Z]').hasMatch(passwordController.text)
                    ? Colors.green
                    : Colors.red,
              ),
            ),
            Text(
              '• At least one lowercase character',
              style: TextStyle(
                color: isPasswordValid ||
                        RegExp(r'[a-z]').hasMatch(passwordController.text)
                    ? Colors.green
                    : Colors.red,
              ),
            ),
            Text(
              '• At least one special character (e.g., !@#)',
              style: TextStyle(
                color: isPasswordValid ||
                        RegExp(r'[!@#\$%^&*(),.?":{}|<>]')
                            .hasMatch(passwordController.text)
                    ? Colors.green
                    : Colors.red,
              ),
            ),
            Text(
              '• At least one digit',
              style: TextStyle(
                color: isPasswordValid ||
                        RegExp(r'[0-9]').hasMatch(passwordController.text)
                    ? Colors.green
                    : Colors.red,
              ),
            ),
            // End of password criteria display
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: isEmailValid && isPasswordValid ? signup : null,
              child: const Text('Sign Up'),
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
                    emptyPassword ? 'Password cannot be empty' : '',
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
    );
  }
}
