import { Injectable } from "@angular/core";
import { ToastController, LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ResponseViewService {
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  // show toast message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }

  // show loading screen
  async getLoadingScreen() {
    const loading = await this.loadingController.create({
      cssClass: "loading-spinner",
      spinner: "lines",
      message: null,
      translucent: true,
    });
    return loading;
  }
}
