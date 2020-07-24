import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PostPage } from "../post/post.page";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  constructor(private modalController: ModalController) {}

  // open post modal
  async openPostModal() {
    const modal = await this.modalController.create({
      component: PostPage,
    });
    return await modal.present();
  }
}
