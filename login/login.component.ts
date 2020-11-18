import { Component, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { Login, Signup } from '../signup'
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from "@angular/common";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild(NgForm, {static: false}) loginForm: NgForm;

  loginobj:Login;
  registereduserdetails:Signup[];
  validateResponse:boolean;
  getnavigatedfromurl;
 
 
  constructor(private authenticationService:AuthenticationService,private route: ActivatedRoute,private router:Router,private location:Location,private _snackBar: MatSnackBar) { 
        if(! this.loginobj){
          this.loginobj={
            EmailID:"",
            Password:""
        }
      }
  }

  ngAfterViewInit():void {
   
    console.log("this.route.params "+JSON.stringify(this.route.params))
    this.route.params.subscribe((params: any) => {
      if (params.navigatedfromurl) {
          console.log("params navigatedfromurl exist, routed from other page ")

          this.getnavigatedfromurl=params.navigatedfromurl;
          this.authenticationService.getregistereduserDetails().subscribe((users:Signup[])=>{
            //console.log("registered user details "+JSON.stringify(users));
            this.registereduserdetails=users;
          },
          error=>console.log("getting registered user details error "+error))
        
        
      } else {
          console.log("fetching registered user details ");
          this.getnavigatedfromurl="/products"; //default url
        this.authenticationService.getregistereduserDetails().subscribe((users:Signup[])=>{
          //console.log("registered user details "+JSON.stringify(users));
          this.registereduserdetails=users;
        },
        error=>console.log("getting registered user details error "+error))
        console.log("params navigatedfromurl does not exist, not routed from other page")
      }
     });

  }

    onSubmit(formValue: any){
      
      // console.log(formValue);
      let loginDetails: Login = {
        EmailID:formValue.emailid,
        Password:formValue.password,
      };

      //console.log("login Details "+JSON.stringify(loginDetails))    
      this.validateResponse=this.authenticationService.validateLogin(loginDetails,this.registereduserdetails)
        if(this.validateResponse)
        {
          console.log("Login Successfully processed"),
          this._snackBar.open("Login Successfull", "x", {
           duration: 2000,
         }),
         console.log("this.getnavigatedfromurl "+this.getnavigatedfromurl),
          //this.router.navigate(['products']);
 
          this.router.navigate([this.getnavigatedfromurl]);
        }
           
        else
           {
            console.log("Login not Successfully processed");
            this._snackBar.open("Please check your credentials", "x", {
              duration: 2000,
            });
           }
      
      //this.loginForm.reset();
      //this.router.navigate(['products']);
  }

  signup(){
    console.log("going to signup form");
    this.router.navigate(['signup']);
  }

  goBack(): void {
    this.location.back();
  }

}
