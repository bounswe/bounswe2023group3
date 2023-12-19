import 'package:dio/dio.dart';
import 'package:mobile_app/models/tag.dart';
import 'package:mobile_app/services/apiService.dart';

class TagsRequestService {
  static Future<List<TagData>> getTags() async {
    try {
      Response tagsResponse = await ApiService.dio.get('/tag');
      List<dynamic> tagsJson = tagsResponse.data;

      List<TagData> tags = [];
      for (var tag in tagsJson) {
        final tagId = tag['id'];
        final name = tag['name'];
        tags.add(TagData(
          tagId: tagId,
          name: name,
        ));
      }

      print(tags.map((e) => e.name).toList());
      return tags;


    }
    catch (e) {
      print("TagsRequestService.getTags(): ${e.toString()}");
      rethrow;
    }
  }
}
