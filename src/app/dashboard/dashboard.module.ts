import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthGuardService } from '../services/auth-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';

import { TodolistModule } from './todolist/todolist.module';
import { CityModule } from './city/city.module';
import { WikiModule } from './wiki/wiki.module';

const dashboardRoutes: Routes = [
	{path: 'dashboard', canActivate: [AuthGuardService], component: DashboardComponent}
];

@NgModule({
	imports: [
		CommonModule,
		CityModule,
		WikiModule,
		TodolistModule,
		RouterModule.forRoot(dashboardRoutes)
	],
	exports: [
		RouterModule,
		DashboardComponent
	],
  declarations: [DashboardComponent]
})

export class DashboardModule { }
