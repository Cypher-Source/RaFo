import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordChangePageRoutingModule } from './password-change-routing.module';

import { PasswordChangePage } from './password-change.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordChangePageRoutingModule
  ],
  declarations: [PasswordChangePage]
})
export class PasswordChangePageModule {}
