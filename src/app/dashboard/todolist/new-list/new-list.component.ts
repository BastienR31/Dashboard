import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { List } from '../../../models/list.model';
import { ListService } from '../../../services/list.service';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})

export class NewListComponent implements OnInit {

	listForm: FormGroup;
	
	constructor(private formBuilder: FormBuilder, private listService: ListService, private router: Router) { }
	
	ngOnInit() {
		this.initForm();
	}
	
	initForm() {
		this.listForm = this.formBuilder.group({
		  name: ['', Validators.required],
		  date: ['', Validators.required]
		});
	}
	
	onSaveList() {
		const name = this.listForm.get('name').value;
		const date = this.listForm.get('date').value;
		
		var user = firebase.auth().currentUser;
		const idUser = user.uid;
		
		const newList = new List(name, date, idUser);
		
		this.listService.createNewList(newList);
		this.router.navigate(['/todolist']);
	}
	
	onBack() {
		this.router.navigate(['/todolist/all']);
	}
}
	