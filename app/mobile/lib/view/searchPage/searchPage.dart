import 'package:flutter/material.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart';
import 'package:mobile_app/services/searchUserService.dart';
import 'package:mobile_app/view/profilePage/profilePage.dart';

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
          onTap: () {
            // Action to perform on ListTile tap
            navigateToProfile(context, _searchResults[index].username);
          },
          leading: CircleAvatar(
              backgroundImage: _searchResults[index].profilePicture.isNotEmpty
                  ? NetworkImage(_searchResults[index].profilePicture) as ImageProvider // Use NetworkImage
                  : const AssetImage("assets/def_profile_photo2.jpg")
          ),
          title: Text(_searchResults[index].username),
          // Display more user details if needed
        );
      },
    );
  }
}

void navigateToProfile(BuildContext context, String username) {
  // Navigate to the profile page
  Navigator.push(
    context,
    MaterialPageRoute(
      builder: (context) => ProfilePage.withUsername(username: username),
    ),
  );
}