import 'package:flutter/material.dart';
import 'package:mobile_app/models/profileInfo.dart';
import 'package:mobile_app/services/followService.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/profilePage/editProfilePage.dart';
import 'package:mobile_app/view/profilePage/pendingPollsList.dart';
import 'package:mobile_app/view/profilePage/profilePictureWidget.dart';
import 'package:mobile_app/view/state.dart';

class UserInfoSection extends StatefulWidget {
  final ProfileInfo profileInfo;
  final void Function() profilePageReload;
  const UserInfoSection({
    Key? key,
    required this.profileInfo,
    required this.profilePageReload,
  }) : super(key: key);

  @override
  State<UserInfoSection> createState() => _UserInfoSectionState();
}

class _UserInfoSectionState extends State<UserInfoSection> {
  bool isFollowing = false;

  @override
  void initState() {
    super.initState();
    _updateFollowButton();
  }

  Future<void> _learnIsFollowing() async {
    isFollowing = await FollowService.isFollowing(
        AppState.loggedInUserId, widget.profileInfo.id);
  }

  void _toggleFollow() async {
    if (isFollowing) {
      // follow/unfollow shoud be decided on the current knowledge of
      // the script, because button is shown according to the current knowledge.
      // this is how it is done in tiktok.
      try {
        await FollowService.unfollow(
            AppState.loggedInUserId, widget.profileInfo.id);
      } catch (e) {
        // if (!context.mounted) return;
        // _showAllert("unfollow operation is unsuccessful $e");
      }
    } else {
      try {
        await FollowService.follow(
            AppState.loggedInUserId, widget.profileInfo.id);
        print("after awaiting follow request");
      } catch (e) {
        // if (!context.mounted) return;
        // _showAllert("follow operation is unsuccesful $e");
      }
    }
    await _learnIsFollowing();
    setState(() {});
    print("after set state call in the toggle follow");
  }

  void _showAllert(String message) {
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
              },
            ),
          ],
        );
      },
    );
  }

  void _editProfile() {
    Navigator.of(context).push(MaterialPageRoute(builder: (context) {
      return EditProfilePage(
        profileInfo: widget.profileInfo,
        profilePageReload: widget.profilePageReload,
      );
    }));
  }

  _updateFollowButton() async {
    await _learnIsFollowing();
    if (!mounted) return;
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          Row(
            children: [
              ProfilePictureWidget(
                imageUrl: widget.profileInfo.profilePictureUrl,
                radius: 40,
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "${widget.profileInfo.firstname}"
                      " ${widget.profileInfo.lastname}",
                      style: const TextStyle(
                          fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    Text(
                      widget.profileInfo.username,
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
                      _showMoreOptions(context);
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
          Row(children: [
            Text(
              "${widget.profileInfo.followersCount}",
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const Text(
              " Followers",
              style: TextStyle(fontSize: 18, color: darkgray),
            ),
            const SizedBox(width: 30),
            Text(
              "${widget.profileInfo.followingCount}",
              style: const TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                // decoration: TextDecoration.underline,
              ),
            ),
            const Text(
              " Followings",
              style: TextStyle(fontSize: 18, color: darkgray),
            ),
          ]),
        ],
      ),
    );
  }

  void _showMoreOptions(BuildContext context) {
// Define your custom colors here

// Now add them to your list
    final colors = [
      const Color(0xFF87CEEB),
      Colors.lightBlue.shade300,
      Colors.amber,
      pink,
    ];

    ListTile badges = ListTile(
      title: const Text('Badges'),
      onTap: () {
        // Select a random color using AppState.random
        var badges = widget.profileInfo.badges;
        [
          "freshman",
          "ss",
          "bear",
          "bear",
          "bear",
          "bear",
          "ss",
        ];
        var colorSeq = <Color>[];
        Color lastSelectedColor = Colors.black;
        int ii;
        for (ii = 0; ii < badges.length; ii++) {
          if (ii != 0) {
            // eger az once bir sey secmissek, onu kaldiralim
            colors.remove(lastSelectedColor);
            var tempColor = lastSelectedColor;
            // onun haricinde bir sey secelim
            lastSelectedColor = colors[AppState.random.nextInt(colors.length)];
            colorSeq.add(lastSelectedColor);
            colors.add(tempColor);
          } else {
            lastSelectedColor = colors[AppState.random.nextInt(colors.length)];
            colorSeq.add(lastSelectedColor);
          }
        }
        ii = 0;
        nextColor() {
          return colorSeq[ii++];
        }

        // Create a new route for displaying badges
        Navigator.of(context).push(MaterialPageRoute(builder: (context) {
          return Scaffold(
            appBar: AppBar(
              title: const Text('Badges'),
            ),
            body: ListView(
              // Adding padding to the ListView for spacing around the buttons
              padding: const EdgeInsets.all(8.0),
              children: badges
                  .map((badge) => Padding(
                        // Adding some space around each button
                        padding: const EdgeInsets.symmetric(
                          vertical: 8.0,
                          horizontal: 15,
                        ),
                        child: SizedBox(
                          height:
                              80, // Increasing the height for a thicker button in the Y dimension
                          child: ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              disabledBackgroundColor: nextColor(),
                              disabledForegroundColor: whitish,
                              padding:
                                  const EdgeInsets.symmetric(vertical: 20.0),
                            ),
                            onPressed: null,
                            child: Text(badge,
                                style: const TextStyle(fontSize: 24)),
                          ),
                        ),
                      ))
                  .toList(),
            ),
          );
        }));
      },
    );
    ListTile ranks = ListTile(
      title: const Text('Ranks'),
      onTap: () {
        // Insert ranks functionality here
        Navigator.of(context).pop();
      },
    );
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        // Determine the list of options based on whether the user is viewing their own profile or not
        List<Widget> options = widget.profileInfo.isLoggedInUser
            ? [
                badges,
                ranks,
                ListTile(
                  title: const Text('Pending Polls'),
                  onTap: () {
                    Navigator.of(context).pop();
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            PendingPollList(userId: widget.profileInfo.id),
                      ),
                    );
                  },
                ),
              ]
            : [
                ListTile(
                  title: const Text('Block'),
                  onTap: () {
                    // Insert block functionality here
                    Navigator.of(context).pop();
                  },
                ),
                ListTile(
                  title: const Text('Report'),
                  onTap: () {
                    // Insert report functionality here
                    Navigator.of(context).pop();
                  },
                ),
                badges,
                ranks,
              ];
        print("button list");
        // Return a column containing all the options as ListTiles
        return Column(
          mainAxisSize: MainAxisSize.min,
          children: options,
        );
      },
    );
  }

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
