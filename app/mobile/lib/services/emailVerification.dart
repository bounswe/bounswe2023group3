import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class EmailVerification {

  Future<Response> submitMail(String email) async {
    const String forgotPasswordEndpoint =
        '/auth/forgot-password';

    final Map<String, String> data = {
      'email': email,
    };


    try {
      final Response response = await ApiService.dio.post(
        forgotPasswordEndpoint,
        data: data,
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
