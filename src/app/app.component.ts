import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import * as firebase from 'firebase';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
  faBars
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
	
	//Get the fortawesome icons
	faUserCircle = faUserCircle;
	faSignInAlt = faSignInAlt;
	faSignOutAlt = faSignOutAlt;
	faBars = faBars;
	
	//init the variables used in the appcomponent
	secondes: number;
	counterSubscription: Subscription;
	
	isAuth: boolean;
	
	emailUser: string;
	nameUser: string;
	idUser: string;
	
	constructor(private authService: AuthService, private userService: UserService) {}
	
	//Function init when the component is loaded
	ngOnInit() {
		
		//Subscribe to a counter, display this in the footer on the app
		const counter = interval(1000);
		
		this.counterSubscription = counter.subscribe(
			(value) => {
				this.secondes = value;
			},
			(error) => {
				console.log('Uh-oh, an error occurred! : ' + error);
			},
			() => {
				console.log('Observable complete!');
			}
		);
		
		//When an user is identified, get his informations
		firebase.auth().onAuthStateChanged(
		  (user) => {
			
			if(user) {
				
				var userInfos = firebase.auth().currentUser;
				this.idUser = userInfos.uid;
				
				var arrayInfos = this.userService.getSingleUser(this.idUser).then(data =>
				{
					this.nameUser = data.username;
					this.emailUser = data.email;
				});
				
				this.isAuth = true;
				
			} else {
			  this.isAuth = false;
			}
		  }
		);
		
	}
	
	//Permit to the user to signout
	onSignOut() {
		this.authService.signOutUser();
	}
	
	//Unsubscibe the counterSubscription
	ngOnDestroy() {
		this.counterSubscription.unsubscribe();
	}
	
}
