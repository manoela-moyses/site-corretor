import { Routes } from '@angular/router';

import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';

import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { PropertyFormComponent } from './pages/admin/property-form/property-form.component';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'sobre',
        component: AboutComponent
      },
      {
        path: 'contato',
        component: ContactComponent
      },
      {
        path: 'politica-de-privacidade',
        component: PrivacyPolicyComponent
      },
      {
        path: 'imoveis/:id',
        component: PropertyDetailsComponent
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'esqueci-minha-senha',
        component: ForgotPasswordComponent
      },
      {
        path: 'redefinir-senha',
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'painel',
        pathMatch: 'full'
      },
      {
        path: 'painel',
        component: DashboardComponent
      },
      {
        path: 'imovel/cadastrar',
        component: PropertyFormComponent
      },
      {
        path: 'imovel/editar/:id',
        component: PropertyFormComponent
      }
    ]
  }
];
