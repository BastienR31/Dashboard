import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';

import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

@Injectable()
export class TaskService {
	
	tasks: Task[] = [];
	tasksSubject = new Subject<Task[]>();
	
	emitTasks() {
		this.tasksSubject.next(this.tasks);
	}
	
	saveTasks() {
		firebase.database().ref('/tasks').set(this.tasks);
	}
	
	getTasks() {
		firebase.database().ref('/tasks')
			.on('value', (data: DataSnapshot) => {
				this.tasks = data.val() ? data.val() : [];
				this.emitTasks();
			}
		);
	}
	
	getTasksByListId(idList: number) {
		
		return new Promise(
			(resolve, reject) => {
				firebase.database().ref('/tasks/').once('value').then(
				(data: DataSnapshot) => {
					
					var arrayObject = [];
					
					data.forEach(function(childSnapshot) {
						
						var key = childSnapshot.key;
						
						// childData will be the actual contents of the child
						var childData = childSnapshot.val();
						childData['id'] = key;
						var childDataIdList = childData.idList;
						
						if(childDataIdList == idList) {
							arrayObject.push(childData);
							resolve(arrayObject);
						}
					});
					
				}, (error) => {
					reject(error);
				}
				);
			}
		);
	}
	
	getSingleTask(id: number) {
		return new Promise(
			(resolve, reject) => {
				firebase.database().ref('/tasks/' + id).once('value').then(
				(data: DataSnapshot) => {
					resolve(data.val());
				}, (error) => {
					reject(error);
				}
				);
			}
		);
	}
	
	createNewTask(newTask: Task) {
		this.tasks.push(newTask);
		this.saveTasks();
		this.emitTasks();
	}
	
	removeTask(task: Task) {
		
		const taskIndexToRemove = task.id;
		
		this.tasks.splice(taskIndexToRemove, 1);
		this.saveTasks();
		this.emitTasks();
	}
	
	constructor() {
		this.getTasks();
	}
	
}