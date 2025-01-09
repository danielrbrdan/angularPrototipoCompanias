import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { notAuthenticatedGuard } from './auth/guards/notAutenticatedGuard';
import { authenticatedGuard } from './auth/guards/autenticatedGuard';
import { LogoutComponent } from './auth/logout/logout.component';
import { CompanyCreateComponent } from './pages/company/company-create/company-create.component';
import { CompanyUpdateComponent } from './pages/company/company-update/company-update.component';
import { CompanyComponent } from './pages/company/company.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [notAuthenticatedGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [authenticatedGuard],
  },
  {
    path: '',
    redirectTo: '/company',
    pathMatch: 'full',
  },
  {
    path: 'company',
    canActivate: [authenticatedGuard],
    children: [
      {
        path: '',
        component: CompanyComponent,
      },
      {
        path: 'create',
        component: CompanyCreateComponent,
      },
      {
        path: 'edit/:id',
        component: CompanyUpdateComponent,
      },
    ],
  },
];
