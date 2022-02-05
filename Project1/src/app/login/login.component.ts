import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators} from '@angular/forms'
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  constructor(private auth:AuthenticationService,public router:Router,private fb:FormBuilder ){
    this.createForm()
  }
  
  redirect(){
    location.href="http://localhost:7777/auth/google"
  }
  

  createForm(){
    this.loginForm=this.fb.group({
      email:new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      password:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(16)])
    })
  }

  fieldTextType: boolean=false;
  ngOnInit(): void {
   
  }
  email:any
  password:any


  login(event:Event){
    console.log(event)
  }


  submit(event:Event){
    const target=event.target
    const email=this.loginForm.get('email')?.value
    const pwd=this.loginForm.get('password')?.value
    this.auth.getUserDetails(email,pwd);
  }
  


  googleLogin(){
    this.auth.googleLogin()
  }

  showPassword(){
    
    this.fieldTextType=!this.fieldTextType
  }
}
