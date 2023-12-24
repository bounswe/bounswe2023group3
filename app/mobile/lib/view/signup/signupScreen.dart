import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:email_validator/email_validator.dart';
import 'package:mobile_app/view/signup/customTextField.dart';
import 'package:mobile_app/services/signuser.dart';
import 'package:mobile_app/view/signup/signVerifyScreen.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController usernameController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController surnameController = TextEditingController();

  bool isEmailValid = true;
  bool isPasswordValid = true;
  bool isUsernameValid = true;
  bool arePasswordsMatch = true;

  bool emptyEmail = false;
  bool emptyPassword = false;
  bool emptyUsername = false;
  bool emptyConfirmPassword = false;
  bool emptyName = false;
  bool emptySurname = false;


  Color lengthColor = Colors.red.shade900;
  Color uppercaseColor = Colors.red.shade900;
  Color lowercaseColor = Colors.red.shade900;
  Color specialCharColor = Colors.red.shade900;
  Color digitColor = Colors.red.shade900;

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


  void validateName(String temp){
    setState(() {
      emptyName=false;
    });
  }

  void validateSurname(String temp){
    setState(() {
      emptySurname=false;
    });
  }

  void validateConfirmPassword(String confirmPassword){
    setState(() {
      emptyConfirmPassword = false;
      arePasswordsMatch =  passwordController.text == confirmPassword;
    });
  }

  void validateUsername(String username){
    setState(() {
      emptyUsername = false;

      if(username.isEmpty){
        isUsernameValid=true;
      }
      else{
        final lengthPattern = RegExp(r'.{6,}');

        final isLengthValid = lengthPattern.hasMatch(username);

        isUsernameValid = isLengthValid;
      }


    });
  }
  // Add more validation logic for password as needed
  void validatePassword(String password) {
    setState(() {
      emptyPassword = false;


      if(password.isEmpty){
        isPasswordValid=true;
      }
      else {
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



  void signup() async {
    if (isEmailValid && isPasswordValid) {
      String email = emailController.text;
      String password = passwordController.text;
      String username = usernameController.text;
      String name = nameController.text;
      String surname = surnameController.text;


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
      if (username.isEmpty) {
        setState(() {
          emptyUsername = true;
        });
      }
      if (name.isEmpty) {
        setState(() {
          emptyName = true;
        });
      }
      if (surname.isEmpty) {
        setState(() {
          emptySurname = true;
        });
      }


      if (emptyEmail || emptyPassword || emptyUsername || emptyName || emptySurname) {
        return;
      }
      SignUser signUser = SignUser();
      try {

        Response response = await signUser.sign(email, username, password, name, surname);
        if (response.statusCode == 201) {

          if (!context.mounted) return;
          Navigator.push(context, MaterialPageRoute(builder: (context) => SignVerifyScreen(email: email,)));

          //Navigator.pushNamed(context, '/signverify');
        }
        else if(response.statusCode == 409){
          showErrorMessage(context, "User already exists!");
        }

        else {


          if (!context.mounted) return;
          showErrorMessage(context,"Error occurred.");
        }
      }
      catch (e) {
        showErrorMessage(context, "Catch Block!");
      }
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
        title: const Text('Sign Up'),
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
                  labelText: 'Name',
                  controller: nameController,
                  errorText: "",
                  onChanged: validateName,
                ),
                const SizedBox(height: 16),
                CustomTextField(
                  labelText: 'Surname',
                  controller: surnameController,
                  errorText: "",
                  onChanged: validateSurname,
                ),
                const SizedBox(height: 16),

                CustomTextField(
                  labelText: 'Email',
                  controller: emailController,
                  keyboardType: TextInputType.emailAddress,
                  onChanged: validateEmail,
                  errorText: isEmailValid ? "" : 'Enter a valid email',
                ),
                const SizedBox(height: 16),
                CustomTextField(
                  labelText: 'Username',
                  controller: usernameController,
                  onChanged: validateUsername,
                  errorText: isUsernameValid ? "" : 'Enter a username with at least 6 characters',
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
                const SizedBox(height: 16),
                CustomTextField(
                  labelText: 'Confirm Password',
                  controller: confirmPasswordController,
                  onChanged: validateConfirmPassword,
                  errorText: arePasswordsMatch ? "" : 'Passwords do not match!',
                  obscureText: true,
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
                // Display the password criteria
                Text(
                  '• At least 6 characters',
                  style: TextStyle(
                    color: isPasswordValid || passwordController.text.length >= 6
                        ? Colors.green.shade900
                        : Colors.red.shade900,
                  ),
                ),
                Text(
                  '• At least one uppercase character',
                  style: TextStyle(
                    color: isPasswordValid ||
                            RegExp(r'[A-Z]').hasMatch(passwordController.text)
                        ? Colors.green.shade900
                        : Colors.red.shade900,
                  ),
                ),
                Text(
                  '• At least one lowercase character',
                  style: TextStyle(
                    color: isPasswordValid ||
                            RegExp(r'[a-z]').hasMatch(passwordController.text)
                        ? Colors.green.shade900
                        : Colors.red.shade900,
                  ),
                ),
                Text(
                  '• At least one special character (e.g., !@#)',
                  style: TextStyle(
                    color: isPasswordValid ||
                            RegExp(r'[!@#\$%^&*(),.?":{}|<>]')
                                .hasMatch(passwordController.text)
                        ? Colors.green.shade900
                        : Colors.red.shade900,
                  ),
                ),
                Text(
                  '• At least one digit',
                  style: TextStyle(
                    color: isPasswordValid ||
                            RegExp(r'[0-9]').hasMatch(passwordController.text)
                        ? Colors.green.shade900
                        : Colors.red.shade900,
                  ),
                ),
                // End of password criteria display
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: isEmailValid && isPasswordValid && isUsernameValid && arePasswordsMatch ? signup : null,
                  child: const Text('Sign Up'),
                ),
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: Column(
                    children: [
                      Text(
                        emptyName ? 'Name cannot be empty' : '',
                        style: TextStyle(
                          color: Colors.red[900],
                        ),
                      ),
                      Text(
                        emptySurname ? 'Surname cannot be empty' : '',
                        style: TextStyle(
                          color: Colors.red[900],
                        ),
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
      ),
    );
  }
}
