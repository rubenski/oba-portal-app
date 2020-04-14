import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/AuthGuard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/page/home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: './registration/registration.module#RegistrationModule',
    data: {showHeader: true, admin: false}
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    data: {showHeader: true, admin: false}
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'admin',
    loadChildren: './admin-home/admin-home.module#AdminHomeModule',
    data: {showHeader: true, admin: true},
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'account-settings',
    loadChildren: './account-settings/account-settings.module#AccountSettingsModule'
  },
  {
    path: 'site',
    loadChildren: './registration/registration.module#RegistrationModule',
    data: {showHeader: false, showSidebar: false}
  },
  {
    path: 'page/:uniqueUrlName',
    loadChildren: './page/page.module#PageModule',
    data: {showHeader: true, showSidebar: false}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {
}
