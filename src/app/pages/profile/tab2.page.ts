import { Component } from '@angular/core';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  starcount : any = 1000;
  count : any;
  constructor(
  ) {
    this.numberFormat(this.starcount);
  }  

  //number with suffix 
  numberFormat(count){
    if(count >= 1000 && count <= 999000){
        this.count = (((count/1000).toFixed())) + 'k';
    }
    else{
        this.count = (((count/1000000).toFixed())) + 'M';
    }
    //console.log(count);
    }

}


