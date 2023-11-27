import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';


class CustomTextField extends StatelessWidget {
  final String labelText;
  final TextEditingController controller;
  final String errorText;

  const CustomTextField({
    Key? key,
    required this.labelText,
    required this.controller,
    required this.errorText,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(8.0),
          decoration: BoxDecoration(
            color: whitish,
            borderRadius: BorderRadius.circular(10.0),
            border: Border.all(
              color: navy,
              width: 3.0,
            ),
          ),
          child: TextField(
            controller: controller,
            decoration: InputDecoration(
              hintText: labelText,
              border: InputBorder.none,
              labelStyle: const TextStyle(
                color: Colors.black,
              ),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(top: 8.0, left: 12.0),
          child: Text(
            errorText,
            style: TextStyle(color: Colors.red[900]),
          ),
        ),
      ],
    );
  }
}
