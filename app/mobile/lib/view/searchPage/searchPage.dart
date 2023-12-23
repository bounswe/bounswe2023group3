import 'package:flutter/material.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart';
import 'package:mobile_app/services/searchUserService.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({Key? key}) : super(key: key);

  @override
  _SearchPageState createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  final TextEditingController _searchController = TextEditingController();
  List<User> _searchResults = [];

  final SearchUser _searchUser = SearchUser(); // Instantiate the SearchUser class

  void _searchUsers(String query) async {
    try {
      List<User> users = await _searchUser.search(query); // Use the search method from the service
      setState(() {
        _searchResults = users;
      });
    } catch (e) {
      print('Error searching users: $e');
    }
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
          leading: CircleAvatar(
            backgroundImage: NetworkImage(_searchResults[index].profilePicture),
          ),
          title: Text(_searchResults[index].username),
          // Display more user details if needed
        );
      },
    );
  }
}
