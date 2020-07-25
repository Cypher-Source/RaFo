import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get cpassword() {
    return this.signupForm.get('cpassword');
  }

  public errorMessages = {
    
    username: [
      { type: 'required', message: 'Username is required'},
      { type: 'maxlength',
      message: 'Username cant be longer than 20 characters'}
      
    ],
    email: [
      { type: 'required', message: 'Email is required'},
      { type: 'pattern', message: 'Please enter a valid email address'}
    ],
    password: [
      { type: 'required', message: 'Password is required'},
      { type: 'maxlength',
      message: 'password cant be longer than 20 characters'},
      { type: 'minlength',
      message: 'State cant be less than 5 characters'},
      { type: 'pattern',
      message: 'must have a special character'}
      
    ],
    cpassword: [
      { type: 'required', message: 'Password is required'},
      { type: 'pattern', message: 'Password mismatch'}
    ]

  }

  signupForm = this.formBuilder.group ({
  username: ['', Validators.required, Validators.maxLength(20)],
  email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
  password: ['', Validators.required, Validators.maxLength(20), Validators.minLength(5), Validators.pattern(/[^((0-9)|(a-z)|(A-Z)|\s)]/)],
  cpassword: ['', Validators.required]
}); 

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  public submit() {
    console.log(this.signupForm.value);
    
  }

  signup(){
    this.router.navigateByUrl('/signup');
  }


}
