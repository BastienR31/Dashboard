import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})

export class NewUserComponent implements OnInit {

	userForm: FormGroup;
	
	constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

	ngOnInit() {
		this.initForm();
	}
	
	initForm() {
		this.userForm = this.formBuilder.group({
		  username: ['', Validators.required],
		  firstname: ['', Validators.required],
		  lastname: ['', Validators.required],
		  phonenumber: [''],
		  city: [''],
		  country: [''],
		  email: ['', [Validators.required, Validators.email]]
		});
	}
	
	onSubmitForm() {
		const formValue = this.userForm.value;
		const newUser = new User(
		  formValue['username'],
		  formValue['firstname'],
		  formValue['lastname'],
		  formValue['phonenumber'],
		  formValue['city'],
		  formValue['country'],
		  formValue['email']
		);
		this.userService.addUser(newUser);
		this.router.navigate(['/administration']);
	}
	
}