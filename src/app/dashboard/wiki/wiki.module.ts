import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../../services/auth-guard.service';

import { WikiComponent } from './wiki/wiki.component';

const wikiRoutes: Routes = [
	{
		path: 'wiki',
		canActivate: [AuthGuardService],
		component: WikiComponent
	}
];

@NgModule({
  imports: [
    CommonModule,
	RouterModule.forRoot(wikiRoutes)
  ],
	exports: [
		RouterModule,
		WikiComponent
	],
  declarations: [WikiComponent]
})

export class WikiModule { }
