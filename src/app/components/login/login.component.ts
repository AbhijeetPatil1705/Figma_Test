import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router) { }
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })
  }

  onSubmit(val: Login) {
    if (val.email == 'patilabhijeet1705@gmail.com' && val.password == 'Login@123') {
      alert('Login Succesful');
      localStorage.setItem('Login', 'true')
      this.router.navigate(['home'])
    } else {
      alert('Login Failure')
      this.router.navigate(['login'])
    }
  }
}
