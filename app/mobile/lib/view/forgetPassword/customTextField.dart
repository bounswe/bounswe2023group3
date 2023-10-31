import 'package:flutter/material.dart';

import '../constants.dart';

class CustomTextField extends StatelessWidget {
  final String labelText;
  final TextEditingController controller;
  final TextInputType keyboardType;
  final bool obscureText;
  final Function(String) onChanged;
  final String errorText;

  const CustomTextField({
    Key? key,
    required this.labelText,
    required this.controller,
    this.keyboardType = TextInputType.text,
    this.obscureText = false,
    required this.onChanged,
    required this.errorText,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          padding: const EdgeInsets.all(2.0),
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
            scrollPadding: EdgeInsets.only(bottom:40),
            keyboardType: keyboardType,
            obscureText: obscureText,
            onChanged: onChanged,
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
          padding: const EdgeInsets.only(top: 4.0, left: 12.0),
          child: Text(
            errorText,
            style: TextStyle(color: Colors.red[900]),
          ),
        ),
      ],
    );
  }
}
