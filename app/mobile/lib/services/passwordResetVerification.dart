import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class PasswordResetVerification {

  Future<Response> submitPass(int OTP, String email, String password) async {
    const String resetPasswordEndpoint =
        '/auth/reset-password';



    try {
      final Response response = await ApiService.dio.post(
        resetPasswordEndpoint,
        data: {'resetPasswordToken': OTP,
          'email': email,
          'password': password,},
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
