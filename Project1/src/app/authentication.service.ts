import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RegisterResponse } from './models/RegisterResponse';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  

  registrationSuccess:boolean=false;
  constructor(private http:HttpClient,private datePipe:DatePipe) {
    
   }


  logout(){
    const api=environment.gateway_url+"/logout"
    return this.http.get(api,{
      withCredentials:true
    })
  }

  getProfile():Observable<any>{
    const api=environment.gateway_url+"/getProfile"
    return this.http.get(api,{
      withCredentials:true,
      observe: 'response' as 'response'
    })
  }

  getSearchHistory(email:string){
    console.log(email)
    const api=environment.gateway_url+"/search/getsearchhistory/"
    return this.http.get(api,{
      withCredentials:true
    })
  }


  getUserDetails(email:string,password:string){
    

    const api=environment.gateway_url+"/login"
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
    const api=environment.gateway_url+"/radar/plot?radar_id="+airport+"&date="+d+"&hour="+hour_i
    console.log(api)
    return this.http.get(api,{
      withCredentials:true,
      responseType:'blob'
    })
  }

  addSearch(sid:number,d:string,t:string,airport:string,email:string,bl:any):Observable<any>{
    const curDate = this.datePipe.transform(d, 'yyyy-MM-dd');
    //console.log(curDate)
    var hour=t.split(":")[0]
    var hour_i=Number.parseInt(hour)
    console.log(sid,email,airport,d,curDate,hour_i,bl)
    const api=environment.gateway_url+"/search/addsearchhistory"
    return this.http.post(api,{
      "searchId":sid,
      "userId":email,
      "airport":airport,
      "dateSearched":d,
      "createDate":curDate,
      "hour":hour_i,
      "plotted_image":bl

    },{
      withCredentials:true
    })
  }


  registerUserDetails(name:string,email:string,password:string):Observable<any>{
    const api=environment.gateway_url+"/register"
    return this.http.post(api,{
      "name":name,
      "email":email,
      "password":password,
      "profileType": "Manual"
    })
}

  googleLogin(){
    const api=environment.gateway_url+"/auth/google";
    return this.http.get(api)
  }
}
