class CommentData {
  final String user;
  final String commentText;

  CommentData({required this.user, required this.commentText});

  factory CommentData.fromJson(Map<String, dynamic> json) {
    return CommentData(
      user: json['user']['username'],
      commentText: json['description'],
    );
  }
}
