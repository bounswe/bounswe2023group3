import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';


class AlwaysDisabledFocusNode extends FocusNode {
  @override
  bool get hasFocus => false;
}

class ReadOnlyTextField extends StatelessWidget {

  final String text;

  const ReadOnlyTextField({
    Key? key,
    required this.text,

  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: whitish,
        borderRadius: BorderRadius.circular(10.0),
        border: Border.all(
          color: navy,
        ),
      ),

      child: Padding(
        padding: EdgeInsets.all(13.0),
        child: Text(
          text,
          maxLines: null,

          style: const TextStyle(
          backgroundColor: whitish,
          color: Colors.black,

          )

        ),
      ),


    );
  }


}
