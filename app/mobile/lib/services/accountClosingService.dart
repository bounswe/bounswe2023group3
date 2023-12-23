import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class AccountClosingService {

  Future<Response> closeAccount() async {
    const String closeAccountEndpoint =
        '/user/close-account';  //if exists

    final Map<String, String> data = {};


    try {
      final Response response = await ApiService.dio.post(
        closeAccountEndpoint,
        data: data,
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
