import { Component, OnInit } from "@angular/core";
import { ModalController, PopoverController } from "@ionic/angular";
import { AuthUtilsService } from "src/app/services/AuthUtils/auth-utils.service";
import { ResponseViewService } from "src/app/services/ResponseViews/response-view.service";
import { PasswordChangePage } from "../password-change/password-change.page";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private authUtils: AuthUtilsService,
    private responseViews: ResponseViewService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  // dismiss the modal
  closeModal() {
    this.modalController.dismiss();
  }

  // logout the user
  async logoutUser() {
    const loading = this.responseViews.getLoadingScreen();
    (await loading).present();

    try {
      await this.authUtils.logoutUser();
      this.responseViews.presentToast("User logged out!");
      (await loading).dismiss();
      this.modalController.dismiss();
    } catch (error) {
      this.responseViews.presentToast(error.message);
      (await loading).dismiss();
      this.modalController.dismiss();
    }
  }

  // open password change popover
  async presentPasswordChange(ev: any) {
    const popover = await this.popoverController.create({
      component: PasswordChangePage,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
