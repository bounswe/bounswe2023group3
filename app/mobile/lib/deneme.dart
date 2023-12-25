// Function to build the table of rankings
import 'package:mobile_app/view/leaderboard/personData.dart';
import 'package:mobile_app/view/constants.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/view/state.dart';



void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: MyLeaderboardPage(),
    );
  }
}

class MyLeaderboardPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Sample leaderboard data
    List<PersonData> sampleLeaderboardData = [
      PersonData(username: 'UserA', score: 100, userId: 'id1'),
      PersonData(username: 'UserB', score: 90, userId: 'id2'),
      PersonData(username: 'UserC', score: 80, userId: 'id3'),
      // Add more sample data as needed
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text('Leaderboard'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: RankingTable(leaderboardData: sampleLeaderboardData),
      ),
    );
  }
}


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
    var rest = leaderboardData.sublist(1);
    return Column(children: [
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: buildUserCard(
            0, "asasdasd", 0, "asdaadsa", color: pink), // Current user's ranking
      ),
// Scrollable widget for other people's rankings
      Expanded(
        child: ListView.builder(
          itemCount: rest.length,
          itemBuilder: (context, index) {
            final user = rest[index];

            return buildUserCard(index,user.username, user.score, user.userId);

          },
        ),
      ),
    ]);
  }
}
