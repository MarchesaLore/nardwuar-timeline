import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isSticky: boolean = false;
  isMenuVisible = false;
  constructor() {}

  showhideMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {     
    this.isSticky = (window.pageYOffset >= 50);
  }
}

