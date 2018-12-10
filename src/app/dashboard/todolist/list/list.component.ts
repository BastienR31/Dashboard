import { Component, OnInit } from '@angular/core';
import { List } from '../../../models/list.model';
import { Task } from '../../../models/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../../../services/list.service';
import { TaskService } from '../../../services/task.service';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faHome,
  faTrash,
  faPlusCircle,
  faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
	
	faHome = faHome;
	faPlusCircle = faPlusCircle;
	faTrash = faTrash;
	faUser = faUser;
	
	list: List;
	task: Task;
	tasks: Task[];
	
	constructor(private route: ActivatedRoute, private listService: ListService, private taskService: TaskService, private router: Router) {}
	
	ngOnInit() {
		
		const id = this.route.snapshot.params['id'];
		
		this.list = new List('', '', id);
		
		this.listService.getSingleList(+id).then(
		  (list: List) => {
			this.list = list;
		  }
		);
		
		this.taskService.getTasksByListId(+id).then(
		  (tasks: Task[]) => {
			console.log(tasks);
			this.tasks = tasks;
		  }
		);
	}
	
	onNewTask() {
		
		const idList = this.route.snapshot.params['id'];
		
		this.router.navigate(['/task', 'new', {idList: idList}]);
	}
	
	onViewTask(task: Task) {
		
		const id = task.id;
		const idList = task.idList;
		
		this.router.navigate(['/task', id, {idList: idList}]);
	}
	
	onDeleteTask(task: Task) {
		this.taskService.removeTask(task);
	}
	
	onBack() {
		this.router.navigate(['/todolist/all']);
	}

}
