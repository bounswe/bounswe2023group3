import 'package:flutter/material.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart'; // Import your custom drawer widget

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
      ),
      drawer: const Sidebar(), // Use the custom drawer widget
      body: Column(
        children: [
          // Scrollable Post Section
          Expanded(
            child: ListView.builder(
              itemCount: 50, // Replace with the actual number of posts
              itemBuilder: (context, index) {
                // Replace this with your post widget
                return ListTile(
                  title: Text('Post $index'),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
