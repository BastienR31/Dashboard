import { Component, OnInit } from '@angular/core';
import { City } from '../../../models/city.model';
import { ActivatedRoute, Router } from '@angular/router';

import { CityService } from '../../../services/city.service';

@Component({
  selector: 'app-single-city',
  templateUrl: './single-city.component.html',
  styleUrls: ['./single-city.component.css']
})

export class SingleCityComponent implements OnInit {

  city: City;

  constructor(private route: ActivatedRoute, private cityService: CityService,
              private router: Router) {}

  ngOnInit() {
    this.city = new City('', '', '');
    const id = this.route.snapshot.params['id'];
    this.cityService.getSingleCity(+id).then(
      (city: City) => {
        this.city = city;
      }
    );
  }

  onBack() {
    this.router.navigate(['/dashboard']);
  }
}