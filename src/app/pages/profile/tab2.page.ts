import { Component } from "@angular/core";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  profileNameEditStatus: boolean = false;

  profileName: string = "Navayuvan";

  constructor() {}

  // profile name edit
  editActionPerformed(): void {
    this.profileNameEditStatus = !this.profileNameEditStatus;
  }
}
