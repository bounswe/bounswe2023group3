# Project Development Weekly Progress Report 3
**Team Name:** Group 3 - Prediction Poll  
**Date:** 17.10.2023

## Progress Summary
**This week**, frontend, backend and mobile teams have started getting familiar with the frameworks they decided to use. Furthermore, we revised our use case, sequence and class diagrams in accordance with the altered requirements. **Looking ahead to the next week**, each team will have completed some initial works in their respective part most of which is related to user login, authentication and basic design components.

## What was planned for the week? How did it go?
| Description | Issue | Assignee | Due | PR | Estimated Duration | Actual Duration |
| --- | --- | --- | --- | --- | --- | --- |
| Complete the project plan| [#119](https://github.com/bounswe/bounswe2023group3/issues/119) | Team | 12.10.2023 | [Project Roadmap](https://github.com/bounswe/bounswe2023group3/wiki/Project-Roadmap) | 2hr | 5hr |
| Complete the responsibility assignment matrix | [#118](https://github.com/bounswe/bounswe2023group3/issues/118) | Team | 12.10.2023 | [RAM](https://github.com/bounswe/bounswe2023group3/wiki/RAM-451) | 2hr | 1.5hr |
| Research and get familiar with Node.js  | [#129](https://github.com/bounswe/bounswe2023group3/issues/129) | Backend Team | 17.10.2023 | --- |10hr | 10hr |
| Research and get familiar with Flutter  | [#128](https://github.com/bounswe/bounswe2023group3/issues/128) | Mobile Team | 17.10.2023 | [Issue](https://github.com/bounswe/bounswe2023group3/issues/128#issuecomment-1766540925) | 10hr | 10hr |
| Research and get familiar with Angular  | [#130](https://github.com/bounswe/bounswe2023group3/issues/130) | Frontend Team | 17.10.2023 | [Issue](https://github.com/bounswe/bounswe2023group3/issues/130#issuecomment-1766427841) | 10hr | 10hr |
| Revision of the project design | [#131](https://github.com/bounswe/bounswe2023group3/issues/131), [#140](https://github.com/bounswe/bounswe2023group3/issues/140), [#137](https://github.com/bounswe/bounswe2023group3/issues/137), [#139](https://github.com/bounswe/bounswe2023group3/issues/139) | Team | 17.10.2023 | [Class Diagram](https://github.com/bounswe/bounswe2023group3/wiki/Class-Diagram), [Sequence Diagram](https://github.com/bounswe/bounswe2023group3/wiki/Sequence-Diagram), [Use Case Diagram](https://github.com/bounswe/bounswe2023group3/wiki/Use-Case-Diagram) | 3hr | 2hr |

## Planned vs. Actual
This week, almost everything went according to the plan and most tasks were in line with their estimated duration. We were behind on completing the revision of our UML diagrams, but eventually necessary parts were edited.

In the lab hour we were given the information that image annotation is mandatory. Therefore, we decided to and completed the following task 

| Description | Issue | Assignee | Due | PR | Estimated Duration | Actual Duration |
| --- | --- | --- | --- | --- | --- | --- |
| Add requirements related to image & annotation | [#141](https://github.com/bounswe/bounswe2023group3/issues/141) | Berk | 17.10.2023 | [Requirements](https://github.com/bounswe/bounswe2023group3/wiki/Software-Requirements-Speci%EF%AC%81cation) 1.3.7 to 1.3.9 | 0.5hr | 0.5hr |


## Implementation Strategies
- **Main branch protection:**  We will use pull requests to ensure main branch protection, a request will need another member's approval in order to be merged with the main branch.
- **Unit tests:** Before merging branches to the main branch, unit tests must be done. However, the new code can be pushed without testing to the development branch. If the unit tests are done, the member who did the unit tests should specify that unit tests have been completed in pull request. Unit tests will be prepared and applied by the person who implemented the new features.
- **Code styling:** The backend and the frontend teams decided to use the Prettier formatter. The mobile team decided to use the built-in command line tool of Dart for formatting (after the last argument of the widget, there will be comma even though not needed). 
- **Branching:** We will create a new branch for every issue. Name of the issue will be the prefix_of_the_team + "-" + issue_number. Prefixes are be, fe, and app for backend, frontend and mobile teams respectively. We may add some optional description to base_issue_name(defined notation above) in this format base_issue_name  +  "/" + description.

## Your plans for the next week
| Description | Issue | Assignee | Due | Estimated Duration |
| --- | --- | --- | --- | --- |
| Implement a welcome page | [#146](https://github.com/bounswe/bounswe2023group3/issues/146) | Frontend Team | 23.10.2023 | 2hr |
| Implement a login and sign-up page | [#148](https://github.com/bounswe/bounswe2023group3/issues/148) | Frontend Team | 23.10.2023 | 2hr |
| Implement some basic components | [#149](https://github.com/bounswe/bounswe2023group3/issues/149) | Frontend Team | 23.10.2023 | 2hr |
| Decide on a design palette | [#144](https://github.com/bounswe/bounswe2023group3/issues/144) | Frontend, Mobile Team | 23.10.2023 | 2hr |
| Draw ER diagram for the database | [#138](https://github.com/bounswe/bounswe2023group3/issues/138) | Backend Team | 23.10.2023 | 2hr |
| Decide on and create the database | [#145](https://github.com/bounswe/bounswe2023group3/issues/145) | Backend Team | 23.10.2023 | 2hr |
| Connect backend with the database | [#147](https://github.com/bounswe/bounswe2023group3/issues/147) | Backend Team | 23.10.2023 | 2hr |
| Designing and implementing a welcome page | [#142](https://github.com/bounswe/bounswe2023group3/issues/142) | Mobile Team | 23.10.2023 | 2hr |
| Implement a login and sign-up page | [#143](https://github.com/bounswe/bounswe2023group3/issues/143) | Mobile Team | 23.10.2023 | 2hr |

## Risks
- Some members might have a problem with the code base and its functions like push and pull. Also closing comments may not be good enough. So we will be getting used to and building some common agreements around this issue.
- Since each team will have independent builds in the beginning of our implementation, each part might not go hand-in-hand, but we will be in contact with other sub-teams to be aware of how everyone is doing. 

## Participants
- [Alp Tuna](https://github.com/bounswe/bounswe2023group3/wiki/About-Alp-Tuna) (Communicator)
- [Batuhan Çetin](https://github.com/bounswe/bounswe2023group3/wiki/About-Batuhan-%C3%87etin)
- [Beyza Akçınar](https://github.com/bounswe/bounswe2023group3/wiki/About-Beyza-Ak%C3%A7%C4%B1nar)
- [Faruk Yıldırım](https://github.com/bounswe/bounswe2023group3/wiki/About-Faruk-Y%C4%B1ld%C4%B1r%C4%B1m)
- [Hatice Serra Hakyemez](https://github.com/bounswe/bounswe2023group3/wiki/About-Hatice-Serra-Hakyemez)
- [Muhammet Batuhan İlhan](https://github.com/bounswe/bounswe2023group3/wiki/About-Muhammet-Batuhan-%C4%B0lhan)
- [Simar Achmet Kechagia](https://github.com/bounswe/bounswe2023group3/wiki/About-Simar-Achmet-Kechagia)
- [M. Berk Turgut](https://github.com/bounswe/bounswe2023group3/wiki/About-Berk-Turgut)
- [Taha Baturhan Akbulut]()
- [Berke Çalışkan](https://github.com/bounswe/bounswe2023group3/wiki/About-Berke-%C3%87al%C4%B1%C5%9Fkan)
