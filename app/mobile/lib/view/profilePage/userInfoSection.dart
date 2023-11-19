import 'package:flutter/material.dart';

class UserInfoSection extends StatelessWidget {
  final String profilePictureUrl;
  final String username;
  final String nickname;

  const UserInfoSection({
    Key? key,
    required this.profilePictureUrl,
    required this.username,
    required this.nickname,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          CircleAvatar(
            backgroundImage: NetworkImage(profilePictureUrl),
            radius: 40,
          ),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                nickname,
                style:
                    const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              Text(
                username,
                style: const TextStyle(fontSize: 16),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
