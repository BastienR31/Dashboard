import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListService } from '../../../services/list.service';
import { List } from '../../../models/list.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faHome,
  faTrash,
  faPlusCircle,
  faExpand,
  faUser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit, OnDestroy {
	
	faHome = faHome;
	faPlusCircle = faPlusCircle;
	faTrash = faTrash;
	faUser = faUser;
	faExpand = faExpand;
	
	lists: List[];
	listsSubscription: Subscription;
	
	title = 'todolist';
	
	constructor(private listService: ListService, private router: Router) {}
	
	ngOnInit() {
		
		this.listsSubscription = this.listService.listsSubject.subscribe(
			(lists: List[]) => {
				this.lists = lists;
			}
		);
		this.listService.emitLists();
	}
	
	onNewList() {
		this.router.navigate(['todolist', 'list', 'new']);
	}
	
	onDeleteList(list: List) {
		this.listService.removeList(list);
	}
	
	onViewList(id: number) {
		this.router.navigate(['todolist', 'list', 'view', id]);
	}
	
	ngOnDestroy() {
		this.listsSubscription.unsubscribe();
	}
	
}
	