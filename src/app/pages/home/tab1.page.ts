import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SettingsPage } from "../settings/settings.page";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  starcount: any = 1000;
  count: any;
  constructor(private modalController: ModalController) {
    this.numberFormat(this.starcount);
  }

  numberFormat(count) {
    if (count >= 1000 && count <= 999000) {
      this.count = (count / 1000).toFixed() + "k";
    } else {
      this.count = (count / 1000000).toFixed() + "M";
    }
    console.log(count);
  }

  // open settings modal
  async openSettingModal() {
    const modal = await this.modalController.create({
      component: SettingsPage,
    });

    await modal.present();
  }
}
