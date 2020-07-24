import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { RenamepopupPage } from '../renamepopup/renamepopup.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private popup : PopoverController,
  ) {}

  //Rename Popup
 rename()
 {
   this.popup.create({component : RenamepopupPage ,showBackdrop: true}).then((popoverElement)=>{
     popoverElement.present();
   })

 }
}
