import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

import '../../services/settleRequestService.dart';
import '../constants.dart';
import 'customTextField.dart';


class SettleRequestPage extends StatefulWidget {
  final String pollId;
  const SettleRequestPage({
    super.key,
    required this.pollId,
  });

  @override
  State<SettleRequestPage> createState() => _SettleRequestPageState();
}

class _SettleRequestPageState extends State<SettleRequestPage> {


  final TextEditingController outcomeController = TextEditingController();
  final TextEditingController sourceController = TextEditingController();

  bool emptyOutcome = false;
  bool emptySource = false;



  void settleRequest() async {

    String outcome = outcomeController.text;
    String source = sourceController.text;
    if (outcome.isEmpty) {
      setState(() {
        emptyOutcome = true;
      });
    }
    if (source.isEmpty) {
      setState(() {
        emptySource = true;
      });
    }
    if (emptyOutcome || emptySource) {
      return;
    }

    // Perform code verification and navigate to the next screen if successful
    SettleRequestService settleRequestService = SettleRequestService();

    try {

      Response response = await settleRequestService.send(outcome, source, widget.pollId);
      if(response.statusCode == 200) {

        if(!context.mounted) return;
        Navigator.pop(context);
      }

      else {

        showErrorMessage(context,"There is no such poll!");
        if(!context.mounted) return;
      }
    }
    catch (e) {
      print(e);
      showErrorMessage(context,"Catch block!");

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
                  labelText: 'Outcome',
                  controller: outcomeController,
                  errorText: "This field can't be empty",
                ),
                const SizedBox(height: 16),
                CustomTextField(
                  labelText: 'Outcome Source',
                  controller: sourceController,
                  errorText: "This field can't be empty",
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  // onPressed: isEmailValid && isPasswordValid ? login : null,
                  onPressed: settleRequest,
                  child: const Text('Request!'),
                ),
                TextButton(
                  onPressed: () {
                    // Continue as Guest
                    Navigator.pushNamed(context, "/fpassinit");
                  },
                  child: const Text('Forget Password?'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
