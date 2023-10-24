import 'dart:convert';
import 'package:http/http.dart' as http;

class SignUser {
  static const String baseUrl =
      'https://restcountries.com/v3.1/name/'; // To be replaced with our backend API

  Future<http.Response> sign(String username, String password) async {
    const String signEndpoint = '/sign'; // Replace with your login endpoint

    final Map<String, String> data = {
      'username': username,
      'password': password,
    };

    final Uri url = Uri.parse('$baseUrl$signEndpoint');

    try {
      final http.Response response = await http.post(
        url,
        headers: <String, String>{
          'Content-Type': 'application/json',
        },
        body: jsonEncode(data),
      );

      return response;
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
  }
}
