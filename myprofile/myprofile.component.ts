import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Signup } from '../signup';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  myprofileobj:Signup;
  constructor(private authenticationService:AuthenticationService,private _snackBar: MatSnackBar,private router:Router) { 

    if(!this.myprofileobj)
    {
        this.myprofileobj={
        EmailID:"",
        Password:"",
        Firstname:"",
        Lastname:"",
        Location:"",
        MobileNumber:0,
        id:""
        }
      
    }
  }

  ngOnInit() {
    let getloginUserDetails:any=localStorage.getItem('Registered loginDetails');
    getloginUserDetails=JSON.parse(getloginUserDetails);
    console.log("loginUserDetails "+JSON.stringify(getloginUserDetails));
    
    if(getloginUserDetails){
      this.authenticationService.getloggedinUserDetails(getloginUserDetails.id).subscribe((loginuserdetails:Signup)=>{
      this.myprofileobj=loginuserdetails;
      console.log("after fetching user details "+JSON.stringify(this.myprofileobj));
    });
    }
    else{
      this._snackBar.open("Please login to view MyProfile", "x", {
        duration: 2000,
      });

      this.router.navigate(['login']);

    }
  
    
  }

}
