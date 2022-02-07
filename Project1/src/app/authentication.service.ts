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


  logout(){
    const api="http://localhost:7777/logout"
    return this.http.get(api,{
      withCredentials:true
    })
  }

  getProfile(){
    const api="http://localhost:7777/getProfile"
    return this.http.get(api,{
      withCredentials:true
    })
  }

  getUserDetails(email:string,password:string){
    const api="http://localhost:7777/login"
    return this.http.post(api,{
      "email":email,
      "password":password
    })
    //Post to API Server :  return user info if correct
  }

  search(d:string,t:string,airport:string){
    const api=""
    
    return this.http.post(api,{
      'date':d,
      'time':t,
      'airport':airport
    })
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
    return this.http.get(api)
  }
}
