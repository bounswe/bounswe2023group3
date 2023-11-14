import 'package:flutter/material.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart'; // Import your custom drawer widget
import 'package:mobile_app/view/moderatorHomePage/requestViewHome.dart';
import 'package:mobile_app/view/constants.dart';

class ModeratorHomePage extends StatelessWidget {
  ModeratorHomePage({super.key});

  final List<RequestViewHome> requests = [
    const RequestViewHome(
        userName: "berkecaliskan",
        userUsername: "@berke",
        profilePictureUrl:
            "https://yt3.googleusercontent.com/bWL_Q46Ob6MxdYmMP7hWaox_pFLja8uh1iI02F9CtV-eaeR409j3xfWLG0GbmTzVEwX5R38ur2k=s900-c-k-c0x00ffffff-no-rj",
        postTitle: "Who will win the Super Cup?",
        tags: ["Sport"],
        tagColors: [Colors.blue],
        dateTime: "12:01"),
    const RequestViewHome(
        userName: "elijahwood",
        userUsername: "@real_elijah",
        profilePictureUrl:
            "https://m.media-amazon.com/images/M/MV5BMTM0NDIxMzQ5OF5BMl5BanBnXkFtZTcwNzAyNTA4Nw@@._V1_FMjpg_UX1000_.jpg",
        postTitle: "What should I do with the Ring?",
        tags: ["Life"],
        tagColors: [Colors.red],
        dateTime: "12:01"),
    const RequestViewHome(
        userName: "kabakhaber",
        userUsername: "@kbkhbr",
        profilePictureUrl:
            "https://static.ticimax.cloud/3140/uploads/urunresimleri/buyuk/b7387ec8-469f-4826-a914-094d62362971.jpg",
        postTitle: "Who will win the elections?",
        tags: ["News"],
        tagColors: [Colors.green],
        dateTime: "12:01")
  ];

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
              separatorBuilder: (context, index) =>
                  const SizedBox(height: 20), // Add spacing between posts
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
                            borderRadius: BorderRadius.circular(
                                30.0), // Adjust the value for circular shape
                            color: Colors.blue, // Set the color you want
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
}
