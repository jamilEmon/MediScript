import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { LayoutComponent } from './components/layout.component';
import { DashboardComponent } from './components/dashboard.component';
import { PrescriptionsComponent } from './components/prescriptions.component';
import { PrescriptionFormComponent } from './components/prescription-form.component';
import { ReportsComponent } from './components/reports.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'prescriptions',
        component: PrescriptionsComponent
      },
      {
        path: 'prescriptions/new',
        component: PrescriptionFormComponent
      },
      {
        path: 'prescriptions/edit/:id',
        component: PrescriptionFormComponent
      },
      {
        path: 'reports',
        component: ReportsComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
