import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as uuid from 'uuid';
import { AuthenticationService } from 'src/app/authentication.service';
import { Signup } from '../signup'
import { Router } from '@angular/router';

const userId = uuid.v4();

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild(NgForm, {static: false}) signUpForm: NgForm;

  signupobj:Signup;
  signupid:any;
  constructor(private authenticationService:AuthenticationService,private router:Router) {
        if(! this.signupobj){
          this.signupobj={
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
  }


  onSubmit(formValue: any){
    
      // console.log(formValue);
      let newUser: Signup = {
        EmailID:formValue.emailid,
        Password:formValue.password,
        Firstname:formValue.firstname,
        Lastname:formValue.lastname,
        Location:formValue.location,
        MobileNumber:formValue.mobilenumber,
        id:userId
      };
  
      console.log("add new User "+JSON.stringify(newUser))    
      this.authenticationService.registerUser(newUser).subscribe((user:Signup)=>console.log("User added Successfully"),
      err=>console.log("addUser error "+err));
      this.signUpForm.reset();
      this.router.navigate(['login']);
    
  }
  
}
