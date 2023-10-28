/// this class serves a function to suggest possible completions
/// that matches the prefix of the entered tag
class TagCompletionService {
  ///Returns list of possible completions of the given prefix
  /// <p> prefix is the prefix of the tag being entered
  static Future<List<String>> getPossibleCompletions(String prefix) async {
    if (prefix.isEmpty) {
      return [];
    }
    // Dummy data for demonstration purposes.
    List<String> allRecommendations = [
      'Football',
      'Basketball',
      'Tennis',
      'Rugby',
      'Hockey',
      'Volleyball',
      'Baseball'
    ];
    print("TagCompletionService.getPossibleCompletions: we may use this "
        "this method to get matching tags based on already entered prefix of"
        " the tag field");
    // Filtering the dummy data based on the pattern (the user's input).
    var filteredRecommendations = allRecommendations
        .where((tag) => tag.toLowerCase().startsWith(prefix.toLowerCase()))
        .toList();

    // Simulating a delay as if we're waiting for a response from an endpoint.
    await Future.delayed(const Duration(milliseconds: 300));

    return filteredRecommendations;
  }
}
