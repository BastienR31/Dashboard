import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from '../../../models/city.model';
import { CityService } from '../../../services/city.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})

export class CityFormComponent implements OnInit {

  cityForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cityService: CityService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.cityForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required],
      timezone: ''
    });
  }
  
  onSaveCity() {
    const name = this.cityForm.get('name').value;
    const country = this.cityForm.get('country').value;
    const timezone = this.cityForm.get('timezone').value;

    const newCity = new City(name, country, timezone);

    this.cityService.createNewCity(newCity);
    this.router.navigate(['/dashboard']);
  }
}
