class PollCreationData {
  String pollTitle = "";
  String pollDescription = "";
  List<String> options = [];
  List<String> imageURLs = [];
  List<String> tags = [];
  DateTime creationDate = DateTime.now();
  DateTime dueDate = DateTime.now().subtract(const Duration(days: 1));
}
