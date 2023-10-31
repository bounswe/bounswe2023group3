import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class PasswordResetVerification {

  Future<Response> submitPass(int OTP, String id, String password) async {
    const String resetPasswordEndpoint =
        '/auth/reset-password';



    try {
      final Response response = await ApiService.dio.post(
        resetPasswordEndpoint,
        data: {'resetPasswordToken': OTP,
          'id': id,
          'password': password,},
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
