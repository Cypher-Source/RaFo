import { Component } from '@angular/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  constructor(
  ) {}  

  //  public count(x: number) {
  //    x= 30;
  //   if(isNaN(x)) return null;
  
  //   if(x < 9999) {
  //     return x;
  //   }
  
  //   if(x < 1000000) {
  //     return Math.round(x/1000) + "K";
  //   }
  //   if( x < 10000000) {
  //     return (x/1000000).toFixed(2) + "M";
  //   }
  
  //   if(x < 1000000000) {
  //     return Math.round((x/1000000)) + "M";
  //   }
  
  //   if(x < 1000000000000) {
  //     return Math.round((x/1000000000)) + "B";
  //   }
  
  //   return "1T+";
  // }
 
}
