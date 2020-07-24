import { Component, OnInit } from "@angular/core";
import { ModalController, Platform } from "@ionic/angular";

@Component({
  selector: "app-post",
  templateUrl: "./post.page.html",
  styleUrls: ["./post.page.scss"],
})
export class PostPage implements OnInit {
  textAreaRows: number = 18;

  customAlertOptions: any = {
    cssClass: "my-alert",
    header: "Category",
    // translucent: true
  };
  constructor(private modalController: ModalController) {}
  ngOnInit() {}

  // dismiss the modal view
  closeModal() {
    this.modalController.dismiss();
  }
}
