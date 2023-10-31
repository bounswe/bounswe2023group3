import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class SignUpVerification {

  Future<Response> submitMailandOTP(String email, int OTP) async {
    const String forgotPasswordEndpoint =
        '/auth/verify';




    try {
      final Response response = await ApiService.dio.post(
        forgotPasswordEndpoint,
        data: {'email': email,
        'verificationCode': OTP},
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }
  void saveToken(String token) {
    ApiService.setJwtToken(token);
  }
}
