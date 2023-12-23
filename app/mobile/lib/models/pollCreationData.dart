import 'package:mobile_app/models/annotation.dart';

class PollCreationData {
  String pollTitle = "";
  String pollDescription = "";
  List<String> options = [];
  List<String> imageURLs = [];
  List<String> tags = [];
  DateTime creationDate = DateTime.now();
  DateTime dueDate = DateTime.now().subtract(const Duration(days: 1));

  List<Annotation> descriptionAnnotations = [];
  List<Annotation> titleAnnotations = [];
}
