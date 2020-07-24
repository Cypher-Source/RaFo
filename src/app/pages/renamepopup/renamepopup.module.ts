import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RenamepopupPageRoutingModule } from './renamepopup-routing.module';

import { RenamepopupPage } from './renamepopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RenamepopupPageRoutingModule
  ],
  declarations: [RenamepopupPage]
})
export class RenamepopupPageModule {}
