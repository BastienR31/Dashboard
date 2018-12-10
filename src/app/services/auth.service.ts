import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

import * as firebase from 'firebase';

@Injectable()
export class AuthService {
	
	users: User[] = [];
	
	usersSubject = new Subject<User[]>();
	
	emitUsers() {
		this.usersSubject.next(this.users);
	}
	
	//Create new user with params passed in the form
	createNewUser(username:string, firstname: string, lastname: string, phonenumber: string, city: string, country: string, email: string, password: string) {
		return new Promise(
		  (resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(email, password).then(
			(user) => {
				var userProperties = firebase.auth().currentUser;
				
				firebase.database().ref("/users").child(userProperties.uid).set({username: username, firstname:firstname, lastname:lastname, phonenumber:phonenumber, city:city, country:country, email:email}).catch(function(error) { console.error(error); });
				
				resolve();
			  },
			  (error) => {
				reject(error);
			  }
			);
		  }
		);
	}
	
	//log the user
	signInUser(email: string, password: string) {
		return new Promise(
		  (resolve, reject) => {
			firebase.auth().signInWithEmailAndPassword(email, password).then(
			  () => {
				resolve();
			  },
			  (error) => {
				reject(error);
			  }
			);
		  }
		);
	}
	
	//signout the user
	signOutUser() {
		firebase.auth().signOut();
	}
}
