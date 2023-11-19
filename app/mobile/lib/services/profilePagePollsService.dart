import 'package:flutter/material.dart';
import 'package:mobile_app/view/pollView/pollView.dart';
import 'package:mobile_app/view/pollViewHomePage/pollViewHomePage.dart';

class ProfilePagePollsService {
  static List<PollViewHomePage> getCreatedPolls(String username) {
    return mockList;
  }

  static List<PollViewHomePage> getLikedPolls(String username) {
    return mockList;
  }

  static List<PollViewHomePage> getVotedPolls(String username) {
    return mockList;
  }

  static List<PollViewHomePage> mockList = [
    PollViewHomePage(
        userName: "berkecaliskan",
        userUsername: "@berke",
        profilePictureUrl:
            "https://yt3.googleusercontent.com/bWL_Q46Ob6MxdYmMP7hWaox_pFLja8uh1iI02F9CtV-eaeR409j3xfWLG0GbmTzVEwX5R38ur2k=s900-c-k-c0x00ffffff-no-rj",
        postTitle: "Who will win the Super Cup?",
        tags: ["Sport"],
        tagColors: [Colors.blue],
        voteCount: 34,
        postOptions: ["Fenerbahçe", "Galatasaray"],
        likeCount: 13,
        dateTime: "12:01",
        comments: [
          CommentData(
              user: "real_elijah", commentText: "mazinde bir tarih yatar")
        ]),
    const PollViewHomePage(
        userName: "elijahwood",
        userUsername: "@real_elijah",
        profilePictureUrl:
            "https://m.media-amazon.com/images/M/MV5BMTM0NDIxMzQ5OF5BMl5BanBnXkFtZTcwNzAyNTA4Nw@@._V1_FMjpg_UX1000_.jpg",
        postTitle: "What should I do with the Ring?",
        tags: ["Life"],
        tagColors: [Colors.red],
        voteCount: 1347,
        postOptions: ["Destroy it", "Wear it", "Give it to Selda Bağcan"],
        likeCount: 673,
        dateTime: "9:45",
        comments: []),
    const PollViewHomePage(
        userName: "kabakhaber",
        userUsername: "@kbkhbr",
        profilePictureUrl:
            "https://static.ticimax.cloud/3140/uploads/urunresimleri/buyuk/b7387ec8-469f-4826-a914-094d62362971.jpg",
        postTitle: "Who will win the elections?",
        tags: ["News"],
        tagColors: [Colors.green],
        voteCount: 534,
        postOptions: ["Donald Trump", "Joe Biden", "Ye"],
        likeCount: 297,
        dateTime: "10:28",
        comments: []),
  ];
}
