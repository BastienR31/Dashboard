import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

	signupForm: FormGroup;
	errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

	ngOnInit() {
		this.initForm();
	}

  initForm() {
    this.signupForm = this.formBuilder.group({
	  username: ['', [Validators.required]],
	  firstname: ['', [Validators.required]],
	  lastname: ['', [Validators.required]],
	  phonenumber: [''],
	  city: [''],
	  country: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
	
	const username = this.signupForm.get('username').value;
    const firstname = this.signupForm.get('firstname').value;
    const lastname = this.signupForm.get('lastname').value;
    const phonenumber = this.signupForm.get('phonenumber').value;
    const city = this.signupForm.get('city').value;
    const country = this.signupForm.get('country').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    
    this.authService.createNewUser(username, firstname, lastname, phonenumber, city, country, email, password).then(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
	
	
  }
}
