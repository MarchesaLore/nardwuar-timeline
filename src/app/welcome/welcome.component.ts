// welcome.component.ts
import { Component, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Section {
  title: string;
  content: string;
  image: string;
  alt: string;
  animate?: boolean;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  sections: Section[] = [
      {
        title: 'Who is Nardwuar?',
        content: 'Nardwuar is a bizarre-looking Canadian journalist that has interviewed many musicians. His interviews always have some deep cuts, and he often gives gifts that surprise the interviewer.',
        image: '/assets/nardwuar.png',
        alt: 'image of nardwuar 1',
      },
      {
        title: 'Interview style',
        content: 'Noted for his excitable persona, a typical Nardwuar interview will begin with "Who are you?", followed by "From?" if the subject does not volunteer their affiliations.',
        image: '/assets/nardwuar1.png',
        alt: 'image of nardwuar 2',
      },
      {
        title: 'Origin of the name',
        content: 'When asked to explain his name, Nardwuar has said it is \"a dumb, stupid name like Sting or Sinbad\"; that \"Human\" came from the song "Human Fly" by the Cramps; and that \"Serviette\" came from the fact that "in the U.S.A. they don\'t have serviettes, they have napkins\".  ',
        image: '/assets/nardwuar2.png',
        alt: 'image of nardwuar 2',
      },
  ];

  constructor() {
    this.sections.forEach(section => (section.animate = false));
    this.sections[0].animate = true;
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    this.sections.forEach((section, index) => {
      section.animate = false;
      const element = document.getElementById(`section-${index}`);
      if (this.isElementInViewport(element)) {
        console.log(`section-${index} is in view`);
        section.animate = true;
      }
    });
  }

  private isElementInViewport(element: HTMLElement | null): boolean {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < window.innerHeight;
  }
}

//   sections: Section[] = [
//   {
//     title: 'Who is Nardwuar?',
//     content: 'Nardwuar is a bizarre-looking Canadian journalist that has interviewed many musicians. His interviews always have some deep cuts, and he often gives gifts that surprise the interviewer.',
//     image: '/assets/nardwuar.png',
//     alt: 'image of nardwuar 1',
//   },
//   {
//     title: 'Interview style',
//     content: 'Noted for his excitable persona, a typical Nardwuar interview will begin with "Who are you?", followed by "From?" if the subject does not volunteer their affiliations.',
//     image: '/assets/nardwuar1.png',
//     alt: 'image of nardwuar 2',
//   },
//   {
//     title: 'Origin of the name',
//     content: 'When asked to explain his name, Nardwuar has said it is \"a dumb, stupid name like Sting or Sinbad\"; that \"Human\" came from the song "Human Fly" by the Cramps; and that \"Serviette\" came from the fact that "in the U.S.A. they don\'t have serviettes, they have napkins\".  ',
//     image: '/assets/nardwuar2.png',
//     alt: 'image of nardwuar 2',
//   },
// ];

