import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';

class PostOptionWidget extends StatelessWidget {
  final String optionText;
  final VoidCallback onPressed;
  final int percentage;
  final bool isSelected;
  final bool isChosen;
  final int isSettled;
  //final bool isCorrect;

  const PostOptionWidget({
    Key? key,
    required this.optionText,
    required this.onPressed,
    required this.percentage,
    required this.isSelected,
    required this.isChosen,
    required this.isSettled,
    //required this.isCorrect,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: GestureDetector(
        onTap: onPressed,
        child: Container(
          height: 30,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20.0),
            border: Border.all(color: isChosen ? Colors.blue : Colors.grey),
            color: isChosen ? Colors.blue : Colors.grey[200],
          ),
          child: Stack(
            children: [
              if (isSettled == 1)
                Container(
                  height: 30,
                  width: percentage * 2, // Adjust the multiplier as needed
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(20.0),
                    color: blue, //isCorrect? Colors.green: Colors.red,
                    backgroundBlendMode: BlendMode.srcATop,
                  ),
                ),
              Positioned.fill(
                child: Center(
                  child: Text(
                    optionText,
                    style: TextStyle(
                      color: Colors.black,
                    ),
                  ),
                ),
              ),
              if (isSettled == 1)
                Positioned(
                  right: 0,
                  top: 0,
                  bottom: 0,
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(0, 0, 7, 0),
                    child: Center(
                      child: Text(
                        '$percentage%',
                        style: TextStyle(
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
