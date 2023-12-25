import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:mobile_app/services/moderatorService.dart';
import 'package:mobile_app/view/moderatorApproval/moderatorApprovalScreen.dart';
import 'package:mobile_app/view/moderatorApproval/pollData.dart';
import 'package:mobile_app/view/moderatorHomePage/settleViewHome.dart';
import 'package:mobile_app/view/sidebar/sidebar.dart';
import 'package:mobile_app/view/moderatorHomePage/requestViewHome.dart';
import 'package:mobile_app/view/constants.dart';

import '../errorWidget/errorWidget.dart';
import '../moderatorApproval/moderatorSettleApproval.dart';
import '../waitingScreen/fancyWaitingScreen.dart';

class ModeratorHomePage extends StatefulWidget {
  const ModeratorHomePage({Key? key}) : super(key: key);

  @override
  State<ModeratorHomePage> createState() => _ModeratorHomePageState();
}

class _ModeratorHomePageState extends State<ModeratorHomePage>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> tapOnPoll(
      BuildContext context,
      String pollId,
      String pollTitle,
      String username,
      String userUsername,
      String profilePictureUrl,
      List<String> options,
      List<String> tags,
      List<String> imageURLs,
      List<Color> tagColors,
      String dueDate,
      String creationDate) async {
    final resultMessage = await Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => ModeratorApprovalScreen(
                tagColors: const [Colors.pink, Colors.blue],
                pollData: PollData(
                  pollId: pollId,
                  pollTitle: pollTitle,
                  options: options,
                  tags: tags,
                  imageURLs: imageURLs,
                  dueDate: dueDate,
                  userName: username,
                  userUsername: userUsername,
                  profilePictureUrl: profilePictureUrl,
                  tagColors: tagColors,
                  creationDate: creationDate,
                  outcome: '',
                  outcomeSource: '',
                ),
              )),
    );
    setState(() {
      // Refresh the page
    });
    if (resultMessage != null) {
      ScaffoldMessenger.of(context)
        ..removeCurrentSnackBar()
        ..showSnackBar(SnackBar(
          content: Text(resultMessage),
          duration: const Duration(seconds: 3),
        ));
    }
  }

  Future<void> tapOnSettle(
      BuildContext context,
      String pollId,
      String pollTitle,
      String username,
      String userUsername,
      String profilePictureUrl,
      List<String> options,
      List<String> tags,
      List<String> imageURLs,
      List<Color> tagColors,
      String dueDate,
      String creationDate,
      String outcome,
      String outcomeSource) async {
    final resultMessage = await Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => ModeratorSettleApproval(
                tagColors: const [Colors.pink, Colors.blue],
                pollData: PollData(
                    pollId: pollId,
                    pollTitle: pollTitle,
                    options: options,
                    tags: tags,
                    imageURLs: imageURLs,
                    dueDate: dueDate,
                    userName: username,
                    userUsername: userUsername,
                    profilePictureUrl: profilePictureUrl,
                    tagColors: tagColors,
                    creationDate: creationDate,
                    outcome: outcome,
                    outcomeSource: outcomeSource),
              )),
    );
    setState(() {
      // Refresh the page
    });
    if (resultMessage != null) {
      ScaffoldMessenger.of(context)
        ..removeCurrentSnackBar()
        ..showSnackBar(SnackBar(
          content: Text(resultMessage),
          duration: const Duration(seconds: 3),
        ));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Moderator Home Page'),
      ),
      drawer: const Sidebar(),
      body: Column(
        children: [
          // TabBar for filtering options
          TabBar(
            controller: _tabController,
            tabs: const [
              Tab(text: 'Poll Creation Requests'),
              Tab(text: 'Poll Settle Requests'),
            ],
          ),
          // Scrollable Post Section
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                // Tab 1: Poll Creation Requests
                FutureBuilder<List<RequestViewHome>>(
                  future: ModeratorService.getPollRequests(),
                  builder: (BuildContext context,
                      AsyncSnapshot<List<RequestViewHome>> snapshot) {
                    return buildRequestsList(snapshot);
                  },
                ),
                // Tab 2: Poll Settle Requests
                FutureBuilder<List<SettleViewHome>>(
                  future: ModeratorService.getSettleRequests(),
                  builder: (BuildContext context,
                      AsyncSnapshot<List<SettleViewHome>> snapshot) {
                    return buildSettledList(snapshot);
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget buildRequestsList(AsyncSnapshot<List<RequestViewHome>> snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      // Show a loading indicator while the data is being fetched
      return FancyWaitingScreen();
    } else if (snapshot.hasError) {
      // Show an error message if there is an error
      if (snapshot.error is DioException) {
        DioException e = snapshot.error as DioException;
        if (e.response?.statusMessage != null) {
          String r = e.response!.statusMessage!;
          return CustomErrorWidget(
              errorMessage: r,
              onRetryPressed: () {
                setState(() {});
              });
        }
      }
      return CustomErrorWidget(
          errorMessage: 'Something went wrong',
          onRetryPressed: () {
            setState(() {});
          });
    } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
      // Handle the case where no data is available
      return CustomErrorWidget(
          errorMessage: 'No data available',
          onRetryPressed: () {
            setState(() {});
          });
    } else {
      // Build your UI using the fetched data
      List<RequestViewHome> requests = snapshot.data!;
      return Column(
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
                      RequestViewHome(
                        userName: request.userName,
                        userUsername: request.userUsername,
                        profilePictureUrl: request.profilePictureUrl,
                        postTitle: request.postTitle,
                        tags: request.tags,
                        tagColors: request.tagColors,
                        dateTime: request.dateTime,
                        pollId: request.pollId,
                        options: request.options,
                        dueDate: request.dueDate,
                        imageUrls: request.imageUrls,
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
                                    request.pollId,
                                    request.postTitle,
                                    request.userName,
                                    request.userUsername,
                                    request.profilePictureUrl,
                                    request.options,
                                    request.tags,
                                    request.imageUrls,
                                    request.tagColors,
                                    request.dueDate,
                                    request.dateTime);
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
      );
    }
  }

  Widget buildSettledList(AsyncSnapshot<List<SettleViewHome>> snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      // Show a loading indicator while the data is being fetched
      return FancyWaitingScreen();
    } else if (snapshot.hasError) {
      // Show an error message if there is an error
      if (snapshot.error is DioException) {
        DioException e = snapshot.error as DioException;
        if (e.response?.statusMessage != null) {
          String r = e.response!.statusMessage!;
          return CustomErrorWidget(
              errorMessage: r,
              onRetryPressed: () {
                setState(() {});
              });
        }
      }
      return CustomErrorWidget(
          errorMessage: 'Something went wrong',
          onRetryPressed: () {
            setState(() {});
          });
    } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
      // Handle the case where no data is available
      return CustomErrorWidget(
          errorMessage: 'No data available',
          onRetryPressed: () {
            setState(() {});
          });
    } else {
      // Build your UI using the fetched data
      List<SettleViewHome> requests = snapshot.data!;
      return Column(
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
                      SettleViewHome(
                          userName: request.userName,
                          userUsername: request.userUsername,
                          profilePictureUrl: request.profilePictureUrl,
                          postTitle: request.postTitle,
                          tags: request.tags,
                          tagColors: request.tagColors,
                          dateTime: request.dateTime,
                          pollId: request.pollId,
                          options: request.options,
                          dueDate: request.dueDate,
                          outcome: request.outcome,
                          outcomeSource: request.outcomeSource,
                          imageUrls: request.imageUrls),
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
                                tapOnSettle(
                                    context,
                                    request.pollId,
                                    request.postTitle,
                                    request.userName,
                                    request.userUsername,
                                    request.profilePictureUrl,
                                    request.options,
                                    request.tags,
                                    request.imageUrls,
                                    request.tagColors,
                                    request.dueDate,
                                    request.dateTime,
                                    request.outcome,
                                    request.outcomeSource);
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
      );
    }
  }
}
