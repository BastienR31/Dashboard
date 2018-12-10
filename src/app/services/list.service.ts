import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { List } from '../models/list.model';
import { Subject } from 'rxjs';

import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

@Injectable()
export class ListService {
	
	lists: List[] = [];
	listsSubject = new Subject<List[]>();
	
	emitLists() {
		this.listsSubject.next(this.lists);
	}
	
	saveLists() {
		firebase.database().ref('/lists').set(this.lists);
	}
	
	getLists() {
		firebase.database().ref('/lists')
			.on('value', (data: DataSnapshot) => {
				this.lists = data.val() ? data.val() : [];
				this.emitLists();
			}
		);
	}
	
	getSingleList(id: number) {
		return new Promise(
			(resolve, reject) => {
				firebase.database().ref('/lists/' + id).once('value').then(
				(data: DataSnapshot) => {
					resolve(data.val());
				}, (error) => {
					reject(error);
				}
				);
			}
		);
	}
	
	getListsByUserId() {
		
		var user = firebase.auth().currentUser;
		const idUser = user.uid;
		
		firebase.database().ref('/lists')
			.on('value', (data: DataSnapshot) => {
				var arrayObject = [];
				
				data.forEach(function(childSnapshot) {
					
					var key = childSnapshot.key;
					
					// childData will be the actual contents of the child
					var childData = childSnapshot.val();
					childData['id'] = key;
					var childDataIdUser = childData.idUser;
					
					if(childDataIdUser == idUser) {
						arrayObject.push(childData);
					}
				});
				this.lists = arrayObject ? arrayObject : [];
				this.emitLists();
			}
		);
	}
	
	createNewList(newList: List) {
		this.lists.push(newList);
		this.saveLists();
		this.emitLists();
	}
	
	removeList(list: List) {
		
		const listIndexToRemove = list.id;
		const listId = list.id;
		
		var ref = firebase.database().ref('/tasks');
		
		ref.orderByChild('idList').equalTo(listId)
		.once('value').then(function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
					//remove each child
					ref.child(childSnapshot.key).remove();
				});
		});
		
		this.lists.splice(listIndexToRemove, 1);
		this.saveLists();
		this.emitLists();
	}
	
	constructor() {
		this.getListsByUserId();
	}
	
}