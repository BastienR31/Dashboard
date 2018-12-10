import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import * as firebase from 'firebase';
import { UserService } from '../../services/user.service';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faHome,
  faCogs,
  faClipboard,
  faUser,
  faWindowClose,
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
  faPlusSquare,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	
	faSignInAlt = faSignInAlt;
	faCogs = faCogs;
	faSignOutAlt = faSignOutAlt;
	faWindowClose = faWindowClose;
	faUser = faUser;
	faUserCircle = faUserCircle;
	faHome = faHome;
	faClipboard = faClipboard;
	faPlusSquare = faPlusSquare;
	faPlusCircle = faPlusCircle;
	
	isAuth: boolean;
	
	emailUser: string;
	nameUser: string;
	idUser: string;
	arrayUser: any[] = [];
	
	constructor(private authService: AuthService, private userService: UserService) { }
	
	ngOnInit() {
		
		firebase.auth().onAuthStateChanged(
		  (user) => {
			
			if(user) {
				
				console.log(userInfos);
				
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
	
	onSignOut() {
		console.log("test");
		this.authService.signOutUser();
	}
	
}
