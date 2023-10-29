import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class AuthService {


  Future<Response> login(String email, String password) async {
    const String loginEndpoint =
        '/login'; // To be replaced with the login endpoint

    final Map<String, String> data = {
      'user': email,
      'password': password,
    };

    try {
      final Response response = await ApiService.dio.post(
        loginEndpoint,
        data: data,
        options: Options(
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        ),
      );
      return response;
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
  }

  void saveToken(String token) {
    ApiService.setJwtToken(token);
  }
}
