import 'package:flutter/material.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class User {
  final String id;
  final String username;
  final String profilePicture;

  User({required this.id, required this.username, required this.profilePicture});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? '',
      username: json['username'] ?? '',
      profilePicture: json['profile_picture'] ?? '',
    );
  }
}
class SearchUser {
  Future<List<User>> search(String username) async {
    final String searchEndpoint = '/user/search/$username';
    final Map<String, dynamic> queryParams = {
      'username': username,
    };

    try {
      final Response response = await ApiService.dio.get(
        searchEndpoint,
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        List<dynamic> searchResult = response.data as List<dynamic>;
        List<User> users = searchResult.map((userData) {
          return User.fromJson(userData);
        }).toList();
        return users;
      }
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
    return []; // Return an empty list if no data or an error occurs
  }
}