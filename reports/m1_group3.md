# CmpE 451: Project Development in Software Engineering - Milestone 1 Review
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

1. [Executive Summary](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-Review#1-executive-summary)
- 1.1 [Introduction](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-Review#11-introduction)
- 1.2 [Project Status](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-Review#12-project-status)
- 1.3 [Future Plans](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-Review#13-future-plans)
2. [Deliverables](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-Review#2-deliverables)
- 2.1 [Status and Evaluation of Deliverables](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-Review#21-status-and-evaluation-of-deliverables)
- 2.2 [Overall Reflection and Project Plan Review](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-Review#22-overall-reflection-and-project-plan)
3. [Evaluation of Tools and Processes](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-Review#3-evaluation-of-tools-and-processes)
4. [Software Requirements Status](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-Review#4-software-requirements-status)
5. [Individual Contribution Reports](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-Review#5-individual-contribution-reports)

## 1. Executive Summary
### 1.1. Introduction

Our project is about a platform where users open “polls” for the other users (and themselves) to make predictions about the properties of events that will be settled in the future. Predictions are evaluated for their accuracy once the property they guess is settled, which then counts towards the rating of its user. Events are to be tagged/categorized, and consequently, users’ scores will also be tagged/categorized. Users may or may not be able to control the public availability of the collective estimate of the properties before they are settled, which is one of the many design decisions the team should make. Profile badges, achievements, and other social features are some others to be considered alongside the scores to hook the users in.

### 1.2. Project Status
Backend:
- Initialization, boilerplates, utils and some tools implemented like Swagger, Helmet, Cors.
- Database connection is created.
- CRUD operations for user are created.
- Authentication endpoints are created like login, register, verify, forgot and reset password.
- Authorization for logged-in user and verified user is created with JWT Token.
- CRUD operations for Poll are created.
- Dockerized and deployed to AWS EC2 instance.

Frontend:
- Initialized, the project, created a READ.me.
- Decided on color palette.
- Implemented poll request, user profile, login, signup, forget password, welcome and home pages with relevant components.
- Connected login, signup and forget password pages with backend.
- Implemented page routing.
- Dockerized and Deployed the frontend application.

Mobile:
- Implemented welcome, login, e-mail verification for sign-up, sign-up page, forget password pages and connected them to endpoints.
- Implemented mock home page with "homePagePollViews" and sidebar to navigate to the other pages. Also standalone poll view page for viewing a single poll in detail. Besides, implemented the poll request creation page. Those are not connected to the endpoints yet.
- Actualized page routing.
- Applied the decided color palette on our app. 
- Built android apk.

### 1.3 Future Plans
Backend:
- Creating polls with specific options and tags will be implemented.
- Like and comment endpoints will be implemented.
- Moderator entity and endpoints will be implemented.
- Semantic search, rating and trending algorithms will be implemented.

Frontend:
- Alter static user data with the data to be retrieved from backend
- Implement a poll view
- Implement poll request view for admin users 

Mobile:
- Implement the home page final version, and also add bottom bar to the home page.
- Implement like and comment to our app.
- Implement the profile review page.
- Implement the notifications page.
- Implement the settings page.
- Implement the pages(poll request review, report review, poll settle review, home) for moderators.


***

## 2. Deliverables 

### 2.1 Status and Evaluation of Deliverables
- [Software Requirements Specification](https://github.com/bounswe/bounswe2023group3/wiki/Software-Requirements-Speci%EF%AC%81cation)

We've been reviewing our requirements from the start of the semester and our software requirements are almost complete. We made sure to include and edit all necessary requirements in time so that they won't be changed and affect our implementation later. The requirements are still open to small additions that won't interfere with our work so far. 
All members are familiar with the software requirements and we are building our project towards these spesifications.
- [UML Diagrams](https://github.com/bounswe/bounswe2023group3/wiki#-uml-diagrams)

We reviewed and edited our UML diagrams before starting the implementation. Class and Sequence diagrams are especially useful for our backend team for creating the database, entities and some functionalities of the app. The mobile and frontend teams frequently make use of the Use Case diagram.
- [Mockups](https://github.com/bounswe/bounswe2023group3/wiki/Mockups)

Our mockups served as a great example for us to imagine how the user interface would look like. We also used them to see which type of design and color palette would look good more presentable on our app.
- [Scenarios](https://github.com/bounswe/bounswe2023group3/wiki/Scenarios)

The scenarios are useful for us such that we manually test our application by relying on these example situations.
- [Project Plan](https://github.com/bounswe/bounswe2023group3/wiki/Project-Roadmap)

The project plan guides our project development. With this roadmap we can make adjustments on our ways so that we ensure to meet the deadlines and bring forth a well designed, well planned product.
- [Communication Plan](https://github.com/bounswe/bounswe2023group3/wiki/Communication-Plan)

This semester we are sticking with the communication plan we made last semester.
- [Responsibility Assignment Matrix](https://github.com/bounswe/bounswe2023group3/wiki/RAM-451)

The responsibility assignment matrix helps us create issues, and to let the members check their assigned responsibilities.
- [Weekly Reports](https://github.com/bounswe/bounswe2023group3/wiki#lab-reports)

So far we prepared four weekly reports. We meet weekly as a whole team to get on the same page on our implementation and to see how our project is going so far. These weekly reports helps us catch up with the roadmap, make important decisions as a group and to be aware of possible shortcomings and risks.
- [Meeting Notes](https://github.com/bounswe/bounswe2023group3/wiki/Meeting-Notes)

Most of our meeting notes are from the previous semester because we have been meeting weekly and preparing weekly reports this semester, but we have a couple of additional meeting notes from our sub team meetings.
- [Software Pre-Release]()

We dockerized and deployed the backend, mobile and frontend apps of our project. With this, other people can quickly review how our implementation is going so far. 

### 2.2 Overall Reflection and Project Plan Review
- We made some changes on UML diagrams after changes on requirements.
- We created RAM.
- We created weekly reports in every lab regularly.
We created project plan to apply throughout the semester:
- We mostly sticked to our project roadmap and made it to the milestone 1 deadline. Authentication and authorization were implemented on backend side. Necessary pages were implemented on both frontend and mobile. We encountered some problems before the deadline. We said we can create logger and exception layer implementations on backend but we decided to postpone these two. Also we encountered some problems on deployment of Angular frontend app but we solved the deployment problem.

***

## 3. Evaluation of Tools and Processes
### [Github](https://github.com/)
We used Github especially for acting as our common code base, for reviewing, correcting and approving each other's work, for creating issues related to our short and long term goals, and for displaying our software artifacts for people to see.

### [Discord](https://discord.com/)
We held some online meetings through here. We also communicated with our teacher, course assistants and other classmates from Discord. 

### [Whatsapp](https://www.whatsapp.com/)
We contacted each other through Whatsapp for informing the group members about urgent issues, group meeting location and times, and small updates. 

### [Canva](https://www.canva.com/)
We used Canva to help with our frontend and mobile app designs. We experimented with different color palettes and improved some visual aspects of our widgets by making use of Canva.

### [Instagantt](https://instagantt.com/)
Instagantt helped us create our project roadmap, determine the assignees and due dates of our tasks, and easily turn this set of tasks to a gantt chart.

### [Angular CLI](https://angular.io/cli)
The frontend team used Angular framework for building the web design. With Angular, we created common widgets, implemented user interfaces for different sections of our app, and constructed requests/services between frontend and backend.

### [Flutter](https://flutter.dev/)
Flutter was used to implement our mobile application. Flutter helped us with efficiency in our implementation and was useful to us because of its widgets and compatibility. 

### [NodeJS](https://nodejs.org/en)
We made use of NodeJS to create the backend of our app. NodeJS is commonly used in backend development, and performs well on the backend connection with the database.

### [NestJS](https://nestjs.com/)
We used NestJS as backend framework. NestJS is one of the most common backend frameworks of NodeJS after Express. It facilitates the development process and prevent developers from too much boilerplates.

### [PostgreSQL](https://www.postgresql.org/)
We decided to use PostgreSQL as database of the project. It is relational database unlike NoSQL databases like MongoDB. Main reason we decided on PostgreSQL is it is common, it has detailed documentation and open-source.

### [Swagger](https://swagger.io/)
Backend team utilized Swagger for reporting and sharing their database implementation with the rest of the group. Swagger was especially useful for satisfying the communication with the backend of our project.

### [Docker](https://hub.docker.com/)
We stored our build files, requirements and dockerized our application with Docker.

### [Amazon Web Services](https://aws.amazon.com/tr/)
We used AWS to create our remote host, deploy our app and to showcase it to others.

***

## 4. Software Requirements Status
We made some changes on requirements:
- 1.4.7 Moderators shall be able to logout requirement is added
- 2.7 Poll types requirement is deleted.
- 1.3.7: Users shall be able to create a poll request or vote in polls either with their user attached or anonymously requirement is added.
- 1.3.8: Users shall be able to insert images when creating a poll request requirement is added.
- 1.3.9: Users shall be able to create annotation for images and text body of the poll request requirement is added.
- 1.1.3: Users must verify their e-mail after registration requirement is added.
- 1.1.7: User shall be able to reset password by clicking forgot password button requirement is added.
- 1.3.12: Users shall be able to change their passwords requirement is added.

***

## 5. Individual Contribution Reports
- [Ali Üçer](https://github.com/bounswe/bounswe2023group3/wiki/About-Ali-%C3%9C%C3%A7er)
- [Alp Tuna](https://github.com/bounswe/bounswe2023group3/wiki/Alp-Tuna-CMPE451-Milestone1-Individual-Contribution-Report)
- [Batuhan Çetin](https://github.com/bounswe/bounswe2023group3/wiki/Individual-Contribution-Report-Batuhan-%C3%87etin)
- [Beyza Akçınar](https://github.com/bounswe/bounswe2023group3/wiki/CMPE451-Individual-Contribution-Report-1-Beyza-Ak%C3%A7%C4%B1nar)
- [Faruk Yıldırım](https://github.com/bounswe/bounswe2023group3/wiki/About-Faruk-Y%C4%B1ld%C4%B1r%C4%B1m)
- [Hatice Serra Hakyemez](https://github.com/bounswe/bounswe2023group3/wiki/CMPE451-Individual-Contribution-Report-1-Hatice-Serra-Hakyemez)
- [Muhammet Batuhan İlhan](https://github.com/bounswe/bounswe2023group3/wiki/Individual-Contribution-Report-Batuhan-%C4%B0lhan)
- [Simar Achmet Kechagia](https://github.com/bounswe/bounswe2023group3/wiki/Customer-Milestone-1-%E2%80%90-Individual-Contribution-Report-%E2%80%90-Simar-Achmet-Kechagia)
- [Mustafa Berk Turgut](https://github.com/bounswe/bounswe2023group3/wiki/Milestone-1-%E2%80%90-Individual-Contribution-Report-%7C-Mustafa-Berk-Turgut)
- [Berke Çalışkan](https://github.com/bounswe/bounswe2023group3/wiki/Individual-Contribution-Report-Berke-Çalışkan#code-related-significant-issues)
- [Taha Baturhan Akbulut](https://github.com/bounswe/bounswe2023group3/wiki/Customer-Milestone-1-%E2%80%90-Individual-Contribution-Report-%E2%80%90-Taha-Baturhan-Akbulut)
