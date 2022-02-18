import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Communications } from '../communications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private comms: Communications,
    private router: Router) {
      this.comms.setSideBar(false);
    }
  
  errorMessage: string = "";
  checkoutForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  ngOnInit(): void {
    
  }
  
  onSubmit(): void {
    this.errorMessage = "";
    let data = this.checkoutForm.value
    this.authService.SignIn(data.email, data.password)
      .then(() => {
        this.comms.setSideBar(true);
        this.router.navigate(['/teacher']);
      })
      .catch((error) => {
        this.errorMessage = error.message;
      });
    this.checkoutForm.reset();
  }
}
