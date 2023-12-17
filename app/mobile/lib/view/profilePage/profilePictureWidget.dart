import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';

class ProfilePictureWidget extends StatefulWidget {
  final String imageUrl;
  final double radius;
  final String defaultPath;

  const ProfilePictureWidget({
    Key? key,
    required this.imageUrl,
    this.radius = 40.0,
    this.defaultPath = "assets/def_profile_photo2.jpg",
  }) : super(key: key);

  @override
  State<ProfilePictureWidget> createState() => _ProfilePictureWidgetState();
}

class _ProfilePictureWidgetState extends State<ProfilePictureWidget> {
  late ImageProvider profilePhoto;

  @override
  void didUpdateWidget(ProfilePictureWidget oldWidget) {
    print("faruk: profile picture widget didUpdateWidget");
    super.didUpdateWidget(oldWidget);
    if (widget.imageUrl != oldWidget.imageUrl) {
      // URL has changed, update the image
      profilePhoto = NetworkImage(widget.imageUrl);
    }
    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    profilePhoto = NetworkImage(widget.imageUrl);
  }

  @override
  Widget build(BuildContext context) {
    print("faruk: profile picture widget build");
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: gray, width: 2),
          ),
          child: CircleAvatar(
            backgroundImage: profilePhoto,
            radius: widget.radius,
            onBackgroundImageError: (exception, stackTrace) {
              setState(() {
                profilePhoto = AssetImage(widget.defaultPath);
              });
            },
          ),
        ),
      ],
    );
  }
}
