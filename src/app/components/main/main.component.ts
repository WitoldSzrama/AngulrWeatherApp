import { Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import {Forecast} from '../../services/forecast.model'
import {SideComponent} from '../side/side.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  forecastDetails:Forecast;
  constructor(private forecast:ForecastService) { }

  ngOnInit() {
      this.forecast.weatherListChanged
      .subscribe((forecast:Forecast) =>{
        this.forecastDetails=forecast})
  }
  

  favouriteAdd(forecastDetails:Forecast){
    this.forecast.addToFavourite(forecastDetails);
  }
}
