import { Component, OnDestroy, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { WeatherService } from '../../../services/weather.service';
import { City } from '../../../models/city.model';
import { Weather } from '../../../models/weather.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
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
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})

export class CitiesComponent implements OnInit, OnDestroy {
	
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
	
	showWeatherByCityName(name: string, country: string) {
	
	//this.weatherService.getWeatherByCityName(name, country).subscribe(data => console.log(data));
	
	}
	
	showWeathers() {
      //this.weatherService.getWeatherByCityName().subscribe(data => console.log(data));
	  
	  //data['city']
	  //data['list']
	  //data['list'][0]
	  //data['list'][...]
	  //data['list'][39]
	  
	}
  
  showWeathersList(){
	  this.weatherService.getWeathers().subscribe(data => console.log(data));
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
  
  ngOnDestroy() {
    this.citiesSubscription.unsubscribe();
  }
}
