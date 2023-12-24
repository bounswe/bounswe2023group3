import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class ReportService {
  static Future<bool> report(String userId, String reason) async {
    String reportEndpoint = '/user/report/$userId';

    final Map<String, dynamic> data = {
      'reason': reason,
    };

    try {
      final Response response = await ApiService.dio.post(
        reportEndpoint,
        data: data,
      );
      return response.statusCode == 201;
    } catch (e) {
      print('$e');
      return false;
    }
  }
}
