import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../../models/task.model';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})

export class NewTaskComponent implements OnInit {
	
	taskForm: FormGroup;
	
	constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private taskService: TaskService, private router: Router) { }
	
	ngOnInit() {
		this.initForm();
	}
	
	initForm() {
		this.taskForm = this.formBuilder.group({
		  name: ['', Validators.required],
		  date: ['', Validators.required],
		  description: ['']
		});
	}
	
	onSaveTask() {
		
		const idList = this.route.snapshot.params['idList'];
		
		const name = this.taskForm.get('name').value;
		const date = this.taskForm.get('date').value;
		const description = this.taskForm.get('description').value;
		
		const newTask = new Task(name, date, description, 'new', idList);
		
		this.taskService.createNewTask(newTask);
		this.router.navigate(['/list', 'view', idList]);
	}
	
	onBack() {
		
		const idList = this.route.snapshot.params['idList'];
		
		this.router.navigate(['/list', 'view', idList]);
	}
	
}
	