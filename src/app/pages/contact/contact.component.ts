import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ContactSuccessModalComponent } from '../../components/contact-success-modal/contact-success-modal.component';
@Component({
  selector: 'app-contact',
  imports: [FormsModule, ContactSuccessModalComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly http = inject(HttpClient);

  isModalOpen = false;

  isSubmitting = false;

  onSubmit(form: NgForm, formElement: HTMLFormElement): void {
    if (form.invalid || this.isSubmitting) {
      return;
    }

    const formData = new FormData(formElement);

    this.isSubmitting = true;

    this.http.post('https://api.staticforms.dev/submit', formData).subscribe({
      next: (response: any) => {
        console.log('Resposta do Static Forms:', response);
        this.isSubmitting = false;

        if (response.success === true) {
          this.openModal();
        } else {
          console.error('O Static Forms não confirmou o envio.');
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Erro ao enviar mensagem:', error);
      },
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(form: NgForm): void {
    form.resetForm();
    this.isModalOpen = false;
  }
}
