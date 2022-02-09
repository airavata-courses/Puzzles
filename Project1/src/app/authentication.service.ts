import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RegisterResponse } from './models/RegisterResponse';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


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

  getProfile():Observable<any>{
    const api="http://localhost:7777/getProfile"
    return this.http.get(api,{
      withCredentials:true,
      observe: 'response' as 'response'
    })
  }

  getSearchHistory(){

    const api="http://localhost:10000/search/getsearchhistory/ABCD1234"
    return this.http.get(api)
  }


  getUserDetails(email:string,password:string){
    

    const api="http://localhost:7777/login"
    return this.http.post(api,{
      "email":email,
      "password":password
    },{
      withCredentials:true
    })
    //Post to API Server :  return user info if correct
  }

  search(d:string,t:string,airport:string):Observable<any>{    
    var hour=t.split(":")[0]
    var hour_i=Number.parseInt(hour)
    //console.log(hour_i.toString())
    
    //const api="http://localhost:7777/search/checkifexists?airport="+airport+"&dateSearched="+d+"&hour="+hour_i
    const api="http://localhost:7777/radar/plot?radar_id="+airport+"&date="+d+"&hour="+hour_i
    console.log(api)
    return this.http.get(api,{
      withCredentials:true,
      responseType:'blob'
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
