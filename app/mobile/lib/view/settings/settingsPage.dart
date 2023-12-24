import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/services/accountClosingService.dart';
import 'package:mobile_app/view/state.dart';
import 'package:mobile_app/view/welcome/welcome.dart';

import '../../ScreenArguments.dart';
import 'editPasswordPage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: SettingsPage(),
    );
  }
}

class SettingsPage extends StatefulWidget {



  const SettingsPage({
    Key? key,
  }) : super(key: key);

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {


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

    void closeAccount() async {
      AccountClosingService accountClosingService = AccountClosingService();

      try {

        Response response = await accountClosingService.closeAccount(AppState.loggedInUserId);
        if(response.statusCode == 200) {

          if(!context.mounted) return;
          Navigator.pushNamedAndRemoveUntil(
              context,
              '/welcome',
                  (Route<dynamic> route) => false, // This condition ensures removing all previous routes
              arguments: ScreenArguments("Account is closed successfully!")
          );
        }

        else {
          if(!context.mounted) return;
          showErrorMessage(context,"Could not close the account.");

        }
      }
      catch (e) {
        showErrorMessage(context,"Error.");
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



  Future<void> tapOnEditPassword(
      BuildContext context) async {
    final resultMessage = await Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => EditPasswordPage(),
          ),
    );
    setState(() {
      // Refresh the page
    });
    ScaffoldMessenger.of(context)
      ..removeCurrentSnackBar()
      ..showSnackBar(SnackBar(content: Text(resultMessage), duration: const Duration(seconds: 3),));
  }




  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Settings'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Account Settings',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            ListTile(
              title: Text('Edit Password'),
              onTap: () {
                // Navigate to the change password screen
                tapOnEditPassword(context);
              },
            ),
            ListTile(
              title: Text('Close Account'),
              onTap: () {
                // Show a confirmation dialog before closing the account
                showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return AlertDialog(
                      title: Text('Confirm Account Closure'),
                      content: Text('Are you sure you want to close your account?'),
                      actions: [
                        TextButton(
                          onPressed: () {
                            Navigator.of(context).pop();
                          },
                          child: Text('Cancel'),
                        ),
                        TextButton(
                          onPressed: () {
                            // Close the account (replace with your logic)
                            // After closing the account, you might want to navigate to the login page
                            Navigator.of(context).pop(); // Close the dialog
                            // Navigator.pushAndRemoveUntil is used to remove all previous routes
                            closeAccount();

                          },
                          child: Text('Confirm'),
                        ),
                      ],
                    );
                  },
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

