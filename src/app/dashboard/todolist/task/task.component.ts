import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {
	
	task: Task;
	
	idList: number;
	name: string;
	description: string;
	date: string;
	status: string;
	
	constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) {}
	
	ngOnInit() {
		
		const id = this.route.snapshot.params['id'];
		
		this.task = new Task('', '', '', '', id);
		
		this.taskService.getSingleTask(+id).then(
		  (task: Task) => {
			this.task = task;
		  }
		);
	}
	
	updateTask() {
		
		console.log('function update in progress');
		
	}
	
	onBack() {
		
		const idList = this.route.snapshot.params['idList'];
		
		this.router.navigate(['/list', 'view', idList]);
	}
	
}
	