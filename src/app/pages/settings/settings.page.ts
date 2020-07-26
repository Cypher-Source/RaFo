import { Component, OnInit } from "@angular/core";
import { ModalController, PopoverController, Platform } from "@ionic/angular";
import { AuthUtilsService } from "src/app/services/AuthUtils/auth-utils.service";
import { ResponseViewService } from "src/app/services/ResponseViews/response-view.service";
import { PasswordChangePage } from "../password-change/password-change.page";
import { ThemeService } from "src/app/services/Theme/theme.service";
import { Storage } from "@ionic/storage";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  darkModeStatus: boolean;

  constructor(
    private modalController: ModalController,
    private authUtils: AuthUtilsService,
    private responseViews: ResponseViewService,
    private popoverController: PopoverController,
    private plt: Platform,
    private storage: Storage
  ) {}

  ngOnInit() {
    // this.plt.ready().then(() => {
    //   this.storage.get(this.theme.THEME_KEY).then((theme) => {
    //     this.darkModeStatus = theme;
    //   });
    // });
  }

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

  darkModeToggled(ev) {
    this.theme.setAppTheme(this.darkModeStatus);
  }
}
