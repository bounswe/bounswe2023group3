import 'package:flutter/material.dart';
import 'package:mobile_app/services/moderatorService.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart';
import 'package:mobile_app/view/moderatorHomePage/requestViewHome.dart';
import 'package:mobile_app/view/constants.dart';

class ModeratorHomePage extends StatelessWidget {
  const ModeratorHomePage({super.key});

  void tapOnPoll(BuildContext context, userName, userUsername,
      profilePictureUrl, postTitle, tags, tagColors) {
    // Navigator.push(
    //   context,
    //   MaterialPageRoute(
    //     //TODO change it to requestView
    //     // builder: (context) => PollPage(userName: userName, userUsername: userUsername, profilePictureUrl: profilePictureUrl, postTitle: postTitle, tags: tags, tagColors: tagColors),
    //   ),
    // );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<RequestViewHome>>(
        future: ModeratorService.getPollRequests(),
        builder: (BuildContext context,
            AsyncSnapshot<List<RequestViewHome>> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            // Show a loading indicator while the data is being fetched
            return const CircularProgressIndicator();
          } else if (snapshot.hasError) {
            // Show an error message if there is an error
            print(snapshot);
            print("ccc");
            return Text('Error: ${snapshot.error}');
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            // Handle the case where no data is available
            print("ddd");
            return const Text('No data available');
          } else {
            // Build your UI using the fetched data
            List<RequestViewHome> requests = snapshot.data!;
            return Scaffold(
              appBar: AppBar(
                title: const Text('Home'),
              ),
              drawer: const Sidebar(), // Use the custom drawer widget
              body: Column(
                children: [
                  // Scrollable Post Section
                  Expanded(
                    child: ListView.separated(
                      separatorBuilder: (context, index) => const SizedBox(
                          height: 20), // Add spacing between posts
                      shrinkWrap: true,
                      itemCount: requests.length,
                      itemBuilder: (context, index) {
                        final request = requests[index];
                        return SizedBox(
                          width: 50,
                          height: 250,
                          child: Stack(
                            children: [
                              // Your existing RequestViewHome widget with Expanded
                              Expanded(
                                child: RequestViewHome(
                                  userName: request.userName,
                                  userUsername: request.userUsername,
                                  profilePictureUrl: request.profilePictureUrl,
                                  postTitle: request.postTitle,
                                  tags: request.tags,
                                  tagColors: request.tagColors,
                                  dateTime: request.dateTime,
                                ),
                              ),
                              // Align the button to the right and bottom of the container
                              Align(
                                alignment: Alignment.bottomRight,
                                child: Padding(
                                  padding: const EdgeInsets.all(
                                      8.0), // Add padding as needed
                                  child: Material(
                                    borderRadius: BorderRadius.circular(30.0),
                                    // Adjust the value for circular shape
                                    color: Colors.blue,
                                    // Set the color you want
                                    child: InkWell(
                                      borderRadius: BorderRadius.circular(30.0),
                                      onTap: () {
                                        tapOnPoll(
                                          context,
                                          request.userName,
                                          request.userUsername,
                                          request.profilePictureUrl,
                                          request.postTitle,
                                          request.tags,
                                          request.tagColors,
                                        );
                                      },
                                      child: Container(
                                        padding: const EdgeInsets.all(8.0),
                                        child: const Text(
                                          'View Request',
                                          style: TextStyle(
                                              color: whitish,
                                              fontSize: 16.0,
                                              fontWeight: FontWeight.bold),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            );
          }
        });
  }
}
