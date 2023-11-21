class PollCreationData {
  String creatorId = "";
  String pollTitle = "";
  String pollDescription = "";
  List<String> options = [];
  List<String> imageURLs = [
    // for demonstration purposes. actually this list starts empty.
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXLfPCb2ltrAdwEVLhU048H3s_pJuN27Ts8A",
    "error url",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDM01ItXrZxoBH0ki_V2E_9qy8ueFhjgo9Yg",
  ];
  List<String> tags = [];
  DateTime dueDate = DateTime.now().add(const Duration(days: 50));
}
