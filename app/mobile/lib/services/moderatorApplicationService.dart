import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class ModeratorApplicationService {

  Future<Response> applyToBeAModerator(String name, String surname, String email,  String interest, MultipartFile cv) async {
    const String applicationEndpoint =
        '/moderator/apply'; //if you change this, change the endpoint in the backend too



    final Map<String, dynamic> data = {
      'name': name,
      'surname': surname,
      'email': email,
      'interest': interest,
      'cv': cv
    };



    try {
      final Response response = await ApiService.dio.post(
        applicationEndpoint,
        data: data,
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
