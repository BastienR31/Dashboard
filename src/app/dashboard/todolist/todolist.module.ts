import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here, keep this comment during the learning
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthGuardService } from '../../services/auth-guard.service';

import { TodolistComponent } from './todolist/todolist.component';
import { ListComponent } from './list/list.component';
import { NewListComponent } from './new-list/new-list.component';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';

//routes of the module todolist
const todolistRoutes: Routes = [
	{
		path: 'todolist',
		canActivate: [AuthGuardService],
		children: [
			{ path: 'all', component: TodolistComponent },
			{ path: 'list/new', canActivate: [AuthGuardService], component: NewListComponent },
			{ path: 'list/view/:id', canActivate: [AuthGuardService], component: ListComponent },
			{ path: 'task/new', canActivate: [AuthGuardService], component: NewTaskComponent },
			{ path: 'task/:id', canActivate: [AuthGuardService], component: TaskComponent }
		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forChild(todolistRoutes)
	],
	exports: [
		RouterModule,
		TodolistComponent,
		ListComponent,
		NewListComponent,
		TaskComponent,
		NewTaskComponent
	],
  declarations: [TodolistComponent, ListComponent, NewListComponent, TaskComponent, NewTaskComponent]
})
export class TodolistModule { }
