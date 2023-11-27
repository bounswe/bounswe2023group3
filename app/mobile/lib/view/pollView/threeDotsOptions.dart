import 'package:flutter/material.dart';


class ThreeDotsOptions extends StatelessWidget {
  final Function(String) onSelected;

  const ThreeDotsOptions({super.key,required this.onSelected});

  @override
  Widget build(BuildContext context) {
    return RotatedBox(
      quarterTurns: 1,
      child: PopupMenuButton<String>(
        splashRadius: 20,
        onSelected: onSelected,
        itemBuilder: (BuildContext context) {
          return [
            const PopupMenuItem<String>(
              value: 'requestToSettle',
              child: Text('Request to settle'),
            ),
            /*PopupMenuItem<String>(
              value: 'notInterested',
              child: Text('Not interested'),
            ),*/
          ];
        },
      ),
    );
  }
}