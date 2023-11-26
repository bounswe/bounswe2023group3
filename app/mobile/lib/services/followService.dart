import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class FollowService {
  static Future<bool> isFollowing(String followerId, String followedId) async {
    // followerId user data'yi cek.
    // following list'te followedId var mı yok mu diye bak
    // response.data['followings'] -> list of String, (id)
    try {
      print("follow service is following");
      Response followerUser = await ApiService.dio.get('/user/$followerId');
      List<String> followingIds =
          List<String>.from(followerUser.data['followings']);
      return followingIds.contains(followedId);
    } catch (e) {
      // faruk (kodu yazan): false dondurmek yeterli olacaktir.
      return false;
    }
  }

  static Future<void> follow(String followerId, String followedId) async {
    try {
      Response response = await ApiService.dio.post('/user/follow', data: {
        'followerUserID': followedId,
      });
      print("follow response: $response");
    } catch (e) {
      rethrow;
    }
  }

  static Future<void> unfollow(String followerId, String followedId) async {
    try {
      Response response = await ApiService.dio.post('/user/unfollow', data: {
        'followerUserID': followedId,
      });
      print("unfollow response: $response");
    } catch (e) {
      rethrow;
    }
  }
}
