import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {

  static const String baseUrl = 'https://restcountries.com/v3.1/name/'; // To be replaced with our backend API

  Future<http.Response> login(String email, String password) async {
    const String loginEndpoint = '/turkey'; // To be replaced with the login endpoint

    final Map<String, String> data = {
      'email': email,
      'password': password,
    };

    final Uri url = Uri.parse('$baseUrl$loginEndpoint');

    try {
      final http.Response response = await http.get(
        url,
        // body: data,  // To be uncommented
      );

      return response;
    } catch (e) {
      print('Error: $e');
      rethrow;
    }
  }
}
