class CommentData {
  final String username;
  final String commentText;
  final String commentId;
  final String dateTime;
  final String userId;

  CommentData({
    required this.username,
    required this.commentText,
    required this.commentId,
    required this.dateTime,
    required this.userId,
  });

  factory CommentData.fromJson(Map<String, dynamic> json) {
    return CommentData(
      userId: json['user']['id'],
      username: json['user']['username'],
      commentText: json['description'],
      commentId: json['id'],
      dateTime: json['created_date'],
    );
  }
}
