import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/page/home',
    pathMatch: 'full'
  },
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
  {path: 'users', loadChildren: './users/users.module#UsersModule'},
  {path: 'account-settings', loadChildren: './account-settings/account-settings.module#AccountSettingsModule'},
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    data: {showHeader: false, showSidebar: false}
  },
  {
    path: 'register',
    loadChildren: './registration/registration.module#RegistrationModule',
    data: {showHeader: false, showSidebar: false}
  },
  {
    path: 'customers',
    loadChildren: './customers/customers.module#CustomersModule',
    data: {showHeader: true, showSidebar: true}
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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
