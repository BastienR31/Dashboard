import { Component, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import * as firebase from 'firebase';

import { library } from '@fortawesome/fontawesome-svg-core';

import {
  faHome,
  faUserEdit,
  faCogs,
  faClipboard,
  faUser,
  faWindowClose,
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
  faPlusSquare,
  faAddressCard,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
	
export class NavbarComponent {
	
	faSignInAlt = faSignInAlt;
	faCogs = faCogs;
	faSignOutAlt = faSignOutAlt;
	faWindowClose = faWindowClose;
	faUser = faUser;
	faUserCircle = faUserCircle;
	faHome = faHome;
	faClipboard = faClipboard;
	faPlusSquare = faPlusSquare;
	faPlusCircle = faPlusCircle;
	faAddressCard = faAddressCard;
	faUserEdit = faUserEdit;
	
	isAuth: boolean;
	
	constructor(private authService: AuthService) { }
	
	ngOnInit(){}
	
}
	