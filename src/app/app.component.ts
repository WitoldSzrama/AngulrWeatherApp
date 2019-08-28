import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForecastService } from './services/forecast.service';
import { GeocodeService } from './services/geocode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'weatherApp';
  isloading:boolean=false;

  constructor(private forecast:ForecastService, private geocode:GeocodeService) { }

  ngOnInit(){
    this.forecast.isloading.subscribe(e =>{
      this.isloading=e;
    })
  }
}
