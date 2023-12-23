import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:mobile_app/models/tag.dart';
import 'package:mobile_app/services/leaderboardService.dart';
import 'package:mobile_app/services/tagsRequestService.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:mobile_app/view/errorWidget/errorWidget.dart';
import 'package:mobile_app/view/leaderboard/personData.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart';

class LeaderboardPage extends StatefulWidget {
  final String selectedTagID; // Currently selected tag
  final String selectedTagName; // Currently selected tag
  const LeaderboardPage(
      {super.key, required this.selectedTagName, required this.selectedTagID});

  @override
  _LeaderboardPageState createState() => _LeaderboardPageState();
}

class _LeaderboardPageState extends State<LeaderboardPage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final TextEditingController _controller = TextEditingController();

  late String selectedTagID;
  late String selectedTagName;
  late String globalID;

  List<PersonData> globalLeaderboard = [];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, initialIndex: 0, vsync: this);
    selectedTagID = widget.selectedTagID;
    selectedTagName = widget.selectedTagName;
    _controller.text = selectedTagName;


  }



  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    List<TagData> tags = [];
    return FutureBuilder<List<TagData>>(
        future: TagsRequestService.getTags(),
        builder: (BuildContext context,
            AsyncSnapshot<List<TagData>> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            // Show a loading indicator while the data is being fetched
            return const CircularProgressIndicator();
          } else if (snapshot.hasError) {
            // Show an error message if there is an error
            print(snapshot);
            return Text('Error: ${snapshot.error}');
            // } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            // Handle the case where no data is available

            print("ddd");
            return const Text('No data available');
          } else {
            // Build the ListView
            // Build your UI using the fetched data
            List<TagData> tags = snapshot.data!;

            for (int i = tags.length - 1; i >= 0; i--) {
              if (tags[i].name == "general") {
                globalID = tags[i].tagId;
                break;
              }
            }
            return Scaffold(
              appBar: AppBar(
                title: Text('Leaderboard'),
                bottom: TabBar(
                  controller: _tabController,
                  tabs: [
                    Tab(text: 'Global'),
                    Tab(text: 'Tag-Specific'),
                  ],
                ),
              ),
              drawer: const Sidebar(), // Use the custom drawer widget
              body: TabBarView(
                controller: _tabController,
                children: [
                  // First tab: Global Leaderboard
                  globalLeaderboard.isEmpty
                      ? FutureBuilder<List<PersonData>>(
                          future: LeaderboardService.getRankings(
                              globalID), //global ID
                          builder: (BuildContext context,
                              AsyncSnapshot<List<PersonData>> snapshot) {
                            return buildLeaderboardSnapshot(snapshot);
                          },
                        )
                      : buildLeaderboardTab(globalLeaderboard),

                  // Second tab: Tag-Specific Leaderboard
                  FutureBuilder<List<PersonData>>(
                    future: LeaderboardService.getRankings(
                        selectedTagID == "" ? tags[0].tagId : selectedTagID),
                    builder: (BuildContext context,
                        AsyncSnapshot<List<PersonData>> snapshot) {
                      return buildTagLeaderboardSnapshot(snapshot, tags);
                    },
                  ),
                ],
              ),
            );
          }
        });
  }

  Widget buildLeaderboardSnapshot(AsyncSnapshot<List<PersonData>> snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      // Show a loading indicator while the data is being fetched
      return const Center(child: CircularProgressIndicator());
    } else if (snapshot.hasError) {
      // Show an error message if there is an error
      if (snapshot.error is DioException) {
        DioException e = snapshot.error as DioException;
        if (e.response?.statusMessage != null) {
          String r = e.response!.statusMessage!;
          return CustomErrorWidget(
              errorMessage: r,
              onRetryPressed: () {
                setState(() {});
              });
        }
      }
      return CustomErrorWidget(
          errorMessage: 'Something went wrong',
          onRetryPressed: () {
            setState(() {});
          });
    } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
      // Handle the case where no data is available
      return CustomErrorWidget(
          errorMessage: 'No data available',
          onRetryPressed: () {
            setState(() {});
          });
    } else {
      return buildLeaderboardTab(snapshot.data!);
    }
  }

  // Function to build the leaderboard for a specific tab
  Widget buildLeaderboardTab(List<PersonData> leaderboardData) {
    return Column(
      children: [
        // Title at the top
        Padding(
          padding: const EdgeInsets.fromLTRB(16.0, 30.0, 16.0, 8.0),
          child: Text(
            'Global Leaderboard',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
        ),
        // Current user's ranking (Replace this with your logic) and tag-specific rankings
        RankingTable(leaderboardData: leaderboardData),
      ],
    );
  }

  Widget buildTagLeaderboardSnapshot(AsyncSnapshot<List<PersonData>> snapshot, List<TagData> tags) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      // Show a loading indicator while the data is being fetched
      return const Center(child: CircularProgressIndicator());
    } else if (snapshot.hasError) {
      // Show an error message if there is an error
      if (snapshot.error is DioException) {
        DioException e = snapshot.error as DioException;
        if (e.response?.statusMessage != null) {
          String r = e.response!.statusMessage!;
          return CustomErrorWidget(
              errorMessage: r,
              onRetryPressed: () {
                setState(() {});
              });
        }
      }
      return CustomErrorWidget(
          errorMessage: 'Something went wrong',
          onRetryPressed: () {
            setState(() {});
          });
    } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
      // Handle the case where no data is available
      return CustomErrorWidget(
          errorMessage: 'No data available',
          onRetryPressed: () {
            setState(() {});
          });
    } else {
      return buildTagLeaderboardTab(snapshot.data!, tags);
    }
  }

  // Function to build the second tab with tag-specific leaderboard
  Widget buildTagLeaderboardTab(List<PersonData> tagLeaderboards, List<TagData> tags) {
    return Column(
      children: [
        // Title at the top
        Padding(
          padding: const EdgeInsets.fromLTRB(16.0, 30.0, 16.0, 8.0),
          child: Text(
            'Tag Leaderboard',
            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          ),
        ),
        // Dropdown menu to select tag

        Padding(
          padding: const EdgeInsets.fromLTRB(20.0, 0, 20.0, 8.0),
          child: TypeAheadField(
            hideOnEmpty: true,
            suggestionsBoxDecoration: SuggestionsBoxDecoration(
              borderRadius: BorderRadius.circular(20.0),
            ),
            textFieldConfiguration: TextFieldConfiguration(
              autofocus: true,
              controller: _controller,
              decoration: const InputDecoration(
                hintText: 'Search tag...',
              ),
            ),
            suggestionsCallback: (pattern) {
              return tags
                  .map((tag) => tag.name)
                  .toList()
                  .where((tagName) =>
                      tagName.toLowerCase().contains(pattern.toLowerCase()))
                  .toList();
            },
            itemBuilder: (context, suggestion) {
              return ListTile(
                title: Text(suggestion),
              );
            },
            onSuggestionSelected: (suggestion) {
              // Handle when a suggestion is selected.
              _controller.text = suggestion;
              setState(() {
                selectedTagName = suggestion;
                selectedTagID =
                    tags.firstWhere((tag) => tag.name == suggestion).tagId;
              });
            },
          ),
        ),
        // Current user's ranking (Replace this with your logic) and tag-specific rankings
        RankingTable(leaderboardData: tagLeaderboards),
      ],
    );
  }
}

// Function to build the table of rankings
class RankingTable extends StatelessWidget {
  final List<PersonData> leaderboardData;

  const RankingTable({super.key, required this.leaderboardData});

  // Function to build a user card
  Widget buildUserCard(int ranking, String username, int score, String userId,
      {Color color = Colors.white}) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      color: color,
      child: ListTile(
        leading: Text('$ranking'),
        title: Text(username),
        trailing: Text('$score'),
        // Add other user details or metrics here
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: buildUserCard(
            0, leaderboardData[0].username, leaderboardData[0].score, leaderboardData[0].userId, color: pink), // Current user's ranking
      ),
// Scrollable widget for other people's rankings
      Expanded(
        child: ListView.builder(
          itemCount: leaderboardData.length,
          itemBuilder: (context, index) {
            final user = leaderboardData[index];
            if (index>0){
              return buildUserCard(index,user.username, user.score, user.userId);
            }
          },
        ),
      ),
    ]);
  }
}
