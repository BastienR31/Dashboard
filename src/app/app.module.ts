//Module used in the app
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here, keep this comment during the learning
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AdministrationModule } from './administration/administration.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UiModule } from './ui/ui.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material';

//Service used in the app
import { CityService } from './services/city.service';
import { ListService } from './services/list.service';
import { TaskService } from './services/task.service';
import { WeatherService } from './services/weather.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { DashboardWikiService } from './services/dashboard-wiki.service';

//Component used in the app
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SettingsComponent } from './settings/settings.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { FaqComponent } from './faq/faq.component';

//Personal directive used in the app
import { StatusTaskDirective } from './directives/status-task.directive';
import { UpdateTaskDirective } from './directives/update-task.directive';

//Import firebase in app module
import * as firebase from 'firebase';

//set config of firebase and initialize it
export const config = {
			apiKey: "AIzaSyBRXfAdBl3l3Qh8FQjjekvPgYKCx9ZKWMo",
			authDomain: "dashboard-5ae06.firebaseapp.com",
			databaseURL: "https://dashboard-5ae06.firebaseio.com",
			projectId: "dashboard-5ae06",
			storageBucket: "dashboard-5ae06.appspot.com",
			messagingSenderId: "1034928723028"
		};
firebase.initializeApp(config);

@NgModule({
  declarations: [
	AppComponent,
	SignupComponent,
	SigninComponent,
	SettingsComponent,
	MyAccountComponent,
	FaqComponent,
	PageNotFoundComponent,
	StatusTaskDirective,
	UpdateTaskDirective
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
	NoopAnimationsModule,
	FormsModule,
	MatButtonModule, 
	MatCheckboxModule,
	MatTableModule,
	MatPaginatorModule,
	AppRoutingModule,
	AdministrationModule,
	DashboardModule,
	UiModule,
	FontAwesomeModule,
	ReactiveFormsModule,
	HttpClientModule,
	MatSidenavModule,
	MatToolbarModule
  ],
  providers: [
	CityService,
	DashboardWikiService,
	WeatherService,
	AuthService,
	AuthGuardService,
	UserService,
	TaskService,
	ListService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
