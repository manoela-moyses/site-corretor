import { Component, output } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';

@Component({
  selector: 'app-contact-success-modal',
  imports: [ButtonComponent],
  templateUrl: './contact-success-modal.component.html',
  styleUrl: './contact-success-modal.component.scss',
})
export class ContactSuccessModalComponent {
  closed = output<void>();

  closeModal(): void {
    this.closed.emit();
  }
}
