import 'package:flutter/material.dart';
import 'package:mobile_app/models/profileInfo.dart';

class UserInfoSection extends StatelessWidget {
  ProfileInfo profileInfo;
  UserInfoSection({
    Key? key,
    required this.profileInfo,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          CircleAvatar(
            backgroundImage: NetworkImage(profileInfo.profilePictureUrl),
            radius: 40,
          ),
          const SizedBox(width: 10),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                profileInfo.username,
                style:
                    const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              ),
              Text(
                profileInfo.id,
                style: const TextStyle(fontSize: 16),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
