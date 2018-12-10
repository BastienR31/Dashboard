import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
	
export class MyAccountComponent implements OnInit {
	
	userSubscription: Subscription;
	
	users: User[];
	
	constructor(private userService: UserService) { }
	
	idUser: string;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
	phonenumber: string;
	city: string;
	country: string;
	
	//
	ngOnInit() {
		
		firebase.auth().onAuthStateChanged(
		  (user) => {
			if(user) {
				
				var userInfos = firebase.auth().currentUser;
				this.idUser = userInfos.uid;
				
				this.userService.getSingleUser(this.idUser).then(data =>
				{
					this.username = data.username;
					this.email = data.email;
					this.firstname = data.firstname;
					this.lastname = data.lastname;
					this.phonenumber = data.phonenumber;
					this.city = data.city;
					this.country = data.country;
				});
			}
		});
	}
	
}
	