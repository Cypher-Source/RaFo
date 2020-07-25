import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { Router } from "@angular/router";
import { AuthUtilsService } from "src/app/services/AuthUtils/auth-utils.service";
import { ResponseViewService } from "src/app/services/ResponseViews/response-view.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  public errorMessages = {
    email: [
      { type: "required", message: "Email is required" },
      { type: "pattern", message: "Please enter a valid email address" },
    ],
    password: [{ type: "required", message: "Password is required" }],
  };

  loginForm = this.formBuilder.group({
    email: [
      "",
      [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ],
    ],
    password: ["", Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authUtils: AuthUtilsService,
    private responseViews: ResponseViewService
  ) {}

  ngOnInit() {}

  // login the user
  async submit() {
    const loading = this.responseViews.getLoadingScreen();
    (await loading).present();

    try {
      const result = await this.authUtils.loginUser(
        this.loginForm.value.email,
        this.loginForm.value.password
      );

      if (result.status) {
        (await loading).dismiss();
      } else {
        (await loading).dismiss();
        this.responseViews.presentToast(result.message);
      }
    } catch (error) {
      (await loading).dismiss();
      this.responseViews.presentToast(error.message);
    }
  }

  // nav to signup page
  signup() {
    this.router.navigate(["signup"]);
  }
}
