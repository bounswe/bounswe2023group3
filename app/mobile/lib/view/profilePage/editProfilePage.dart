import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/models/profileInfo.dart';
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/view/login/customTextField.dart';
import 'package:mobile_app/view/profilePage/profilePictureWidget.dart';

class EditProfilePage extends StatefulWidget {
  final ProfileInfo profileInfo;
  final void Function() profilePageReload;
  const EditProfilePage({
    super.key,
    required this.profileInfo,
    required this.profilePageReload,
  });

  @override
  State<EditProfilePage> createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  late ProfileInfo profileInfo;
  bool isSaving = false;

  @override
  void initState() {
    profileInfo = widget.profileInfo.copy();
    super.initState();
  }

  void _showAlert(String message, Function okeyPressed) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: Text(message),
          actions: <Widget>[
            TextButton(
              child: const Text('OK'),
              onPressed: () {
                Navigator.of(context).pop();
                okeyPressed();
              },
            ),
          ],
        );
      },
    );
  }

  void _saveProfileInfoToRemote() async {
    isSaving = true;
    try {
      Response response = await ApiService.dio.put("/user", data: {
        "username": profileInfo.username,
        "firstname": profileInfo.firstname,
        "lastname": profileInfo.lastname,
        "profile_picture": profileInfo.profilePictureUrl
      });
      if (response.statusCode != 200) {
        _showAlert("error saving updates: $response", () {});
      }
    } catch (e) {
      _showAlert("error saving updates: $e", () {});
    }
    _showAlert("your updates saved succesfully", () {
      Navigator.pop(context);
      widget.profilePageReload();
    });
    isSaving = false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Profile'),
      ),
      body: GestureDetector(
        onTap: () => FocusScope.of(context).unfocus(),
        child: ListView(
          padding: const EdgeInsets.all(16.0),
          children: <Widget>[
            // Profile Picture
            ProfilePictureWidget(
              imageUrl: profileInfo.profilePictureUrl,
              radius: 70,
            ),
            const SizedBox(height: 30),
            // profile picture
            CustomTextField(
                labelText: "Profile Picture URL",
                controller:
                    TextEditingController(text: profileInfo.profilePictureUrl),
                onChanged: (value) {
                  profileInfo.profilePictureUrl = value;
                },
                onSubmitted: (value) {
                  profileInfo.profilePictureUrl = value;
                  setState(() {});
                  // TODO
                },
                errorText: ""),

            // Username
            CustomTextField(
                labelText: "username",
                controller: TextEditingController(text: profileInfo.username),
                onChanged: (value) {
                  profileInfo.username = value;
                },
                errorText: ""),

            // First Name
            CustomTextField(
              errorText: "",
              controller: TextEditingController(text: profileInfo.firstname),
              labelText: 'First Name',
              onChanged: (value) {
                profileInfo.firstname = value;
              },
            ),
            // Last Name
            CustomTextField(
              errorText: "",
              controller: TextEditingController(text: profileInfo.lastname),
              labelText: 'Last Name',
              onChanged: (value) {
                profileInfo.lastname = value;
              },
            ),
            // Privacy Toggles
            ListTile(
              title: const Text('Liked Polls Visible'),
              trailing: Switch(
                value: profileInfo.isLikedPollsVisible,
                onChanged: null,
                // (value) {
                //   setState(() {
                //     profileInfo.isLikedPollsVisible = value;
                //   });
                // },
              ),
            ),
            ListTile(
              title: const Text('Voted Polls Visible'),
              trailing: Switch(
                value: profileInfo.isVotedPollsVisible,
                onChanged: null,
                // (value) {
                //   setState(() {
                //     profileInfo.isVotedPollsVisible = value;
                //   });
                // },
              ),
            ),

            const SizedBox(height: 30),
            // Save Button
            ElevatedButton(
              child: const Text('Save'),
              onPressed: () {
                _saveProfileInfoToRemote();
              },
            ),
            if (isSaving) const Center(child: CircularProgressIndicator()),
          ],
        ),
      ),
    );
  }
}
