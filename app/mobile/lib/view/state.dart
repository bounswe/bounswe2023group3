import 'dart:math';

class AppState {
  static bool isModerator = false;
  static String loggedInUserId = '';
  static String loggedInUserUsername = '';
  static Random random = Random();
  static bool isGuest = true;

  static void logout() {
    isModerator = false;
    loggedInUserId = '';
    loggedInUserUsername = '';
    isGuest = true;
  }
}
