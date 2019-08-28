import { Injectable, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, Subject } from 'rxjs';
import {Geocode} from './geocode.model'

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  isSearched = new EventEmitter<Geocode[]>();
  locations:Geocode[]=[];
  myKey:string = ".json?access_token=pk.eyJ1Ijoid2l0b2xkLXN6cmFtYSIsImEiOiJjanl5andieHQwaHNwM2JtbWZ6bGg0NmNrIn0.rNRWiLkGZoaBHA4BUjyVjQ"
  address:string = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
  observableAdress: Observable<any>;
  fullAdress:string='';
  newData: any;
  myWeather:Geocode[];
  isLoading:boolean=false
  getLocals:boolean=true;
  $LocalList= new EventEmitter<Geocode[]>();
  localList:Geocode[]=[];
  cities: Geocode[] =[
      new Geocode("Wolsztyn, Wielkopolskie, Poland", 52.11667,16.11667),
      new Geocode("Poznań, Wielkopolskie, Poland",52.4,16.91667),
      new Geocode("Zielona Góra Airport (Babimost) IEG, Babimost, Lubuskie 66-110, Poland",52.137201,15.77839),
      new Geocode("Warszawa, Mazowieckie, Poland",52.21667,21.03333),
      new Geocode("Kraków, Małopolskie, Poland",50.06667,19.95)
    ];
  constructor(private http: HttpClient) { }

  searchRes(val){
    this.isLoading=true
    this.locations=[];
    this.fullAdress = this.address + encodeURIComponent(val) + this.myKey;
    this.observableAdress =this.http.get(this.fullAdress);

    this.observableAdress.subscribe( data =>{
        data.features.forEach(e => {
        this.locations.push(new Geocode(e.place_name,e.center[1],e.center[0]))
      })


    },error => console.log("Error: ", error),()=>{
        this.isLoading=false;
        this.isSearched.emit(this.locations);
        console.log(this.locations[0]);
        

        }
    )

  };

}

