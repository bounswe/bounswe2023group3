import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/services/apiService.dart';

class SignUser {

  Future<Response> sign(String username, String password) async {
    const String signEndpoint = '/auth/sign'; // Replace with your login endpoint

    final Map<String, String> data = {
      'email': username,
      'password': password,
      'username': username
    };

    try {
      final Response response = await ApiService.dio.post(
        signEndpoint,
        data: data,
      );
      return response;
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
  }
}
