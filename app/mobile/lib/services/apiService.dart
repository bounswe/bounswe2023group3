import 'package:curl_logger_dio_interceptor/curl_logger_dio_interceptor.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

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
        if (!shouldIgnoreInterceptor(options.uri)) {
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
  }

  static void setJwtToken(String token) {
    jwtToken = token;
  }

  static Future<String> getToken() async {
    return jwtToken;
  }

  static void logout() {
    setJwtToken('');
  }

  static bool shouldIgnoreInterceptor(Uri uri) {
    List<String> ignoredEndpoints = [
      '/auth/login',
      '/auth/register',
      '/auth/verify',
      '/auth/forgot-password',
      '/auth/reset-password',
      '/moderator/login',
    ];
    // Check if the current URL should be ignored
    bool shouldIgnore =
        ignoredEndpoints.any((endpoint) => uri.path.startsWith(endpoint));
    return shouldIgnore;
  }
}
