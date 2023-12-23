
import 'package:flutter/material.dart';
import 'package:mobile_app/view/homePage/homePage.dart';
import 'package:mobile_app/services/apiService.dart';
import 'package:mobile_app/view/leaderboard/leaderboardPage.dart';
import 'package:mobile_app/view/moderatorHomePage/moderatorHomePage.dart';
import 'package:mobile_app/view/profilePage/profilePage.dart';
import 'package:mobile_app/view/state.dart';

import '../constants.dart';

class Sidebar extends StatelessWidget {
  const Sidebar({super.key});

  @override
  Widget build(BuildContext context) {
    if (AppState.isGuest) {
      return Drawer(
        backgroundColor: lightBlue,
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            SizedBox(
              height: 150.0,
              child: DrawerHeader(
                decoration: BoxDecoration(
                  color: navy,
                ),
                child: Row(
                  children: [
                    Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(0, 13, 0, 0),
                          child: Image.asset(
                            "assets/app-logo-white.png",
                            scale: 8,
                          ),
                        ),
                        Text(
                          "'Poll'Up",
                          style: TextStyle(
                            color: whitish,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      width: 25.0,
                    ),
                    Center(
                      child: Text(
                        'Side Menu',
                        style: TextStyle(
                          color: whitish,
                          fontSize: 24,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Home'),
              onTap: () {
                Navigator.pushReplacementNamed(
                  context,
                  '/guest',
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.search),
              title: const Text('Search'),
              onTap: () {
                Navigator.pushReplacementNamed(
                  context,
                  '/search',
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.leaderboard),
              title: const Text('Leaderboard'),
              onTap: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => LeaderboardPage(selectedTagName: '',selectedTagID: '',),
                  ),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.logout),
              title: const Text('Welcome Page'),
              onTap: () {
                ApiService.logout();
                Navigator.pushNamedAndRemoveUntil(
                  context,
                  '/welcome',
                      (Route<dynamic> route) =>
                  false, // This condition ensures removing all previous routes
                );
              },
            ),
          ],
        ),
      );
    }
    if (AppState.isModerator) {
      return Drawer(
        backgroundColor: lightBlue,
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            SizedBox(
              height: 150.0,
              child: DrawerHeader(
                decoration: BoxDecoration(
                  color: navy,
                ),
                child: Row(
                  children: [
                    Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.fromLTRB(0, 13, 0, 0),
                          child: Image.asset(
                            "assets/app-logo-white.png",
                            scale: 8,
                          ),
                        ),
                        Text(
                          "'Poll'Up",
                          style: TextStyle(
                            color: whitish,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      width: 25.0,
                    ),
                    Center(
                      child: Text(
                        'Side Menu',
                        style: TextStyle(
                          color: whitish,
                          fontSize: 24,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Home'),
              onTap: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => ModeratorHomePage(),
                  ),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.search),
              title: const Text('Search'),
              onTap: () {
                Navigator.pushReplacementNamed(
                  context,
                  '/search',
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.leaderboard),
              title: const Text('Leaderboard'),
              onTap: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => LeaderboardPage(selectedTagName: '',selectedTagID: '',),
                  ),
                );
              },
            ),
            const SizedBox(
              height: 6.0,
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
              leading: const Icon(Icons.logout),
              title: const Text('Log out'),
              onTap: () {
                ApiService.logout();
                Navigator.pushNamedAndRemoveUntil(
                  context,
                  '/welcome',
                  (Route<dynamic> route) =>
                      false, // This condition ensures removing all previous routes
                );
              },
            ),
            // Add more ListTiles for other navigation options
          ],
        ),
      );
    }
    return Drawer(
      backgroundColor: lightBlue,
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          SizedBox(
            height: 150.0,
            child: DrawerHeader(
              decoration: BoxDecoration(
                color: navy,
              ),
              child: Row(
                children: [
                  Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.fromLTRB(0, 13, 0, 0),
                        child: Image.asset(
                          "assets/app-logo-white.png",
                          scale: 8,
                        ),
                      ),
                      Text(
                        "'Poll'Up",
                        style: TextStyle(
                          color: whitish,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(
                    width: 25.0,
                  ),
                  Center(
                    child: Text(
                      'Side Menu',
                      style: TextStyle(
                        color: whitish,
                        fontSize: 24,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.person),
            title: const Text('Profile'),
            onTap: () {
              // pass the actual parameter
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                  builder: (context) =>
                      // burasi kendi profili.
                      // denemek icin baskasininkini gostertcem.
                      // ~faruk
                      // const ProfilePage(
                      // userId: '06aa8e23-8349-4352-ac54-2637b9c13a3f'),
                      ProfilePage.withId(userId: AppState.loggedInUserId),
                ),
              );
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
            leading: const Icon(Icons.search),
            title: const Text('Search'),
            onTap: () {
              Navigator.pushReplacementNamed(
                context,
                '/search',
              );
            },
          ),
          ListTile(
            leading: const Icon(Icons.leaderboard),
            title: const Text('Leaderboard'),
            onTap: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(
                  builder: (context) => LeaderboardPage(selectedTagName: '',selectedTagID: '',),
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
              Navigator.pushNamed(context, '/pollreq');
              // Navigate to the settings page or perform other actions
            },
          ),
          ListTile(
            leading: const Icon(Icons.logout),
            title: const Text('Log out'),
            onTap: () {
              ApiService.logout();
              Navigator.pushNamedAndRemoveUntil(
                context,
                '/welcome',
                (Route<dynamic> route) =>
                    false, // This condition ensures removing all previous routes
              );
            },
          ),
          // Add more ListTiles for other navigation options
        ],
      ),
    );
  }
}
