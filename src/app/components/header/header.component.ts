import { Component, OnInit, Input, Output } from '@angular/core';
import { GeocodeService } from 'src/app/services/geocode.service';
import { SelectorMatcher } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() isActive:boolean=false;
  @Input() isActiveChange;
  
  data:any;
  results:any;
  constructor(private geocode:GeocodeService) { }

  ngOnInit() {
    
  }

  lookFor(val){
    this.geocode.searchRes(val);
    this.isActive = !this.isActive;
  }

  change(){
    this.isActive=!this.isActive;
  }
}
