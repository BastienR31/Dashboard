import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here, keep this comment during the learning
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthGuardService } from '../services/auth-guard.service';

import { AdministrationComponent } from './administration/administration.component';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';

const administrationRoutes: Routes = [
	{
		path: 'administration',
		canActivate: [AuthGuardService],
		component: AdministrationComponent,
		children: [
			{ path: 'users', component: UsersComponent },
			{ path: 'edit/:id', component: NewUserComponent }
		]
	}
];

@NgModule({
  imports: [
	CommonModule,
	MatTableModule,
	FormsModule,
	ReactiveFormsModule,
	FontAwesomeModule,
	RouterModule.forChild(administrationRoutes)
  ],
	exports: [
		RouterModule
	],
  declarations: [AdministrationComponent, UsersComponent, NewUserComponent]
})

export class AdministrationModule { }
