import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SettingsComponent } from './settings/settings.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { FaqComponent } from './faq/faq.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { AdministrationComponent } from './administration/administration/administration.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { TodolistComponent } from './dashboard/todolist/todolist/todolist.component';

import { DashboardModule } from './dashboard/dashboard.module';

//main routes of the app
const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent },
  { path: 'todolist', canActivate: [AuthGuardService], component: TodolistComponent },
  { path: 'settings', canActivate: [AuthGuardService], component: SettingsComponent },
  { path: 'my-account', canActivate: [AuthGuardService], component: MyAccountComponent },
  { path: 'administration', canActivate: [AuthGuardService], component: AdministrationComponent },
  { path: 'faq', canActivate: [AuthGuardService], component: FaqComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes),
		DashboardModule
	],
	exports: [
		RouterModule
	]
})

export class AppRoutingModule { }
