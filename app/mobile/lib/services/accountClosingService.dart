import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class AccountClosingService {

  Future<Response> closeAccount(String userID) async {
    String closeAccountEndpoint =
        '/user/$userID';  //if exists

    final Map<String, String> data = {};

    print(closeAccountEndpoint);
    try {
      final Response response = await ApiService.dio.delete(
        closeAccountEndpoint,
        data: data,
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
