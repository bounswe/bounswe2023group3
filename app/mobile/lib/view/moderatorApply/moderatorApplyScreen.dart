import 'package:dio/dio.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:mobile_app/ScreenArguments.dart';

import 'package:mobile_app/services/moderatorApplicationService.dart';
import 'package:mobile_app/view/moderatorApply/customTextField.dart';

void main() {
  runApp(const ModeratorApplyScreen());
}

class ModeratorApplyScreen extends StatelessWidget {
  const ModeratorApplyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: ModeratorApplicationPage(),
    );
  }
}

class ModeratorApplicationPage extends StatefulWidget {
  const ModeratorApplicationPage({super.key});

  @override
  State<ModeratorApplicationPage> createState() =>
      _ModeratorApplicationPageState();
}

class _ModeratorApplicationPageState extends State<ModeratorApplicationPage> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _surnameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _interestController = TextEditingController();

  String _cvFilePath = ""; // Path to the uploaded CV file
  String _cvName = ""; // Name of the uploaded CV file

  bool isEmailValid = true; // Track email validation
  bool emptyEmail = false;
  bool emptyName = false;
  bool emptySurname = false;
  bool emptyInterest = false;

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

  Widget _buildFileUploadButton() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Text('Upload CV (PDF)'),
        SizedBox(height: 8),
        ElevatedButton(
          onPressed: () {
            // Open file picker
            _pickCVFile();
          },
          child: Text('Choose File'),
        ),
        SizedBox(height: 8),
        if (_cvFilePath != "")
          Text(
            'Selected File: $_cvFilePath',
            style: TextStyle(color: Colors.green),
          ),
      ],
    );
  }

  Future<void> _pickCVFile() async {
    try {
      FilePickerResult? result = await FilePicker.platform.pickFiles(
        type: FileType.custom,
        allowedExtensions: ['pdf'],
      );

      if (result != null) {
        setState(() {
          _cvFilePath = result.files.single.path!;
          _cvName = result.files.single.name;
        });
      } else {
        // User canceled the picker
      }
    } catch (e) {
      print('Error picking file: $e');
    }
  }

  void _submitApplication() async {
    String name = _nameController.text;
    String surname = _surnameController.text;
    String email = _emailController.text;
    String interest = _interestController.text;
    MultipartFile cv =
        await MultipartFile.fromFile(_cvFilePath, filename: _cvName);

    if (name.isEmpty) {
      setState(() {
        emptyName = true;
      });
    }
    if (email.isEmpty) {
      setState(() {
        emptyEmail = true;
      });
    }
    if (surname.isEmpty) {
      setState(() {
        emptySurname = true;
      });
    }
    if (interest.isEmpty) {
      setState(() {
        emptyInterest = true;
      });
    }
    if (emptyName || emptyEmail || emptySurname || emptyInterest) {
      return;
    }
    // Perform application and navigate to the next screen if successful
    ModeratorApplicationService moderatorApplicationService =
        ModeratorApplicationService();

    try {
      Response response = await moderatorApplicationService.applyToBeAModerator(
          name, surname, email, interest, cv);
      if (response.statusCode == 201) {
        if (!context.mounted) return;
        Navigator.pushNamedAndRemoveUntil(
            context,
            '/welcome',
            (Route<dynamic> route) =>
                false, // This condition ensures removing all previous routes
            arguments: ScreenArguments("You applied successfully!"));
      } else {
        if (!context.mounted) return;
        showErrorMessage(context, "You couldn't apply.");
      }
    } catch (e) {
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
      appBar: AppBar(
        title: const Text('Moderator Application!'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(labelText: 'Name'),
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: _surnameController,
                decoration: InputDecoration(labelText: 'Surname'),
              ),
              SizedBox(height: 16),
              CustomTextField(
                labelText: 'Email',
                controller: _emailController,
                onChanged: validateEmail,
                errorText: isEmailValid ? "" : 'Enter a valid email!',
                obscureText: true,
              ),
              SizedBox(height: 16),
              _buildFileUploadButton(),
              SizedBox(height: 16),
              TextFormField(
                controller: _interestController,
                maxLines: 5,
                decoration: InputDecoration(
                    labelText: 'Tell us why you are interested!'),
              ),
              SizedBox(height: 32),
              ElevatedButton(
                onPressed: () {
                  // Submit the application (replace with your logic)
                  _submitApplication();
                },
                child: Text('Submit!'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
