import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource } from '@angular/material';

let user1 = new User("bruchon","bruchon", "bruchon", "bruchon", "bruchon", "bruchon", "bruchon");
let user2 = new User("bruchon", "bruchon", "bruchon", "bruchon", "bruchon","bruchon","bruchon");
	// {username: "bruchon", email: "bruchon", firstname: "bruchon", lastname: "bruchon", phonenumber: "bruchon", city: "bruchon", country: "bruchon"}
	
const ELEMENT_DATA: User[] = [user1, user2];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit, OnDestroy {
	
	userSubscription: Subscription;
	
	users: User[];
	
	constructor(private userService: UserService) { }
	
	dataSource = new MatTableDataSource<User>();
	
	displayedColumns: string[] = ['username', 'email', 'firstname', 'lastname', 'phonenumber', 'city', 'country'];
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	
	ngOnInit() {
		
		console.log('test');
		
		this.dataSource.paginator = this.paginator;
		
		/*this.userSubscription = this.userService.userSubject.subscribe(
			(users: User[]) => {
				this.users = users;
			}
		);*/
		
		this.userSubscription = this.userService.getUsers().subscribe(
			(users: User[])=>{
				
				console.log('element_data: ' + ELEMENT_DATA);
				
				this.users = users;
				console.log('users: ' + this.users);
				this.dataSource.data = ELEMENT_DATA;
				console.log('data: ' + users);
				console.log(this.dataSource);
			}
		);
		
		//this.dataSource.data = this.users;
		//console.log(this.dataSource);
		
		/*this.userService.getUsers().subscribe(
		  data => {
			this.dataSource.data = data;
		  }
		);*/
		
	}
	
	ngOnDestroy() {
		this.userSubscription.unsubscribe();
	}
}
