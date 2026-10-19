import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import{ signal } from '@angular/core';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterLinkActive, ButtonComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }
}
