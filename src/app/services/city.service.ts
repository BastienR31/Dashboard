import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { Weather } from '../models/weather.model';

import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

@Injectable()
export class CityService {
	
	cities: City[] = [];
	
	citiesSubject = new Subject<City[]>();
	
	emitCities() {
		this.citiesSubject.next(this.cities);
	}
	
	//save the city in the firebase db
	saveCities() {
		firebase.database().ref('/cities').set(this.cities);
	}
	
	//get all the cities saved in db
	getCities() {
    firebase.database().ref('/cities')
      .on('value', (data: DataSnapshot) => {
          this.cities = data.val() ? data.val() : [];
          this.emitCities();
        }
      );
	}
	
	//get one city with id parameter
	getSingleCity(id: number) {
		return new Promise(
		  (resolve, reject) => {
			firebase.database().ref('/cities/' + id).once('value').then(
			  (data: DataSnapshot) => {
				resolve(data.val());
			  }, (error) => {
				reject(error);
			  }
			);
		  }
		);
	}
	
	constructor(private http: HttpClient) {
		this.getCities();
	}
	
	createNewCity(newCity: City) {
		this.cities.push(newCity);
		this.saveCities();
		this.emitCities();
	}

	removeCity(city: City) {
	const cityIndexToRemove = this.cities.findIndex(
      (cityEl) => {
        if(cityEl === city) {
          return true;
        }
      }
    );
	this.cities.splice(cityIndexToRemove, 1);
	this.saveCities();
	this.emitCities();
  }
	
}