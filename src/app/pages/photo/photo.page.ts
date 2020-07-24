import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-photo",
  templateUrl: "./photo.page.html",
  styleUrls: ["./photo.page.scss"],
})
export class PhotoPage implements OnInit {
  @Input() image: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismissModal(status: boolean) {
    this.modalController.dismiss({
      status: status,
      image: this.image,
    });
  }
}
