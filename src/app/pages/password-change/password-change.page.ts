import { Component, OnInit } from "@angular/core";
import { ChangePassword } from "src/app/schemas/users.schema";
import { PopoverController } from "@ionic/angular";
import { ResponseViewService } from "src/app/services/ResponseViews/response-view.service";
import { AuthUtilsService } from "src/app/services/AuthUtils/auth-utils.service";

@Component({
  selector: "app-password-change",
  templateUrl: "./password-change.page.html",
  styleUrls: ["./password-change.page.scss"],
})
export class PasswordChangePage implements OnInit {
  // password collection object
  passwords: ChangePassword;

  constructor(
    private popoverController: PopoverController,
    private responseViews: ResponseViewService,
    private authUtils: AuthUtilsService
  ) {}

  ngOnInit() {
    this.passwords = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  // dismiss the popover
  dismissPopover() {
    this.popoverController.dismiss();
  }

  // change the password
  async changePassword() {
    const loading = this.responseViews.getLoadingScreen();
    (await loading).present();
    if (this.passwords.newPassword === this.passwords.confirmPassword) {
      try {
        await this.authUtils.changePassword(this.passwords);
        (await loading).dismiss();
        this.responseViews.presentToast("Password changed!");
        this.popoverController.dismiss();
      } catch (error) {
        (await loading).dismiss();
        this.responseViews.presentToast(error.message);
      }
    } else {
      this.responseViews.presentToast(
        "Password and Confirm password should be same!"
      );
      (await loading).dismiss();
    }
  }
  
}
