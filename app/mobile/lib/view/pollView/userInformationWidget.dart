import 'package:flutter/material.dart';

class UserInformationWidget extends StatelessWidget {
  final String userName;
  final String userUsername;
  final String profilePictureUrl;

  const UserInformationWidget(
      {super.key,
      required this.userName,
      required this.userUsername,
      required this.profilePictureUrl});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          CircleAvatar(
            radius: 30.0,
            backgroundImage: NetworkImage(profilePictureUrl),
          ),
          const SizedBox(width: 16.0),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(userName,
                  style: const TextStyle(fontWeight: FontWeight.bold)),
              Text(userUsername),
            ],
          ),
        ],
      ),
    );
  }
}
