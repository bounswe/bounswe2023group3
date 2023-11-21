import 'package:flutter/material.dart';
import 'package:mobile_app/models/profileInfo.dart';
import 'package:mobile_app/services/followService.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/state.dart';

class UserInfoSection extends StatefulWidget {
  final ProfileInfo profileInfo;
  const UserInfoSection({
    Key? key,
    required this.profileInfo,
  }) : super(key: key);

  @override
  State<UserInfoSection> createState() => _UserInfoSectionState();
}

class _UserInfoSectionState extends State<UserInfoSection> {
  ImageProvider? profilePhoto;
  bool isFollowing = false;

  @override
  void initState() {
    super.initState();
    profilePhoto = NetworkImage(widget.profileInfo.profilePictureUrl);
  }

  void _learnIsFollowing() async {
    isFollowing = await FollowService.isFollowing(
        AppState.loggedInUserId, widget.profileInfo.id);
    setState(() {});
  }

  void _toggleFollow() async {
    if (isFollowing) {
      // follow/unfollow shoud be decided on the current knowledge of
      // the script, because button is shown according to the current knowledge.
      await FollowService.unfollow(
          AppState.loggedInUserId, widget.profileInfo.id);
    } else {
      await FollowService.follow(
          AppState.loggedInUserId, widget.profileInfo.id);
    }
    _learnIsFollowing();
  }

  void _editProfile() {}

  @override
  Widget build(BuildContext context) {
    _learnIsFollowing();
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Row(
        children: [
          CircleAvatar(
            backgroundImage: profilePhoto,
            radius: 40,
            onBackgroundImageError: (exception, stackTrace) {
              profilePhoto = const AssetImage("assets/def_profile_photo2.jpg");
              setState(() {});
            },
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.profileInfo.username,
                  style: const TextStyle(
                      fontSize: 20, fontWeight: FontWeight.bold),
                ),
                Text(
                  widget.profileInfo.id,
                  style: const TextStyle(fontSize: 16),
                ),
                Row(
                  children: [
                    const SizedBox(width: 60),
                    _buildProfileActionButton(),
                  ],
                ),
              ],
            ),
          ),
          Column(
            children: [
              OutlinedButton(
                onPressed: () {
                  // Define what happens when the button is pressed
                },
                style: OutlinedButton.styleFrom(
                  shape: const CircleBorder(),
                  padding: const EdgeInsets.all(7),
                ),
                child: const Icon(Icons.more_horiz, size: 24, color: navy),
              ),
              const SizedBox(
                height: 70,
              )
            ],
          ),
        ],
      ),
    );
  }

/*
  void _showMoreOptions(BuildContext context) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        // Your options based on whether it's the user's own profile or not...
      },
    );
  }*/

  Widget _buildProfileActionButton() {
    if (widget.profileInfo.isLoggedInUser) {
      return ElevatedButton(
        onPressed: () => _editProfile(),
        child: const Text('Edit Profile'),
      );
    } else {
      return Row(
        children: [
          SizedBox(width: isFollowing ? 50 : 70),
          ElevatedButton(
            onPressed: () => _toggleFollow(),
            style: ElevatedButton.styleFrom(
              backgroundColor: isFollowing ? whitish : navy,
              elevation: 0,
            ),
            child: Text(
              isFollowing ? 'Unfollow' : 'Follow',
              style: TextStyle(color: isFollowing ? pink : Colors.white),
            ),
          ),
        ],
      );
    }
  }
}
