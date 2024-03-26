import { Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { canActivateAuth } from './service/canActivateAuth';
import { WelcomeComponent } from './pages/welcome/welcome.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [canActivateAuth],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },

  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: LoginComponent },
    ],
  },
];
