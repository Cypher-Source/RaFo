import { Component } from "@angular/core";

import { Platform, AngularDelegate } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.angularFireAuth.authState.subscribe((user) => {
        if (user) {
          // if not login
          this.router.navigateByUrl("/");
        } else {
          this.router.navigateByUrl("/login");
        }
      });

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
