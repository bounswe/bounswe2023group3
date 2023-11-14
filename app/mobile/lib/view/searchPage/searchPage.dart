import 'package:flutter/material.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  final TextEditingController _searchController = TextEditingController();
  List<String> _searchResults = [];

  void _searchUsers(String query) {
    // Perform the search logic here (e.g., query a database or API)
    // For now, let's simulate the search results with a simple list
    setState(() {
      _searchResults = _fakeUserList.where((user) => user.contains(query)).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Search'),
      ),
      drawer: const Sidebar(), // Assuming you have Sidebar widget
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _searchController,
              onChanged: (query) {
                _searchUsers(query);
              },
              decoration: const InputDecoration(
                labelText: 'Search Users',
                prefixIcon: Icon(Icons.search),
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: _buildSearchResults(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchResults() {
    return ListView.builder(
      itemCount: _searchResults.length,
      itemBuilder: (context, index) {
        return ListTile(
          title: Text(_searchResults[index]),
          // Add more details if needed
        );
      },
    );
  }

  // Simulated user data for demonstration purposes
  final List<String> _fakeUserList = [
    'John Doe',
    'Jane Doe',
    'Alice Smith',
    'Bob Johnson',
    'Charlie Brown',
    'David Wilson',
  ];
}
