import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.css']
})
export class FaqSectionComponent {
  faqItems = [
    {
      question: 'What is a prediction poll?',
      answer:
        'Polls are the main element of our platform. A poll consists of a question whose answer is not known at the moment but is most likely to be known in the future.',
    },
    {
      question: 'How do I create a prediction poll?',
      answer:
        'Creating a prediction poll is easy. Just follow these steps: <br>' +
            '&bull; Login with your email and password <br>' +
            '&bull; Navigate to \'Create a New Poll Request\' page <br>' +
            '&bull; Enter the details of your poll, including the question, options, and at least one tag <br>' +
            '&bull; Send the request and wait until the request is accepted by one of our Moderators <br>' +
            '&bull; Now, you can see your newly created poll under your profile page, and start polling!',
  },
    {
      question: 'How are predictions evaluated?',
      answer:
        'Predictions are evaluated based on the accuracy of the outcome. Poll\'up uses a scoring system to calculate users\' prediction power scores, which are influenced by correct predictions and participation in polls.',
    },
    {
      question: 'What is the prediction power score?',
      answer: 'The prediction power score measures your accuracy in making predictions. It\'s calculated using an algorithm which is based on the accuracy and uniqueness of your choices.',
    },
    {
      question: 'What are tags in this application?',
      answer:
        'The tags are used to enhance the competitive experience in our platform. Poll\'up offers a wide range of categories for polls. You can explore and participate in polls related to sports, entertainment, current events, and more.',
    },
    {
      question: 'How do I connect with other users on Poll\'up?',
      answer:
        'You can connect with other users by sending or accepting friend requests. Once connected, you can view their polls and predictions, making the experience more interactive and social.',
    },
    {
      question: 'Who are moderator users?',
      answer:
        'Moderator users have the authority to review and moderate user-generated content, manage reports, and enforce platform rules. They play a crucial role in ensuring a smooth and respectful community experience.',
    },
    {
      question: 'What guidelines and rules do moderator users enforce on Poll\'up?',
      answer:
        'Moderator users enforce Poll\'up\'s community guidelines and rules, which include guidelines related to respectful communication, content appropriateness, and community behavior. These guidelines help maintain a positive and respectful atmosphere.',
    },
  ];

  activeStates: boolean[] = Array(this.faqItems.length).fill(false);

  toggleAnswer(index: number): void {
    this.activeStates[index] = !this.activeStates[index];
  }

  isActive(index: number): boolean {
    return this.activeStates[index];
  }
}
