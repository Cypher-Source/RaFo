import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedCommentsPageRoutingModule } from './feed-comments-routing.module';

import { FeedCommentsPage } from './feed-comments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedCommentsPageRoutingModule
  ],
  declarations: [FeedCommentsPage]
})
export class FeedCommentsPageModule {}
