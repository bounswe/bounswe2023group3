# Project Development Weekly Progress Report 8
**Team Name:** Group 3 - Prediction Poll  
**Date:** 5.12.2023

## Progress Summary
**Last two weeks**, we improved our poll implementation by adding like and comment functionalities, filter options, and we added follow mechanism between users. We deployed our backend, frontend and mobile applications to get ready for the milestone 2 presentation. After the milestone, we reviewed our work and improved some aspect accoring to the feedbacks. **Looking ahead to the next week**, we will try to complete most of the requirements related to the guest, user and moderators, and we will work with voting on polls, search semantics and badge annotations.

## What was planned for the week? How did it go?
| Description | Issue | Assignee | Due | PR | Estimated Duration | Actual Duration |
| --- | --- | --- | --- | --- | --- | --- |
| Implement Poll Lists According to Filter | [#375](https://github.com/bounswe/bounswe2023group3/issues/375) | FE/Serra | 26.11.2023 | [#440](https://github.com/bounswe/bounswe2023group3/pull/440), [#425](https://github.com/bounswe/bounswe2023group3/pull/425), [#402](https://github.com/bounswe/bounswe2023group3/pull/402) | 1.5hr | 1.5hr |
| Implement Detailed Tag Page | [#279](https://github.com/bounswe/bounswe2023group3/issues/279) | FE/Serra | 26.11.2023 | [#402](https://github.com/bounswe/bounswe2023group3/pull/402) | 1.5hr | 1hr |
| Deploy Frontend | [#376](https://github.com/bounswe/bounswe2023group3/issues/376) | FE/Serra, FE/Beyza, BE/Batuhan | 26.11.2023 | [#376](https://github.com/bounswe/bounswe2023group3/issues/376) | 1.5hr | 1.5hr |
| Add Logo | [#374](https://github.com/bounswe/bounswe2023group3/issues/374)| FE/Beyza | 26.11.2023 | [#430](https://github.com/bounswe/bounswe2023group3/pull/430) | 1.5hr | 0.5hr |
| Implement Interact with Poll and Follow Mechanisms | [#387](https://github.com/bounswe/bounswe2023group3/issues/387) | FE/Berk | 26.11.2023 | [#444](https://github.com/bounswe/bounswe2023group3/pull/444) | 1.5hr | 2hr |
| Implement User Connections | [#399](https://github.com/bounswe/bounswe2023group3/issues/387) | FE/Berk | 26.11.2023 | [#405](https://github.com/bounswe/bounswe2023group3/pull/405) | 2hr | 1.5hr |
| Implement Moderator Data Connections | [#377](https://github.com/bounswe/bounswe2023group3/issues/377) | FE/Beyza | 26.11.2023 | [#430](https://github.com/bounswe/bounswe2023group3/pull/430) | 1.5hr | 1.5hr |
| Implement Verification Page | [#392](https://github.com/bounswe/bounswe2023group3/issues/392) | FE/Ali | 26.11.2023 | [#479](https://github.com/bounswe/bounswe2023group3/pull/479) | 1.5hr | 1.5hr |
| Implement Unit Tests | [#398](https://github.com/bounswe/bounswe2023group3/issues/398) | FE Team | 26.11.2023 | [#409](https://github.com/bounswe/bounswe2023group3/pull/409) | 1.5hr | 2hr |
| Implement Guest Requirements | [#492](https://github.com/bounswe/bounswe2023group3/issues/492) | FE/Serra | 4.12.2023 | [#494](https://github.com/bounswe/bounswe2023group3/pull/494) | 1hr | 1hr |
| Improve tag bar and add redirects to tag page | [#491](https://github.com/bounswe/bounswe2023group3/issues/491) | FE/Serra | 4.12.2023 | [#494](https://github.com/bounswe/bounswe2023group3/pull/494) | 0.5hr | 0.5hr |
| Add deletion, report and outcome verification request to poll | [#490](https://github.com/bounswe/bounswe2023group3/issues/490) | FE/Serra | 4.12.2023 | [#494](https://github.com/bounswe/bounswe2023group3/pull/494) | 2hr | 2hr |
| Like Functionality | [#388](https://github.com/bounswe/bounswe2023group3/issues/388) | BE/Batuhan İlhan | 27.11.2023 | [#413](https://github.com/bounswe/bounswe2023group3/pull/413) | 2hr | 3hr |
| Comment Functionality | [#389](https://github.com/bounswe/bounswe2023group3/issues/389)| BE/Batuhan İlhan | 27.11.2023 | [#426](https://github.com/bounswe/bounswe2023group3/pull/426) | 2hr | 2hr |
| Add .env file | [#390](https://github.com/bounswe/bounswe2023group3/issues/390) | BE/Batuhan İlhan | 26.11.2023 | [#407](https://github.com/bounswe/bounswe2023group3/pull/407) | 1hr | 1hr |
| Fixing of approve status | [#391](https://github.com/bounswe/bounswe2023group3/issues/391)| BE/Batuhan İlhan | 26.11.2023 | [#408](https://github.com/bounswe/bounswe2023group3/pull/408) | 1hr | 0.5hr |
| Follow and unfollow endpoint bug fix | [#414](https://github.com/bounswe/bounswe2023group3/issues/414)| BE/Batuhan İlhan | 26.11.2023 | [#415](https://github.com/bounswe/bounswe2023group3/pull/415) | 1hr | 1hr |
| Add datetime field to comment entity| [#502](https://github.com/bounswe/bounswe2023group3/issues/502)| BE/Batuhan İlhan | 26.11.2023 | [#507](https://github.com/bounswe/bounswe2023group3/pull/507) | 1hr | 0.5hr |
| Create endpoint for users to fetch polls of themselves | [#503](https://github.com/bounswe/bounswe2023group3/issues/503)| BE/Batuhan İlhan | 26.11.2023 | [#506](https://github.com/bounswe/bounswe2023group3/pull/506) | 1hr | 1hr |
| Badge Entity | [#363](https://github.com/bounswe/bounswe2023group3/issues/363) | BE/Batuhan Çetin | 25.11.2023 | [#379](https://github.com/bounswe/bounswe2023group3/pull/379) | 1hr | 1hr |
| Moderator Login | [#364](https://github.com/bounswe/bounswe2023group3/issues/364) | BE/Batuhan Çetin | 24.11.2023 | [#378](https://github.com/bounswe/bounswe2023group3/pull/378) | 1hr | 1hr |
| Settle Poll | [#366](https://github.com/bounswe/bounswe2023group3/issues/366) | BE/Batuhan Çetin | 27.11.2023 | [#406](https://github.com/bounswe/bounswe2023group3/pull/406) | 2.5hr | 2.5hr |
| Refactor codebase and fix all bugs on endpoints | [#367](https://github.com/bounswe/bounswe2023group3/issues/367) | BE/Batuhan Çetin | 27.11.2023 | [#382](https://github.com/bounswe/bounswe2023group3/pull/382), [#403](https://github.com/bounswe/bounswe2023group3/pull/403) | 2.5hr | 3hr |
| Get User by Username Endpoint | [#380](https://github.com/bounswe/bounswe2023group3/issues/380) | BE/Batuhan Çetin | 24.11.2023 | [#381](https://github.com/bounswe/bounswe2023group3/pull/381) | 0.5hr | 0.5hr |
| Update User Fields Endpoint | [#500](https://github.com/bounswe/bounswe2023group3/issues/500) | BE/Batuhan Çetin | 04.12.2023 | [#501](https://github.com/bounswe/bounswe2023group3/pull/501) | 1hr | 1hr |
| Duration of authentication tokens | [#508](https://github.com/bounswe/bounswe2023group3/issues/508) | BE/Batuhan Çetin | 04.12.2023 | [#510](https://github.com/bounswe/bounswe2023group3/pull/510) | 0.5hr | 0.5hr |
| Report and ban functionality | [#509](https://github.com/bounswe/bounswe2023group3/issues/509) | BE/Batuhan Çetin | 04.12.2023 | [#515](https://github.com/bounswe/bounswe2023group3/pull/515) | 2hr | 2hr |
| Poll Unit Tests | [#393](https://github.com/bounswe/bounswe2023group3/issues/393) | BE/Alp Tuna | 27.11.2023 | [#478](https://github.com/bounswe/bounswe2023group3/pull/478)  | 3hr | 3hr |
| User Unit Tests | [#394](https://github.com/bounswe/bounswe2023group3/issues/394) | BE/Alp Tuna | 27.11.2023 | [#480](https://github.com/bounswe/bounswe2023group3/pull/480)  | 1.5hr | 2hr |
| Moderator Unit Tests | [#395](https://github.com/bounswe/bounswe2023group3/issues/395) | BE/Alp Tuna | 27.11.2023 | [#481](https://github.com/bounswe/bounswe2023group3/pull/481)  | 1.5hr | 1.5hr |
| Extending Filtering of Poll | [#397](https://github.com/bounswe/bounswe2023group3/issues/397) | BE/Alp Tuna | 26.11.2023 | [#423](https://github.com/bounswe/bounswe2023group3/pull/423)  | 2hr | 1.5hr |
| Return only approved polls based on a query parameter | [#498](https://github.com/bounswe/bounswe2023group3/issues/498) | BE/Alp Tuna| 04.12.2023 | [#504](https://github.com/bounswe/bounswe2023group3/pull/504) | 2hr | 2hr |
| Add tag filtering to polls | [#499](https://github.com/bounswe/bounswe2023group3/issues/499) | BE/Alp Tuna | 04.12.2023 | [#511](https://github.com/bounswe/bounswe2023group3/pull/511) | 2hr | 2hr |
| Add sorting option to fetching polls | [#505](https://github.com/bounswe/bounswe2023group3/issues/505) | BE/Alp Tuna | 04.12.2023 | [#512](https://github.com/bounswe/bounswe2023group3/pull/512) | 2hr | 2hr |
| Create Request Page for Settling Polls | [#373](https://github.com/bounswe/bounswe2023group3/issues/373) | MT/Baturhan | 27.11.2023 | [#443](https://github.com/bounswe/bounswe2023group3/pull/443) | 3hr | 3hr |
| Moderator Login Page | [#372](https://github.com/bounswe/bounswe2023group3/issues/372) | MT/Baturhan | 27.11.2023 | [#433](https://github.com/bounswe/bounswe2023group3/pull/433) | 2hr | 2.5hr |
| Connecting Necessary Endpoints of the Profile Page | [#371](https://github.com/bounswe/bounswe2023group3/issues/371) | MT/Faruk | 27.11.2023 | [#427](https://github.com/bounswe/bounswe2023group3/pull/427) | 2hr | 2.5hr |
| Connecting Necessary Endpoints of the Moderator Home Screen | [#370](https://github.com/bounswe/bounswe2023group3/issues/370) | MT/Simar | 27.11.2023 | [#416](https://github.com/bounswe/bounswe2023group3/pull/416) | 2hr | 2.5hr |
| Connecting Necessary Endpoints of the Home Screen | [#369](https://github.com/bounswe/bounswe2023group3/issues/369) | MT/Berke | 27.11.2023 | [#437](https://github.com/bounswe/bounswe2023group3/pull/437) | 2hr | 2.5hr |


## Planned vs. Actual
- The frontend team opened an [issue](https://github.com/bounswe/bounswe2023group3/issues/489) for our plans after our milestone 2 review.

## Your plans for the next week
| Description | Issue | Assignee | Due | Estimated Duration |
| --- | --- | --- | --- | --- |
| Implement edit profile options | [#525](https://github.com/bounswe/bounswe2023group3/issues/525) | FE/Serra | 12.12.2023 | 1hr |
| Add change password to settings | [#526](https://github.com/bounswe/bounswe2023group3/issues/526) | FE/Serra | 12.12.2023 | 1hr |
| Implement report polls/users | [#527](https://github.com/bounswe/bounswe2023group3/issues/527) | FE/Serra | 12.12.2023 | 2hr |
| Overall Design Improvements after Milestone 2 | [#513](https://github.com/bounswe/bounswe2023group3/issues/513) | FE/Beyza | 12.12.2023 | 2hr |
| Implement apply for moderator page | [#537](https://github.com/bounswe/bounswe2023group3/issues/537) | FE/Beyza | 12.12.2023 | 1.5hr |
| Improve design for settled polls | [#538](https://github.com/bounswe/bounswe2023group3/issues/538) | FE/Beyza | 12.12.2023 | 2hr |
| Implement poll vote | [#535](https://github.com/bounswe/bounswe2023group3/issues/535) | FE/Berk | 12.12.2023 | 2h |
| Implementing highlight for poll filter buttons | [#517](https://github.com/bounswe/bounswe2023group3/issues/517) | FE/Berk | 12.12.2023 | 0.5hr |
| Implementing modify tags & moderator feedback for moderator | [#516](https://github.com/bounswe/bounswe2023group3/issues/516) | FE/Berk | 12.12.2023 | 3h |
| Semantic Search | [#520](https://github.com/bounswe/bounswe2023group3/issues/520) | BE/Batuhan Çetin | 12.12.2023 | 3hr |
| Change Password | [#518](https://github.com/bounswe/bounswe2023group3/issues/518) | BE/Batuhan Çetin | 10.12.2023 | 1hr |
| Annotation | [#531](https://github.com/bounswe/bounswe2023group3/issues/531) | BE/Alp Tuna | 12.12.2023 | 3hr |
| Adding isLikedByMe to fetch poll endpoints | [#533](https://github.com/bounswe/bounswe2023group3/issues/533) | BE/Alp Tuna | 12.12.2023 | 1hr |
| Vote Functionality | [#529](https://github.com/bounswe/bounswe2023group3/issues/529) | BE/Batuhan İlhan | 12.12.2023 | 2hr |
| Create Poll Request Moderator Feedback | [#530](https://github.com/bounswe/bounswe2023group3/issues/530) | BE/Batuhan İlhan | 12.12.2023 | 1hr |
| Settle Poll Request Moderator Feedback | [#532](https://github.com/bounswe/bounswe2023group3/issues/532) | BE/Batuhan İlhan | 12.12.2023 | 1hr |
| Enable user to make multiple comments on polls | [#534](https://github.com/bounswe/bounswe2023group3/issues/534) | BE/Batuhan İlhan | 12.12.2023 | 1hr |
| Create voting mechanism | [#521](https://github.com/bounswe/bounswe2023group3/issues/521) | MT/Baturhan | 12.12.2023 | 3hr |
| Moderator settle poll mechanism | [#519](https://github.com/bounswe/bounswe2023group3/issues/519) | MT/Simar | 12.12.2023 | 2.5hr |
| Fix comment bug | [#524](https://github.com/bounswe/bounswe2023group3/issues/524) | MT/Faruk | 12.12.2023 | 1hr |
| Add pending polls to profile page | [#528](https://github.com/bounswe/bounswe2023group3/issues/528) | MT/Faruk | 12.12.2023 | 1hr |
| Milestone 2 review fixes | [#523](https://github.com/bounswe/bounswe2023group3/issues/523) | MT/Berke | 12.12.2023 | 1.5hr |
| Like dislike mechanism | [#522](https://github.com/bounswe/bounswe2023group3/issues/522) | MT/Berke | 12.12.2023 | 1.5hr |
| Revise your your project plan | [#536](https://github.com/bounswe/bounswe2023group3/issues/536) | Everyone | 12.12.2023 | 3hr |

## Participants
- [Ali Üçer](https://github.com/bounswe/bounswe2023group3/wiki/About-Ali-%C3%9C%C3%A7er)
- [Alp Tuna](https://github.com/bounswe/bounswe2023group3/wiki/About-Alp-Tuna) (Communicator)
- [Batuhan Çetin](https://github.com/bounswe/bounswe2023group3/wiki/About-Batuhan-%C3%87etin)
- [Beyza Akçınar](https://github.com/bounswe/bounswe2023group3/wiki/About-Beyza-Ak%C3%A7%C4%B1nar)
- [Faruk Yıldırım](https://github.com/bounswe/bounswe2023group3/wiki/About-Faruk-Y%C4%B1ld%C4%B1r%C4%B1m)
- [Hatice Serra Hakyemez](https://github.com/bounswe/bounswe2023group3/wiki/About-Hatice-Serra-Hakyemez)
- [Muhammet Batuhan İlhan](https://github.com/bounswe/bounswe2023group3/wiki/About-Muhammet-Batuhan-%C4%B0lhan)
- [Simar Achmet Kechagia](https://github.com/bounswe/bounswe2023group3/wiki/About-Simar-Achmet-Kechagia)
- [Mustafa Berk Turgut](https://github.com/bounswe/bounswe2023group3/wiki/About-Berk-Turgut)
- [Berke Çalışkan](https://github.com/bounswe/bounswe2023group3/wiki/About-Berke-Çalışkan)
- [Taha Baturhan Akbulut](https://github.com/bounswe/bounswe2023group3/wiki/About-Taha-Baturhan-Akbulut)
