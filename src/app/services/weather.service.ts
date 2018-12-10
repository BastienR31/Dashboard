import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { Weather } from '../models/weather.model';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { DataSnapshot } from 'firebase/database';

@Injectable()
export class WeatherService {
	
	weathers: Weather[] = [];
	weathersSubject = new Subject<Weather[]>();
	
	cities: City[] = [];
	citiesSubject = new Subject<City[]>();
	
	emitCities() {
		this.citiesSubject.next(this.cities);
	}
	
	emitWeathers() {
		this.weathersSubject.next(this.weathers);
	}
	
	//declare url to have weather infos
	configUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=6453974&APPID=5b4391765a894392fa99312afc3e4af4';
	url = 'http://api.openweathermap.org/data/2.5/weather?q=Castres,FR&appid=5b4391765a894392fa99312afc3e4af4';
	
	//Test function
	getWeathers() {
		
		//var url = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=Castres,FR&appid=5b4391765a894392fa99312afc3e4af4';
		
		var test = this.http.get(this.url);
		
		return test;
	}
	
	/*Function to get weather and city informations using city name
	  V2, new feature : using coordinates in the navigator to have weather and city informations
	*/
	getWeatherAndCityInfosByCityName() {
		
		var jsonCityWeatherArray = [];
		var httpProperty = this.http;
		
		//for each city in db, get weather infos and put theme in a jsonObject
		firebase.database().ref('/cities').on('value',
			function(data){
				data.forEach(function (childData) {
					
					var jsonObject = new Object();
					var arrayCityWeather = [];
					var jsonCityWeatherObject = {};
					
					var value = childData.val();
					
					jsonCityWeatherObject['name'] = value.name;
					jsonCityWeatherObject['country'] = value.country;
					jsonCityWeatherObject['timezone'] = value.timezone;
					
					var url = 'http://api.openweathermap.org/data/2.5/weather?q='+value.name+','+value.country+'&units=metric&appid=5b4391765a894392fa99312afc3e4af4';
					
					//Fetch api request to get data from api openweathermap
					fetch(url).then(function(response) {
						
						return response.json();
						
					}).then(function(data) {
						
						jsonCityWeatherObject['temperature'] = data['main']['temp'];
						jsonCityWeatherObject['temperatureMinimum'] = data['main']['temp_min'];
						jsonCityWeatherObject['temperatureMaximum'] = data['main']['temp_max'];
						jsonCityWeatherObject['weatherIcon'] = data['weather'][0]['icon'];
						
					});
					
					jsonCityWeatherArray.push(jsonCityWeatherObject);
					
				});
			}
		);
		
		return jsonCityWeatherArray;
		
	}
	
	/*
	constructor
	*/
	constructor(private http: HttpClient) {}
	
}
