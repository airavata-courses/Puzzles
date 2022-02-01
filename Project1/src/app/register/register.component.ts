import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!:FormGroup
  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  constructor(private auth:AuthenticationService,public router:Router,private fb:FormBuilder) {
    this.createForm()
   }
  createForm(){
    this.registerForm=this.fb.group({
      name:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      password:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(16)])
    })
  }
  fieldTextType: boolean=false;


  submit(event:Event){
    const target=event.target
    const name=this.registerForm.get('name')?.value
    const email=this.registerForm.get('email')?.value
    const pwd=this.registerForm.get('password')?.value
    console.log(name,email,pwd)
  }


  showPassword(){
    
    this.fieldTextType=!this.fieldTextType
  }
  ngOnInit(): void {
  }

}
