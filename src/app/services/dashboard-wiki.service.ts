import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

@Injectable()
export class DashboardWikiService {
	
	getMediaWikiInfos(){
		
		//https://en.wikipedia.org/w/index.php?title=Main%20Page&action=raw
		//https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json&formatversion=2
		
		return this.http.get('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&formatversion=2&titles=Main%20Page');
	}
	
	constructor(private http: HttpClient) {}
	
}
