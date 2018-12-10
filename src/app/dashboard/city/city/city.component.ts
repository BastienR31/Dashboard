import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { WeatherService } from '../../../services/weather.service';
import { City } from '../../../models/city.model';
import { Weather } from '../../../models/weather.model';
import { Subscription } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { MatTableModule } from '@angular/material/table';

import {
  faUser,
  faSync,
  faBell,
  faTimes,
  faMagic,
  faAdjust,
  faCoffee,
  faCircle,
  faSquare,
  faTrashAlt,
  faTrash,
  faMinus,
  faExpand,
  faFighterJet,
  faBatteryQuarter
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})

export class CityComponent implements OnInit {
	
	faUser = faUser;
	faTrashAlt = faTrashAlt;
	faMinus = faMinus;
	faTrash = faTrash;
	faExpand = faExpand;
	
	cities: City[];
	weathers: Weather[];

	citiesSubscription: Subscription;
	weathersSubscription: Subscription;
	
	public values: any[];
	
	constructor(private cityService: CityService, private weatherService: WeatherService, private router: Router) {
		
		library.add(faUser, faMinus, faTrash, faTrashAlt, faExpand);
		
	}

	ngOnInit() {
		
		this.citiesSubscription = this.cityService.citiesSubject.subscribe(
			(cities: City[]) => {
				this.cities = cities;
				console.log(this.cities);
			}
		);
		
		this.cityService.emitCities();
		
		this.weathers = this.weatherService.getWeatherAndCityInfosByCityName();
	}
	
	onNewCity() {
		this.router.navigate(['/cities', 'new']);
	}

	onDeleteCity(city: City) {
		this.cityService.removeCity(city);
	}

	onViewCity(id: number) {
		this.router.navigate(['/city', id]);
	}
	
	onBack() {
		this.router.navigate(['/dashboard']);
	}
	
	
}
