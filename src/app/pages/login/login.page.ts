import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

import { Router } from "@angular/router";

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

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {}

  public submit() {
    console.log(this.loginForm.value);
  }
  
}
