import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RegisterResponse } from './models/RegisterResponse';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  

  registrationSuccess:boolean=false;
  constructor(private http:HttpClient) { }
  getUserDetails(email:string,password:string){
    const api="http://localhost:7777/login"
    return this.http.post(api,{
      "email":email,
      "password":password
    }).subscribe(data=>{
      console.log(data)
    })
    //Post to API Server :  return user info if correct
  }

  registerUserDetails(name:string,email:string,password:string):Observable<any>{
    const api="http://localhost:7777/register"
    return this.http.post(api,{
      "name":name,
      "email":email,
      "password":password,
      "profileType": "Manual"
    })
}

  googleLogin(){
    const api="http://localhost:7777/auth/google";
    return this.http.get(api).subscribe((data) => {
      console.log(data);
    })
  }
}
