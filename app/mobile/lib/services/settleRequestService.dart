import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:mobile_app/services/apiService.dart';

class SettleRequestService {

  Future<Response> send(String outcome, String source, String id) async {
    String resetPasswordEndpoint =
        '/poll/settle-request/$id';



    try {
      final Response response = await ApiService.dio.post(
        resetPasswordEndpoint,
        data: {'outcome': outcome,
          'outcome_source': source,
        },
      );

      return response;
    } catch (e) {
      rethrow;
    }
  }

}
