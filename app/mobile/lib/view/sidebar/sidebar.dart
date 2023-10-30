import 'package:flutter/material.dart';
import 'package:mobile_app/view/homePage/homePage.dart';
import 'package:mobile_app/services/apiService.dart';

class Sidebar extends StatelessWidget {
  const Sidebar({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          const DrawerHeader(
            decoration: BoxDecoration(
              color: Colors.blue,
            ),
            child: Text(
              'Side Menu',
              style: TextStyle(
                color: Colors.white,
                fontSize: 24,
              ),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.person),
            title: const Text('Profile'),
            onTap: () {
              // Navigate to the settings page or perform other actions
            },
          ),
          ListTile(
            leading: const Icon(Icons.home),
            title: const Text('Home'),
            onTap: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                  builder: (context) => HomePage(),
                ),
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.notifications),
            title: const Text('Notifications'),
            onTap: () {
              // Navigate to the settings page or perform other actions
            },
          ),
          ListTile(
            leading: const Icon(Icons.settings),
            title: const Text('Settings'),
            onTap: () {
              // Navigate to the settings page or perform other actions
            },
          ),
          const SizedBox(
            height: 6.0,
          ),
          ListTile(
            leading: const Icon(Icons.add),
            title: const Text('Create a poll request'),
            onTap: () {
                Navigator.pushNamed(
                  context,
                  '/pollreq'
                );
              // Navigate to the settings page or perform other actions
            },
          ),
          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text('Log out'),
            onTap: () {
              ApiService.logout();
              Navigator.pushReplacementNamed(
                context,
                '/welcome'
              );
            },
          ),
          // Add more ListTiles for other navigation options
        ],
      ),
    );
  }
}
