class Annotation {
  final String body;
  final List<int> indices;

  Annotation({
    required this.body,
    required this.indices,
  });

  /// json is in the format:<p>
  /// {<p>
  ///   "body": { <p>
  ///     "value": "string"<p>
  ///   },<p>
  ///   "target": {<p>
  ///     "selector": {<p>
  ///       "start": int,<p>
  ///       "end": int<p>
  ///     }<p>
  ///   }<p>
  /// }<p>
  static Annotation fromJson(Map<String, dynamic> json) {
    var ann = Annotation(
      body: json['body']['value'],
      indices: json['target']['selector']['start'] != null &&
              json['target']['selector']['end'] != null
          ? [
              json['target']['selector']['start'],
              json['target']['selector']['end']
            ]
          : [-1, -1],
    );
    if (ann.indices.contains(-1)) {
      throw Error();
    }
    return ann;
  }
}
