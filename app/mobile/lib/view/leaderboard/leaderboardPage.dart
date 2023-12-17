import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: LeaderboardPage(),
    );
  }
}

class LeaderboardPage extends StatefulWidget {
  @override
  _LeaderboardPageState createState() => _LeaderboardPageState();
}

class _LeaderboardPageState extends State<LeaderboardPage>
  with SingleTickerProviderStateMixin{

  // Dummy user data with rankings
  List<UserData> globalLeaderboard = [
    UserData(name: 'User 1', ranking: 1),
    UserData(name: 'User 2', ranking: 2),
    UserData(name: 'User 3', ranking: 3),
    // Add more users with rankings
  ];

  // Dummy user data with tag-specific rankings
  Map<String, List<UserData>> tagLeaderboards = {
    'Tag 1': [
      UserData(name: 'Tag 1 User A', ranking: 5),
      UserData(name: 'Tag 1 User B', ranking: 8),
      // Add more users with rankings for Tag 1
    ],
    'Tag 2': [
      UserData(name: 'Tag 2 User X', ranking: 3),
      UserData(name: 'Tag 2 User Y', ranking: 7),
      // Add more users with rankings for Tag 2
    ],
    // Add more tags with corresponding user rankings
  };


  late TabController _tabController;
  String selectedTag = 'Tag 1'; // Currently selected tag

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, initialIndex: 0,vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }


  final TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {


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
            buildLeaderboardTab(globalLeaderboard),

            // Second tab: Tag-Specific Leaderboard
            buildTagLeaderboardTab(tagLeaderboards),


          ],
        ),
    );
  }

  // Function to build the leaderboard for a specific tab
  Widget buildLeaderboardTab(List<UserData> leaderboardData) {
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
        // Current user's ranking (Replace this with your logic)
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: buildUserCard('Your User ID', 0), // Replace 'Your User ID' and 0 with actual data
        ),
        // Scrollable widget for other people's rankings
        Expanded(
          child: ListView.builder(
            itemCount: leaderboardData.length,
            itemBuilder: (context, index) {
              final user = leaderboardData[index];
              return buildUserCard(user.name, user.ranking);
            },
          ),
        ),
      ],
    );
  }

  // Function to build the second tab with tag-specific leaderboard
  Widget buildTagLeaderboardTab(Map<String,List<UserData>> tagLeaderboards) {
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
              return tagLeaderboards.keys
                  .where((country) => country.toLowerCase().contains(pattern.toLowerCase()))
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
                selectedTag = suggestion;
              });
            },
          ),
        ),

        Padding(
          padding: const EdgeInsets.all(8.0),
          child: buildUserCard('Your User ID', 0), // Replace 'Your User ID' and 0 with actual data
        ),
        // Scrollable widget for tag-specific rankings
        Expanded(
          child: ListView.builder(
            itemCount: tagLeaderboards[selectedTag]!.length,
            itemBuilder: (context, index) {
              final user = tagLeaderboards[selectedTag]![index];
              return buildUserCard(user.name, user.ranking);
            },
          ),
        ),
      ],
    );
  }

  // Function to build a user card
  Widget buildUserCard(String userName, int userRanking, {Color color=Colors.white}) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20.0),
      ),
      color: color,
      child: ListTile(
        leading: Text('$userRanking'),
        title: Text(userName),
        // Add other user details or metrics here
      ),
    );
  }
}

// Model class for user data
class UserData {
  final String name;
  final int ranking;

  UserData({required this.name, required this.ranking});
}
