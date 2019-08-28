import { Component, OnInit, OnDestroy } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';
import { GeocodeService } from 'src/app/services/geocode.service';
import { Subscription } from 'rxjs';
import {Forecast} from '../../services/forecast.model'
import {Geocode} from '../../services/geocode.model'
@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit, OnDestroy {

  subscription:Subscription;
  favList:Forecast[]=[];
  favCity:any;
  isFirst:boolean=true;

  cities: Geocode[] =[
    new Geocode("Wolsztyn, Wielkopolskie, Poland", 52.11667,16.11667),
    new Geocode("Poznań, Wielkopolskie, Poland",52.4,16.91667),
    new Geocode("Zielona Góra Airport (Babimost) IEG, Babimost, Lubuskie 66-110, Poland",52.137201,15.77839),
    new Geocode("Warszawa, Mazowieckie, Poland",52.21667,21.03333),
    new Geocode("Kraków, Małopolskie, Poland",50.06667,19.95)
  ];

  constructor(private forecast:ForecastService) { }

  ngOnInit() {
    if(localStorage.getItem('myWeather')){
      this.cities= JSON.parse(localStorage.getItem('myWeather'));
    }
    this.cities.forEach(e=>{
      this.forecast.getResults(e,false)
    });
    this.forecast.sideListchanged
    .subscribe((e:Forecast) =>{
      this.favList.unshift(e)
      if(this.isFirst){
        this.takeFirst()
        this.isFirst=false;
      }
      this.saveToLocal();
    });
    
    
  }

  saveToLocal(){
    this.cities=[]
    console.log(this.favList);
    this.favList.forEach(e =>{
      
      this.cities.push(e.geocode)
    })
    localStorage.setItem('myWeather',JSON.stringify(this.cities))
  }

  onDetail(fav:Forecast){
    this.forecast.checkFav(fav);
  }

  onDelete(index:number){
    this.favList.splice(index,1)
    this.saveToLocal()
  }

  takeFirst(){
    this.forecast.onStart(this.favList[0]);
    
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    console.log(this.favList);
  }

  onAddNew(){
    
  }
}
