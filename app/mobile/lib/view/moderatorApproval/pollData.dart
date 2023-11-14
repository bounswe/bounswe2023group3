class PollData {



  final String pollTitle;
  final String pollDescription;
  final List<String> options;
  final List<String> tags;
  final List<String> imageURLs;
  final String dueDate;

  const PollData({
    required this.pollTitle,
    required this.pollDescription,
    required this.options,
    required this.tags,
    required this.imageURLs,
    required this.dueDate,

  });
}
