import 'package:curl_logger_dio_interceptor/curl_logger_dio_interceptor.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get_it/get_it.dart';
import 'package:mobile_app/view/state.dart';

class ApiService {
  static final Dio _dio = Dio();
  static final GetIt getIt = GetIt.instance;
  static String baseUrl = 'http://34.105.66.254:1923/';
  static String jwtToken = '';

  static void setup() {
    getIt.registerSingleton<Dio>(_dio);
  }

  static Dio get dio => getIt<Dio>();

  static Future<void> init() async {
    // Set up your Dio instance with interceptors, base URL, etc.
    dio.options.baseUrl = baseUrl;
    dio.interceptors.add(InterceptorsWrapper(
      onRequest:
          (RequestOptions options, RequestInterceptorHandler handler) async {
        if (!shouldIgnoreInterceptor(options.uri, options.method)) {
          options.headers['Authorization'] = 'Bearer ${await getToken()}';
        }
        return handler.next(options);
      },
      onResponse: (Response response, ResponseInterceptorHandler handler) {
        return handler.next(response);
      },
      onError: (DioException exception, ErrorInterceptorHandler handler) {
        return handler.next(exception);
      },
    ));
    dio.interceptors.add(CurlLoggerDioInterceptor(printOnSuccess: true));
    dio.interceptors.add(DefaultInterceptor());
  }

  static void setJwtToken(String token) {
    jwtToken = token;
  }

  static Future<String> getToken() async {
    return jwtToken;
  }

  static void logout() {
    setJwtToken('');
    AppState.logout();
  }

  static bool shouldIgnoreInterceptor(Uri uri, String method) {
    List<String> ignoredEndpoints = [
      '/auth/login',
      '/auth/register',
      '/auth/verify',
      '/auth/forgot-password',
      '/auth/reset-password',
      '/moderator/login',
      '/poll',
    ];
    // Check if the current URL should be ignored
    if (uri.path == '/poll' && method == 'POST') {
      return false;
    }
    bool shouldIgnore = ignoredEndpoints.any((endpoint) => uri.path == endpoint);
    return shouldIgnore;
  }
}

class DefaultInterceptor extends Interceptor {
  @override
  Future<void> onError(DioException e, ErrorInterceptorHandler handler) async {
    if (e.response?.statusCode == 401) {
      // Handle 401 error, for example, show a toast
      Fluttertoast.showToast(
        msg: "You must be logged in to perform this action.",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIosWeb: 1,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0,
      );
    }

    // Continue with the error handling
    super.onError(e, handler);
  }
}