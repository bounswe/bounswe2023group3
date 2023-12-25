import 'package:dio/dio.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/services/authService.dart';
import 'package:mobile_app/view/state.dart';
import '../constants.dart';
import 'customTextField.dart';
import 'package:mobile_app/view/signup/signupScreen.dart';
import 'package:mobile_app/view/homePage/homePage.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
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
    AuthService authService = AuthService();
    try {
      Response response = await authService.login(email, password);
      print(response);
      if (response.statusCode == 201) {
        authService.saveToken(response.data['access_token']);
        try {
          Response loggedInUserData = await ApiService.dio.get('/auth/me');
          if (loggedInUserData.statusCode == 200) {
            AppState.isModerator = false;
            AppState.loggedInUserId = loggedInUserData.data['id'];
            // TODO: insallah dogrudur
            AppState.loggedInUserUsername = loggedInUserData.data['username'];
            AppState.isGuest = false;
            print("loginScreen.login: ${AppState.loggedInUserId}");
          } else {
            if (!context.mounted) return;
            showErrorMessage(context);
          }
        } catch (e) {
          print("!!! loginScreen.dart::_LoginScreenState.login $e");
          // showErrorMessage(context);
        }
        if (!context.mounted) return;
        Navigator.pushNamed(context, '/home');
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

  void navigateToSignupPage() {
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => const SignupScreen()));
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
                TextButton(
                  onPressed: () {
                    // Continue as Guest
                    Navigator.pushNamed(context, "/fpassinit");
                  },
                  child: const Text('Forget Password?'),
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
                      const SizedBox(height: 16),
                      GestureDetector(
                        onTap: () {
                          Navigator.pushNamed(context, "/sign");
                        },
                        child: const Text(
                          'Don\'t have an account? Sign up here',
                          style: TextStyle(
                            color: navy,
                            decoration: TextDecoration.underline,
                          ),
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
