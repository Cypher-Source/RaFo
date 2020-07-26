import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  darkModeStatus: boolean = false;
  THEME_KEY = "selected-app-theme";

  constructor(
    private plt: Platform,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.plt.ready().then(() => {
      this.storage.get(this.THEME_KEY).then((theme) => {
        this.setAppTheme(theme);
      });

      const prefsDark = window.matchMedia("(prefers-color-scheme: dark)");
      prefsDark.addListener((e) => {
        this.setAppTheme(e.matches);
      });
    });
  }

  setAppTheme(dark: boolean): void {
    this.darkModeStatus = dark;
    if (dark) {
      // App body
      document.body.classList.add("dark");

      // Status bar
      this.statusBar.styleBlackOpaque();
      this.statusBar.backgroundColorByHexString("#000000");
    } else {
      // App body
      document.body.classList.remove("dark");

      // Status bar
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#ffffff");
    }

    this.storage.set(this.THEME_KEY, dark);
  }
}
