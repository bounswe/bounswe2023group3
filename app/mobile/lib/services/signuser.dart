import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class SignUser {

  Future<Response> sign(String email, String username, String password, String name, String surname) async {
    const String signEndpoint = '/auth/register'; // Replace with your login endpoint

    final Map<String, String> data = {
      'email': email,
      'password': password,
      'username': username,
      'name': name,
      'surname' : surname,
    };

    try {
      final Response response = await ApiService.dio.post(
        signEndpoint,
        data: data,
      );
      print("ANSDLIASKBJDKUASBDUKASBD KSA-___SAIOHIDUKVHJASD");
      return response;
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
  }

}
