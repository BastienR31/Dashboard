import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here, keep this comment during the learning
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthGuardService } from '../../services/auth-guard.service';

import { CitiesComponent } from './cities/cities.component';
import { CityFormComponent } from './city-form/city-form.component';
import { SingleCityComponent } from './single-city/single-city.component';
import { CityComponent } from './city/city.component';

const citiesRoutes: Routes = [
	{
		path: 'city',
		canActivate: [AuthGuardService],
		children: [
			{ path: 'all', component: CityComponent },
			{ path: 'edit/:id', component: CityFormComponent },
			{ path: ':id', component: SingleCityComponent }
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(citiesRoutes)
	],
	exports: [
		RouterModule,
		CitiesComponent,
		CityComponent,
		CityFormComponent,
		SingleCityComponent
	],
  declarations: [CitiesComponent, CityFormComponent, SingleCityComponent, CityComponent]
})

export class CityModule { }
