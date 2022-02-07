import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LoginResponse } from '../models/LoginResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedUserName?:string
  csvUrl = 'assets/Weather_Radar_Stations.csv';
  searchBtnClicked:boolean=false
  searchForm!:FormGroup
  airports?:AirportLocations[]
  selectedAirport:string="-----"

  constructor(private http:HttpClient,private fb:FormBuilder,private auth:AuthenticationService,public router:Router) {
    this.createSearchForm()
   }

  submitSearch(event:Event){
    this.searchBtnClicked=true
    const target=event.target
    const d=this.searchForm.get('searchDate')?.value
    const t=this.searchForm.get('time')?.value
    const airport=this.selectedAirport
    console.log(d,t,airport)
    this.auth.search(d,t,airport).subscribe(data=>{
      console.log(data)
    
    

      /*
      if((data as RegisterResponse).message==='Registration completed!'){
          this.registrationSuccess=true
          console.log(this.registrationSuccess)
      }
      else{
        this.registrationSuccess=false
        console.log(this.registrationSuccess)
      }
        */
  })

  }

  createSearchForm(){
    this.searchForm=this.fb.group({
      searchDate:new FormControl('',[Validators.required]),
      time:new FormControl('',[Validators.required]),
      airport:new FormControl('')
    })
  }

  readCsvData (): AirportLocations[] {
      const airport:AirportLocations[]=[];
      this.http.get(this.csvUrl,{responseType:'text'}).subscribe(
          data => {
          //console.log(data)
          var rows=data.split('\n')
          rows.splice(0,1)
          //console.log(rows)
          for(var row of rows){
            var temp=row.split(",")
            var al=new AirportLocations(Number(temp[0]),temp[1],Number(temp[2]),Number(temp[3]),temp[4],temp[5],temp[6])
            airport.push(al)
          }
          },
          err => {
            console.log(err)
          });
  return airport 
  }
  
 
  

  ngOnInit(): void {
    
    this.auth.getProfile().subscribe(
      data=>{
        var resp=JSON.stringify(data)
        var resp2=JSON.parse(resp)
        console.log(resp2)
        this.loggedUserName=resp2['name']
      },
      err=>{
          console.log(err)
          this.router.navigate(['/login'])
      })
      this.airports=this.readCsvData()

    }


}




export class AirportLocations{
  
  constructor(objectID:number,siteId:string,longitude:number,latitude:number,siteName:string,radarType:string,antennaElevation:string) {
    this.objectID=objectID
    this.siteId=siteId
    this.longitude=longitude,
    this.latitude=latitude,
    this.siteName=siteName
    this.radarType=radarType
    this.antennaElevation=antennaElevation
   }
  objectID:number
  siteId:string
  longitude:number
  latitude:number
  siteName:string
  radarType:string
  antennaElevation:string
} 