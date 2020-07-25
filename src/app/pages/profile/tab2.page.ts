import { Component, OnInit } from "@angular/core";
import { ResponseViewService } from "src/app/services/ResponseViews/response-view.service";
import { AuthUtilsService } from "src/app/services/AuthUtils/auth-utils.service";
import { UserDetails } from "src/app/schemas/users.schema";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  profileNameEditStatus: boolean = false;

  userDetails: UserDetails = {
    name: "",
    category: [""],
    emailId: "",
    userId: "",
    profilePic: "",
  };

  
  categoryLength: number;

  constructor(
    private responseView: ResponseViewService,
    private authUtils: AuthUtilsService
  ) {}

  ngOnInit() {
    // update category count
    this.updateCategoryCount();
  }

  // update category count
  async updateCategoryCount() {
    const loading = this.responseView.getLoadingScreen();
    try {
      (await loading).present();
      const currentUser = await this.authUtils.getCurrentUser();
      if (currentUser.status) {
        this.userDetails = await this.authUtils.getUserDetails(currentUser.uid);
        this.categoryLength = this.userDetails.category.length;
        (await loading).dismiss();
      } else {
        (await loading).dismiss();
      }
    } catch (e) {
      (await loading).dismiss();
    }
  }

  // profile name edit
  async editActionPerformed() {
    this.profileNameEditStatus = !this.profileNameEditStatus;
    const loading = this.responseView.getLoadingScreen();
    if (!this.profileNameEditStatus) {
      (await loading).present();
      try {
        const result = await this.authUtils.setUserName(this.userDetails.name);
        if (result.status) {
          (await loading).dismiss();
          this.responseView.presentToast("Profile name updated!");
        } else {
          (await loading).dismiss();
          this.responseView.presentToast("User not logged in");
        }
      } catch (error) {
        (await loading).dismiss();
        this.responseView.presentToast(
          "Some error has occured! Check your internet connection"
        );
      }
    }
  }
}
