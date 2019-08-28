import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Forecast} from '../services/forecast.model'
import {Weather} from '../services/weather.model'
import { Geocode } from './geocode.model';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  adress:string='https://witoldszrama-eval-test.apigee.net/weatherapp/'
  observableAdress: Observable<any>;
  weatherListChanged= new EventEmitter<Forecast>()
  sideListchanged= new EventEmitter<Forecast>();
  sideList:Forecast[]=[];
  weatherList:Forecast;
  localLocations:{name:string,latitude:number,longitude:number}[]=[];
  isloading=new EventEmitter<boolean>();
  loading:boolean=false;

  constructor(private http: HttpClient) {
   }

  getResults(location:Geocode, isNew){
    this.loading=true;
    this.isloading.emit(this.loading);
    let fullAdress:string = this.adress+location.latitude + ','+location.longitude+'?lang=pl&units=si';
    this.observableAdress = this.http.get(fullAdress);
    
    this.observableAdress.subscribe(data =>{
      this.weatherList= new Forecast(
          location,
           new Weather(
            data.currently.temperature, 
            data.currently.summary, 
            data.currently.icon, 
            data.currently.precipProbability*100),
            new Weather(
              data.daily.data[0].apparentTemperatureHigh,
              data.hourly.summary,
              data.hourly.icon,
              data.hourly.data[0].precipProbability*100),
              new Weather(data.daily.data[0].apparentTemperatureHigh,
                data.daily.summary,
                data.hourly.icon,
                data.daily.data[0].precipProbability*100))
      },
      error => console.log("Error: ", error),()=>{
        this.loading=false;
        this.isloading.emit(this.loading);
        if(isNew){
          this.weatherListChanged.emit(this.weatherList);
        }else{
          this.sideListchanged.emit(this.weatherList);
        }
          
        })
         
      }

      checkFav(fav:Forecast){
        this.weatherList=fav;
        this.weatherListChanged.emit(this.weatherList);
      }

      addToFavourite(forecastDetails:Forecast){
        this.sideListchanged.emit(forecastDetails)
      }

      onStart(firstForecast: Forecast){
        this.weatherList=firstForecast;
        this.weatherListChanged.emit(this.weatherList);
      }
}
