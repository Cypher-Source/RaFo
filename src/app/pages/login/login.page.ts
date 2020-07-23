import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public slideOneForm: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  
  this.slideOneForm = formBuilder.group({
    email: ['']
});

  

}
