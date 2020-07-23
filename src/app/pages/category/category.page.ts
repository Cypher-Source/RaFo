import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { FeedCommentsPage } from '../../modals/feed-comments/feed-comments.page';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor( private modalController: ModalController) { }

  ngOnInit() {
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: FeedCommentsPage
    });
    return await modal.present();
  }

}
