import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

@Injectable()
export class UserService {
	
	users: User[] = [];
	
	userSubject = new Subject<User[]>();
	
	emitUsers() {
		this.userSubject.next(this.users);
	}
	
	addUser(user: User) {
		this.users.push(user);
		this.emitUsers();
	}
	
	constructor(private http: HttpClient) {
		this.getUsers();
	}
	
	//get users from db
	getUsers():Observable<User[]>{
			
		var userInfosArray = [];
		
		firebase.database().ref('/users').on('value',
			function(data){
				data.forEach(function (childData) {
					
					var userInfosObject = {};
					
					var value = childData.val();
					
					var newUser = new User(value.username, value.email, value.firstname, value.lastname, value.phonenumber, value.city, value.country);
					
					userInfosArray.push(newUser);
				});
			}
		);
		return of(userInfosArray);
	}
	
	//get single user used to be conected
	getSingleUser(userId) {
		
		return firebase.database().ref('/users').child(userId).once('value').then(
			function(data){
				return data.val();
			}
		);
		
		/*return new Promise(
		  (resolve, reject) => {
			firebase.database().ref('/users/' + userId).once('value').then(
			  (data: DataSnapshot) => {
				resolve(data.val());
			  }, (error) => {
				reject(error);
			  }
			  
			);
		  }
		);*/
	}
	
}
