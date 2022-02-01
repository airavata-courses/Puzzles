import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private http:HttpClient) { }
  getUserDetails(email:string,password:string){
    const api=""
    return this.http.post(api,{
      email,
      password
    }).subscribe(data=>{
      console.log(data)
    })
    //Post to API Server :  return user info if correct
  }
}
