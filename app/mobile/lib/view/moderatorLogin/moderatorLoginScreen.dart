import 'package:dio/dio.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/services/moderatorAuthService.dart';
import 'package:mobile_app/view/state.dart';
import '../constants.dart';
import 'customTextField.dart';

class ModeratorLoginScreen extends StatefulWidget {
  const ModeratorLoginScreen({super.key});

  @override
  State<ModeratorLoginScreen> createState() => _ModeratorLoginScreenState();
}

class _ModeratorLoginScreenState extends State<ModeratorLoginScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  bool isEmailValid = true; // Track email validation
  bool isPasswordValid = true; // Add more validation as needed for password
  bool emptyEmail = false;
  bool emptyPassword = false;

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
      if (password.isEmpty) {
        isPasswordValid = true;
      } else {
        isPasswordValid = password.length >=
            6; // For example, password should be at least 6 characters
      }
    });
  }

  void login() async {
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
    // Perform login validation and navigate to the next screen if successful
    ModeratorAuthService moderatorAuthService = ModeratorAuthService();
    try {
      Response response = await moderatorAuthService.login(email, password);
      print(response);
      if (response.statusCode == 201) {
        moderatorAuthService.saveToken(response.data['access_token']);
        AppState.isModerator=true;
        /*try {
          Response loggedInUserData = await ModeratorApiService.dio.get('/auth/me');
          if (loggedInUserData.statusCode == 200) {
            AppState.loggedInUserId = loggedInUserData.data['id'];
            print("loginScreen.login: ${AppState.loggedInUserId}");
          } else {
            if (!context.mounted) return;
            showErrorMessage(context);
          }
        } catch (e) {
          print("!!! loginScreen.dart::_LoginScreenState.login $e");
          // showErrorMessage(context);
        }*/
        if (!context.mounted) return;
        Navigator.pushNamed(context, '/moderatorHome');
      } else {
        if (!context.mounted) return;
        showErrorMessage(context);
      }
    } catch (e) {
      showErrorMessage(context);
    }
  }

  void showErrorMessage(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Email or password is incorrect'),
      ),
    );
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: true,
      appBar: AppBar(
        title: const Text('Login'),
      ),
      body: Center(
        child: SingleChildScrollView(
          scrollDirection: Axis.vertical,
          child: Padding(
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
                      : 'Password must be at least 6 characters',
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  // onPressed: isEmailValid && isPasswordValid ? login : null,
                  onPressed: login,
                  child: const Text('Login'),
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
        ),
      ),
    );
  }
}
