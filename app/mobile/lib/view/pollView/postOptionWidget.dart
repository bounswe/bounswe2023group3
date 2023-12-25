import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';

class PostOptionWidget extends StatelessWidget {
  final String optionText;
  final VoidCallback onPressed;
  final int percentage;
  final bool isSelected;
  final bool isChosen;
  final bool isCorrect;
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
    required this.isCorrect,
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
            color: Colors.white,
          ),
          child: Stack(
            children: [
              VoteBar(percentage: percentage, isChosen: isChosen, isCorrect: isCorrect, isSelected: isSelected, isSettled: isSettled,),
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
              if (isSettled == 2 || isSelected)
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


class VoteBar extends StatelessWidget {
  final percentage;
  final isChosen;
  final isCorrect;
  final isSelected;
  final isSettled;
  const VoteBar ({super.key, required this.percentage, this.isChosen, this.isCorrect, this.isSelected,this.isSettled});

  @override
  Widget build(BuildContext context) {
    if (isSettled == 2) {
      return Container(
        height: 30,
        width: percentage as double, // Adjust the multiplier as needed
        decoration: BoxDecoration(
          border: isChosen ? Border.all(color: pink, width: 3.0) : Border.all(
              color: Colors.black),
          borderRadius: BorderRadius.circular(20.0),
          color: isCorrect ? Colors.green : Colors.red,
          backgroundBlendMode: BlendMode.srcATop,
        ),
      );
    }
    else if (isSelected) {
      return Container(
        height: 30,
        width: percentage.toDouble()*3.8, // Adjust the multiplier as needed
        decoration: BoxDecoration(
          border: isChosen ? Border.all(color: pink, width: 3.0) : Border.all(
              color: Colors.black),
          borderRadius: BorderRadius.circular(20.0),
          color: isChosen ? pink : Colors.grey,
          backgroundBlendMode: BlendMode.srcATop,
        ),
      );
    }
    else {
      return Container();
    }
  }
}
