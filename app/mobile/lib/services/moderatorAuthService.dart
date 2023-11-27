import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/moderatorApiService.dart';

class ModeratorAuthService {


  Future<Response> login(String email, String password) async {
    const String loginEndpoint =
        '/moderator/login'; // To be replaced with the login endpoint

    final Map<String, String> data = {
      'email': email,
      'password': password,
    };

    try {
      final Response response = await ModeratorApiService.dio.post(
        loginEndpoint,
        data: data,
      );
      return response;
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
  }

  void saveToken(String token) {
    ModeratorApiService.setJwtToken(token);
  }
}
