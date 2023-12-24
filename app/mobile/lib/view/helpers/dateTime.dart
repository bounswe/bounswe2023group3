import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
class DateTimeWidget extends StatelessWidget {
  final DateTime dateTime;
  final Color color;

  const DateTimeWidget({Key? key, required this.dateTime, required this.color}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    String formattedDateTime = DateFormat.yMMMMd('en_US').add_jm().format(dateTime);

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 25.0),
      child: Row(
        children: [
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20.0),
              border: Border.all(color: color),
              color: color,
            ),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                formattedDateTime,
                style: const TextStyle(fontSize: 16.0, color: Colors.white),
              ),
            ),
          ),
        ],
      ),
    );
  }
}