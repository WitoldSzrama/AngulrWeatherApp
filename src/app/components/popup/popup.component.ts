import { Component, OnInit, Input, Output,EventEmitter, OnDestroy } from '@angular/core';
import { GeocodeService } from 'src/app/services/geocode.service';
import { Subscription } from 'rxjs';
import { ForecastService } from 'src/app/services/forecast.service';
import {Geocode} from '../../services/geocode.model'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {
  @Input() isActive:boolean=false;
  @Output() isActiveChange: EventEmitter<boolean>= new EventEmitter<boolean>();
  @Input() results:Geocode[]=[];
  subscription:Subscription;
  
  constructor(private geocode: GeocodeService, private forecast:ForecastService) { }

  ngOnInit() {
    this.subscription = this.geocode.isSearched
    .subscribe((search:Geocode[]) => this.results=search)
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  searchResult(result){
    console.log(result);
    
    this.forecast.getResults(result, true)
    this.isActiveChange.emit(true)
    
  }

  onClick(){
    this.isActive=!this.isActive
    this.isActiveChange.emit(true)
    
  }
}
