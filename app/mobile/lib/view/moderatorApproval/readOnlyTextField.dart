import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';


class AlwaysDisabledFocusNode extends FocusNode {
  @override
  bool get hasFocus => false;
}

class ReadOnlyTextField extends StatelessWidget {

  final String label;

  const ReadOnlyTextField({
    Key? key,
    required this.label,

  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    double labelHeight= calculateTextHeight(label);
    return Container(
      height: labelHeight + 20.0,
      decoration: BoxDecoration(
        color: whitish,
        borderRadius: BorderRadius.circular(10.0),
        border: Border.all(
          color: navy,
        ),
      ),
      child: TextField(
        enableInteractiveSelection: true,
        focusNode: AlwaysDisabledFocusNode(),
        maxLines: null,
        decoration: InputDecoration(
          contentPadding: EdgeInsets.all(30.0),
          border: InputBorder.none,
          label: Text(
            label,
            style: TextStyle(
              color: Colors.black,
            ),
          ),
        ),
      ),
    );
  }

  double calculateTextHeight(String text) {
    final textStyle = TextStyle(fontSize: 16.0);
    final textPainter = TextPainter(
      text: TextSpan(text: text, style: textStyle),
      maxLines: 1,
      textDirection: TextDirection.ltr,
    )..layout(maxWidth: double.infinity);

    return textPainter.height;
  }
}
