import { Component } from '@angular/core'

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css'],
})
export class PollComponent {
  selectedButton: HTMLButtonElement | null = null

  ngOnInit() {
    // Retrieve the selected button's state from localStorage on component initialization
    const selectedButtonId = localStorage.getItem('selectedButtonId')
    if (selectedButtonId) {
      this.selectedButton = document.getElementById(
        selectedButtonId,
      ) as HTMLButtonElement
      if (this.selectedButton) {
        this.selectedButton.classList.add('clicked')
      }
    }
  }

  toggleButton(button: HTMLButtonElement) {
    if (this.selectedButton === button) {
      // If the same button is clicked again, unselect it
      this.selectedButton.classList.remove('clicked')
      this.selectedButton = null
      localStorage.removeItem('selectedButtonId')
    } else {
      // Unselect the previously selected button (if any)
      if (this.selectedButton) {
        this.selectedButton.classList.remove('clicked')
      }

      // Select the clicked button
      button.classList.add('clicked')
      this.selectedButton = button

      // Save the selected button's state in localStorage
      localStorage.setItem('selectedButtonId', button.id)
    }
  }
}
