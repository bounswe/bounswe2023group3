import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class PasswordEditService {

  Future<Response> submitPass(String password, String confirmPassword, String oldPassword) async {
    const String resetPasswordEndpoint =
        '/user/password';



    try {
      final Response response = await ApiService.dio.put(
        resetPasswordEndpoint,
        data: {'oldPassword': oldPassword,
          'passwordConfirm': confirmPassword,
          'password': password,},
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
