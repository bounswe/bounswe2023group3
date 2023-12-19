import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top-button',
  templateUrl: './scroll-to-top-button.component.html',
  styleUrls: ['./scroll-to-top-button.component.css']
})
export class ScrollToTopButtonComponent {
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 150; // Adjust the scroll position threshold
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
