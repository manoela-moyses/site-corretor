import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ContactSuccessModalComponent } from '../../components/contact-success-modal/contact-success-modal.component';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [FormsModule, RouterLink, ContactSuccessModalComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss',
})
export class PrivacyPolicyComponent {
  private readonly http = inject(HttpClient);

  // ========================================
  // ABAS DE SOLICITAÇÕES
  // ========================================

  activeTab = 'access';

  privacyTabs = [
    {
      id: 'access',
      label: 'Acesso a dados',
      title: 'Pedido de acesso a dados',
      description:
        'Solicite a confirmação de tratamento e uma cópia dos dados pessoais relacionados a você. O atendimento poderá exigir a confirmação da sua identidade para proteger suas informações.',
    },
    {
      id: 'deletion',
      label: 'Exclusão de dados',
      title: 'Solicitação de exclusão de dados',
      description:
        'Solicite a exclusão de seus dados pessoais, observadas as obrigações legais de conservação. O atendimento poderá exigir a confirmação da sua identidade para proteger suas informações.',
    },
    {
      id: 'correction',
      label: 'Correção de dados',
      title: 'Solicitação de correção de dados',
      description:
        'Solicite a atualização ou correção de informações incompletas, inexatas ou desatualizadas. O atendimento poderá exigir a confirmação da sua identidade para proteger suas informações.',
    },
    {
      id: 'consent',
      label: 'Revogar consentimento',
      title: 'Revogação de consentimento',
      description:
        'Solicite a revogação de consentimento para os tratamentos que dependam dessa autorização. O atendimento poderá exigir a confirmação da sua identidade para proteger suas informações.',
    },
  ];

  get selectedTab() {
    return this.privacyTabs.find((tab) => tab.id === this.activeTab)!;
  }

  selectTab(id: string): void {
    if (this.isSubmitting) {
      return;
    }

    this.activeTab = id;
  }

  // ========================================
  // ENVIO DO FORMULÁRIO
  // ========================================

  isSubmitting = false;
  isModalOpen = false;

  onSubmit(form: NgForm, formElement: HTMLFormElement): void {
    if (form.invalid || this.isSubmitting) {
      return;
    }

    const formData = new FormData(formElement);

    this.isSubmitting = true;

    this.http
      .post<{
        success: boolean;
      }>('https://api.staticforms.dev/submit', formData)
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;

          if (response.success === true) {
            this.openModal();
          } else {
            console.error('O Static Forms não confirmou o envio.');
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Erro ao enviar solicitação de privacidade:', error);
        },
      });
  }

  // ========================================
  // MODAL DE CONFIRMAÇÃO
  // ========================================

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(form: NgForm): void {
    form.resetForm();
    this.isModalOpen = false;
  }
}
