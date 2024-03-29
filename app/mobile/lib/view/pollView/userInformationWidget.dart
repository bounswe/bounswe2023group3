import 'package:flutter/material.dart';
import 'package:mobile_app/view/pollView/clickableUsername.dart';
import 'package:mobile_app/view/pollView/threeDotsOptions.dart';
import 'package:mobile_app/view/profilePage/profilePictureWidget.dart';
import 'package:mobile_app/view/state.dart';

import '../settleRequest/settleRequestPage.dart';

class UserInformationWidget extends StatelessWidget {
  final String userName;
  final String userUsername;
  final String profilePictureUrl;
  final String pollId;

  UserInformationWidget({
    super.key,
    required this.userName,
    required this.userUsername,
    required this.profilePictureUrl,
    this.pollId = "",
  });

  List<Widget> rowChildren = []; // List to hold widgets in the Row
  @override
  Widget build(BuildContext context) {
    rowChildren.add(
      ProfilePictureWidget(
        radius: 30.0,
        imageUrl: profilePictureUrl,
      ),
    );
    rowChildren.add(
      const SizedBox(width: 16.0),
    );
    rowChildren.add(
      Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClickableUsername(
            username: userUsername,
            displayName: userName,
            textStyle: const TextStyle(fontWeight: FontWeight.bold),
          ),
          Text(userUsername),
        ],
      ),
    );
    if (pollId != "") {
      rowChildren.add(const SizedBox(
        width: 180.0,
      ));

      rowChildren.add(
        const Spacer(),
      );
    }

    return Container(
      padding: const EdgeInsets.all(16.0),
      child: Stack(children: [
        Row(children: rowChildren),
        if (pollId != "" && !AppState.isGuest)
          Positioned(
            right: 0,
            top: 5,
            child: ThreeDotsOptions(
              onSelected: (value) {
                // Handle the selected option here
                switch (value) {
                  case "requestToSettle":
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => SettleRequestPage(
                                  pollId: pollId,
                                )));
                }
              },
            ),
          ),
      ]),
    );
  }
}
