import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';

class CustomContainer extends StatelessWidget {
  final Widget child;
  final Color borderColor;
  final Color backgroundColor;
  final double borderRadius;
  final double borderWidth;
  final EdgeInsetsGeometry? padding;

  const CustomContainer({
    Key? key,
    required this.child,
    this.borderColor = navy,
    this.backgroundColor = whitish,
    this.borderRadius = 10,
    this.borderWidth = 2,
    this.padding,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (padding != null) {
      return Container(
          decoration: BoxDecoration(
            color: backgroundColor,
            borderRadius: BorderRadius.circular(borderRadius),
            border: Border.all(
              color: borderColor,
              width: borderWidth,
            ),
          ),
          child: Padding(
            padding: padding!,
            child: child,
          ));
    } else {
      return Container(
        decoration: BoxDecoration(
          color: backgroundColor,
          borderRadius: BorderRadius.circular(borderRadius),
          border: Border.all(
            color: borderColor,
          ),
        ),
        child: child,
      );
    }
  }
}
