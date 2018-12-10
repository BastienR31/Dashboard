import { Component, OnInit } from '@angular/core';
import { DashboardWikiService } from '../../../services/dashboard-wiki.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})

export class WikiComponent implements OnInit {
	
	public values: any[];
	
	constructor(private dashboardWikiService: DashboardWikiService, private router: Router) { }
	
	ngOnInit() {
		this.dashboardWikiService.getMediaWikiInfos().subscribe((data: any[]) => this.values = data['query']['pages'][0]['revisions'][0]['content']);
	}
	
	showMediaWikiInfos(){
		this.dashboardWikiService.getMediaWikiInfos().subscribe(data => console.log(data['query']['pages'][0]['revisions'][0]['content']));
		//this.cityService.getMediaWikiInfos().subscribe(data => toto = {tata: data['query']['pages'][0]['revisions'][0]['content']});
	}
	
}
	