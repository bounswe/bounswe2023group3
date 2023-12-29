import 'package:curl_logger_dio_interceptor/curl_logger_dio_interceptor.dart';
import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';

class AnnotationService {
  static final Dio _dio = Dio();
  static final GetIt getIt = GetIt.instance;
  static String baseUrl = 'http://34.118.192.246:1938/';

  // static void setup() {
  //   getIt.registerSingleton<Dio>(_dio);
  // }

  static Dio get dio => getIt<Dio>();

  static Future<void> init() async {
    // Set up your Dio instance with interceptors, base URL, etc.
    dio.interceptors.add(CurlLoggerDioInterceptor(printOnSuccess: true));
    dio.options.baseUrl = baseUrl;
  }


}
