# CmpE 451: Project Development in Software Engineering - Milestone 2 Review
### Fall 2023 - Group 3 Prediction Polls

## Contributors
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

***

## Table of Contents

1. [Executive Summary](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#1-executive-summary)
- 1.1 [Introduction](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#11-introduction)
- 1.2 [Project Status](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#12-project-status)
- 1.3 [Customer Feedback and Reflections](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#13-customer-feedback-and-reflections)
- 1.4 [Changes and Future Plans](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#14-changes-and-future-plans)
2. [Status and Evaluation of Deliverables](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#2-status-and-evaluation-of-deliverables)
3. [Software Requirements Status](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#3-software-requirements-status)
4. [API Endpoints](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#4-api-endpoints)
5. [Testing](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#5-testing)
- 5.1 [Unit Test Reports](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#51-unit-test-reports)
- 5.2 [Testing Plan](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#52-testing-plan)
6. [Annotations](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#6-annotations)
7. [Individual Contribution Reports](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-Review#7-individual-contribution-reports)

## 1. Executive Summary
### 1.1. Introduction

Our project is about a platform where users open “polls” for the other users (and themselves) to make predictions about the properties of events that will be settled in the future. Predictions are evaluated for their accuracy once the property they guess is settled, which then counts towards the rating of its user. Events are to be tagged/categorized, and consequently, users’ scores will also be tagged/categorized. Users may or may not be able to control the public availability of the collective estimate of the properties before they are settled, which is one of the many design decisions the team should make. Profile badges, achievements, and other social features are some others to be considered alongside the scores to hook the users in.

### 1.2. Project Status
Backend:
- We implemented poll entity and necessary endpoints.
- We implemented option entity and necessary endpoints.
- We implemented user entity and necessary endpoints.
- We implemented moderator entity and necessary endpoints.
- We added ci/cd pipeline for deployment process.
- We implemented like entity and necessary endpoints.
- We implemented comment entity and necessary endpoints.
- We added authentication functionality and create auth middleware.
- We implemented badge entity and necessary endpoints.
- We implemented tag entity and necessary endpoints.
- We added unit tests.


Frontend:
- We implemented poll component and poll view page.
- We implemented other's profile view.
- We implemented detailed tag page.
- We reviewed our work according to milestone 1 feedback.
- We added prettier format to our code.
- We modified the CSS and HTML files to avoid redundancy. 
- We added moderator pending poll requests page and poll review page.
- We implemented poll lists view and added poll filters.
- We added a logo to our app.
- We added unit tests.
- We completed login, register, forget password, verify account implementations.
- We connected our app to the backend and provided the data connections.

Mobile:
- we have moderator login page. a moderator can authenticate himself.
- we have moderator approval page, in which moderator can approve or disaprove a poll creation request
- we have moderator home page. a moderator can see pending poll creation requests.
- we have profile page, a user can see his or some other's created/liked/voted polls
- we have home page, user's can see active/settled polls.
- we have comment (partially functioning) and like functionalities.
- we have search page (partially implemented)
- we have poll settle request page, in which a user can send a settle request consisting of a result (correct option) and a reference to confirm the result.

### 1.3 Customer Feedback and Reflections

### 1.4 Changes and Future Plans
Backend:
- We will implement voting functionality.
- We will implement ranking and leaderboard functionality.
- We will enhance the fetching poll endpoints so that frontend and mobile will make flexible filtering on the data.
- We will implement the feature of adding images to polls.


Frontend:
- Moderator data connections, actions and dependencies (approve and settle request) will be added.
- We will implement poll voting.
- We will add ranks, rating info and leaderboard to the frontend when they are implemented by our backend.

Mobile:
- implement vote functionality
- implement settle functionality for moderator
- link a user's profile to his username in the poll views. 
- add profile settings (add profile photo, privacy settings etc)
- add pending polls page under profile page
- notifications
- (optional) refine color scheme/layout
- (optional) add more flexibility and fluency for better UX

***

## 2. Status and Evaluation of Deliverables
- [Weekly Reports](https://github.com/bounswe/bounswe2023group3/wiki#lab-reports)

Weekly reports were useful for us to keep track of our progress.

- [Software Pre-Release]()
   - You can see our deployed frontend [here](http://13.49.224.117:8000/).
   - here is our [apk](https://github.com/bounswe/bounswe2023group3/releases/download/customer-milestone-2/app-release.apk). 

   
***

## 3. Software Requirements Status

<h1> Functional Requirements </h1>
<h2> User Requirements </h2>
<details open> 
<summary>1.1: Authentication </summary>
<ul>
  <li>1.1.1: <b>(Completed)</b> Authentication shall be available on the main page.</li>
  <li>1.1.2: <b>(Completed)</b> Users shall be able to authenticate with username and password they've provided upon registering.</li>
  <li>1.1.3: <b>(Completed)</b> Users must verify their e-mail after registration.</li>
  <li>1.1.4: <b>(In progress)</b> Users shall be treated as guests before authenticating.</li>
  <li>1.1.5: <b>(Completed)</b> Users shall be able to do user actions after authenticating.</li>
  <li>1.1.6: <b>(Completed)</b> Users shall stay authenticated for a certain time once they are authenticated. Users must be re-authenticated after this peroid ends.</li>
  <li>1.1.7: <b>(Completed)</b> User shall be able to reset password by clicking forgot password button.</li>
</ul>
</details>
<details open> 
<summary>1.2: <b>(In Progress)</b> Guest Actions </summary>
</details>
<details open> 
<summary>1.3: User Actions </summary>
<ul>
  <li>1.3.1: <b>(Not Started)</b> Users shall be able to vote in prediction polls.</li>
  <li>1.3.2: <b>(Completed)</b> Users should be able to comment on a prediction poll.</li>
  <li>1.3.3: <b>(Completed)</b> Users should be able to like a prediction poll.</li>
  <li>1.3.4: <b>(Not Started)</b> Users should be able to comment on a comment on a poll.</li>
  <li>1.3.5: <b>(Not Started)</b> Users should be able to like a comment on a poll.</li>
  <li>1.3.6: <b>(Not Started)</b> Users should be able to report a poll to the moderators if they find the content of the poll to be inappropriate or if they think there is an error with the reported event outcome.</li>
  <li>1.3.7: <b>(Completed)</b> Users shall be able to create a poll request or vote in polls either with their user attached or anonymously </li>
  <li>1.3.8: <b>(Not Started)</b> Users shall be able to insert images when creating a poll request.</li>
  <li>1.3.9: <b>(Not Started)</b> Users shall be able to create annotation for images and text body of the poll request.</li>
  <li>1.3.10: <b>(Completed)</b> Users should be able to follow other users.</li>
  <li>1.3.11: <b>(Completed)</b> Users shall be able to send prediction poll creation requests to moderator users. They shall provide a deadline for the prediction poll voting. They shall provide the prediction poll creation request with at least one tag.</li>
  <li>1.3.12: <b>(In Progress)</b> Users shall be able to send the outcome verification request of a poll they created to the moderators. This outcome verification request should consist of the outcome and the reference of the outcome so that a moderator can check and verify the result of the poll.</li>
  <li>1.3.13: <b>(Completed)</b> Users shall be able to logout from the system.</li>
  <li>1.3.14: <b>(Not Started)</b> Users shall be able to change their passwords.</li>
</ul>
</details>
<details open> 
<summary>1.4: Moderator Actions </summary>
<ul>
  <li>1.4.1: <b>(In Progress)</b> Moderators shall be able to inspect the prediction poll creation requests of the users.</li>
  <li>1.4.2: <b>(In Progress)</b> Moderators shall approve/disapprove the prediction poll creation requests of the users.</li>
  <li>1.4.3: <b>(In Progress)</b> Moderators shall be able to check and approve/disapprove the outcome result requests of the users.</li>
  <li>1.4.4: <b>(Not Started)</b> Moderators shall be able to modify the tags of a prediction poll creation request. </li>
  <li>1.4.5: <b>(Not Started)</b> Moderators shall provide their reasons for disapproval of a poll creation request to the user who has sent the request.</li>
  <li>1.4.6: <b>(Not Started)</b> Moderators should be able to ban users who misbehave/get reported.</li>
  <li>1.4.7: <b>(Completed)</b> Moderators shall be able to logout.</li>
</ul>
</details>
<h2> System Requirements </h2>
<details open> 
<summary>2.1: Rating </summary>
<ul>
  <li>2.1.1: <b>(Not Started)</b> The system shall calculate the weight of the event and add/subtract it to/from the rating of the user after the event's outcome is settled.</li>
</ul>
</details>
<details open> 
<summary>2.2: Categorization </summary>
<ul>
  <li>2.2.1: <b>(In Progress)</b> Every poll and rating of the users shall be categorized using tags.</li>
</ul>
</details>
<details open> 
<summary>2.3: User Roles </summary>
<ul>
  <li>2.3.1: <b>(Completed)</b> There shall be users with different roles in the system. There shall be moderators and regular users.</li>
</ul>
</details>
<details open> 
<summary>2.4: Collective Estimate Of The Result Of The Predictions Made </summary>
<ul>
  <li>2.4.1: <b>(Not Started)</b> There shall be an algorithm that calculates the contribution of the users to the collective estimate according to their rating.</li>
</ul>
</details>
<details open> 
<summary>2.5: Ranking System </summary>
<ul>
  <li>2.5.1: <b>(Not Started)</b> The platform shall include a ranking system based on general and tag specific ratings.</li>
</ul>
</details>
<details open> 
<summary>2.6: Trending Section </summary>
<ul>
  <li>2.6.1: <b>(Completed)</b> The platform should have a section called "trending" which includes the most popular polls in the platform.</li>
</ul>
</details>
<h1> Nonfunctional Requirements </h1>
<details open> 
<summary>3.1: Portability </summary>
<ul>
  <li>3.1.1: <b>(Completed)</b> People should be able to access the platform's webpage from commonly used browsers such as Chrome, Safari, Firefox, and Internet Explorer. UI, UX, and performance should not be affected much from browser to browser.</li>
  <li>3.1.2: <b>(Completed)</b> The mobile App should be supported on all Android versions later than Android 13 without any UI, UX or performance issues.</li>
</ul>
</details>
<details open> 
<summary>3.2: Privacy </summary>
<ul>
  <li>3.2.1: <b>(Completed)</b> The platform shall comply with the rules specified by KVKK and GDPR.</li>
  <li>3.2.2: <b>(Not Started)</b> Users shall agree to the Privacy Policy and Terms of Service before signing up.</li>
  <li>3.2.3: <b>(Not Started)</b> If the Privacy Policy changes, users must be notified about the changes.</li>
</ul>
</details>
<details open> 
<summary>3.3: Security </summary>
<ul>
  <li>3.3.1: <b>(In Progress)</b> The platform shall use HTTPS protocol.</li>
  <li>3.3.2: <b>(Not Started)</b> The platform shall have a SSL certificate.</li>
  <li>3.3.3: <b>(Completed)</b> All sensitive user data, such as passwords, shall be encrypted using a salted hashing algorithm(such as SHA-256).</li>
  <li>3.3.4: <b>(Completed)</b> The platform should be robust against Cross-Site Scripting and SQL Injection.</li>
  <li>3.3.5: <b>(Not Started)</b> Users shall be notified in the event of a password change.</li>
</ul>
</details>
<details open> 
<summary>3.4: Performance and Reliability </summary>
<ul>
  <li>3.4.1: <b>(Completed)</b> Load time of any page in the platform shall be maximum 6 seconds.</li>
  <li>3.4.2: <b>(In Progress)</b> Load time of any page in the platform shall be under 3 seconds on average.</li>
  <li>3.4.3: <b>(In Progress)</b> The platform shall be able to handle at least 10.000 users and 500 user actions simultaneously.</li>
  <li>3.4.4: <b>(In Progress)</b> The platform shall respond to any request in at most 3 seconds excluding network based delay.</li>
  <li>3.4.5: <b>(In Progress)</b> The platform's average time for responding requests shall be less than 2 seconds excluding network based delay.</li>
</ul>
</details>



***

## 4. API Endpoints
You can find all the documentation of our API in the following swagger link.
### [Swagger Link](http://34.105.66.254:1923/docs)


***

## 5. Testing

### 5.1 Unit Test Reports
####   5.1.1 Backend
We have written 12 different tests for our backend endpoints.
* It takes 7-8 seconds on average to complete tests.
* We get one error in the tests, and it is due to type mismatch between the result and the expected type of the returned value. We are planning to fix the issue until the final milestone.
* We covered relatively large set of use cases including poll, user and moderator actions and their endpoints.
<img width="389" alt="Screenshot 2023-11-30 at 11 02 36 PM" src="https://github.com/bounswe/bounswe2023group3/assets/56367500/07f193d9-5c75-4e87-8f2f-f3ac216a4c6c">

    
### 5.2 Testing Plan
#### 5.2.1 Backend
* We are planning to add more unit tests since we do not cover all modules at the moment.
* We are planning to merge these tests and simulate an example scenario where user takes multiple actions. (By utilizing several endpoints)
* We plan to resolve the existing bug in one of the 12 test cases.
* We plan to integrate unit tests in our development cycle more by not delaying tests to the end.

***

## 6. Annotations

We will add annotations to the user badges and the images so that the annotation will be visible when you hover over that item.

***

## 7. Individual Contribution Reports
- [Ali Üçer](https://github.com/bounswe/bounswe2023group3/wiki/CMPE451-Individual-Contribution-Report-2-Ali-%C3%9C%C3%A7er)
- [Alp Tuna](https://github.com/bounswe/bounswe2023group3/wiki/Alp-Tuna-CMPE451-Milestone2-Individual-Contribution-Report)
- [Batuhan Çetin](https://github.com/bounswe/bounswe2023group3/wiki/CMPE451-Individual-Contribution-Report-2-Batuhan-%C3%87etin)
- [Beyza Akçınar](https://github.com/bounswe/bounswe2023group3/wiki/CMPE451-Individual-Contribution-Report-2-Beyza-Ak%C3%A7%C4%B1nar)
- [Faruk Yıldırım](https://github.com/bounswe/bounswe2023group3/wiki/CMPE-451-Individual-Contribution-Report-2--Faruk-Y%C4%B1ld%C4%B1r%C4%B1m)
- [Hatice Serra Hakyemez](https://github.com/bounswe/bounswe2023group3/wiki/CMPE451-Individual-Contribution-Report-2-Hatice-Serra-Hakyemez)
- [Muhammet Batuhan İlhan](https://github.com/bounswe/bounswe2023group3/wiki/Individual-Contribution-Report-Batuhan-%C4%B0lhan)
- [Simar Achmet Kechagia](https://github.com/bounswe/bounswe2023group3/wiki/Customer-Milestone-2-%E2%80%90-Individual-Contribution-Report-%E2%80%90-Simar-Achmet-Kechagia)
- [Mustafa Berk Turgut](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-2-%E2%80%90-Individual-Contribution-Report-%7C-Mustafa-Berk-Turgut)
- [Berke Çalışkan](https://github.com/bounswe/bounswe2023group3/wiki/Individual-Contribution-Report-Berke-Çalışkan-M2)
- [Taha Baturhan Akbulut](https://github.com/bounswe/bounswe2023group3/wiki/Customer-Milestone-2-%E2%80%90-Individual-Contribution-Report-%E2%80%90-Taha-Baturhan-Akbulut)
