import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationurl="http://localhost:3000/userdetails";

  constructor(private _http:HttpClient,private _snackBar: MatSnackBar) { }

  isLoggedIn() {
    if (localStorage.getItem('Registered loginDetails') != null)
      return true;
    else
      return false;
  }

  validateLogin(loginDetails,registereduserdetails){

    if(registereduserdetails.find(x => x.EmailID === loginDetails.EmailID && x.Password === loginDetails.Password)){
      let loggedinUser=registereduserdetails.find(y=>y.EmailID === loginDetails.EmailID && y.Password === loginDetails.Password)
      loginDetails.id=loggedinUser.id;
     
      console.log("after validate Login, loginDetails "+JSON.stringify(loginDetails));
      
      localStorage.setItem('Registered loginDetails', JSON.stringify(loginDetails));
      this._snackBar.open("Logged in Successfully", "x", {
        duration: 2000,
      });
      console.log("login Successfull");
      return true;
    }
    else{
      this._snackBar.open("Please check your credentials", "x", {
        duration: 2000,
      });
      console.log("login not Successfull")
      return false;
    }
    
  }

  registerUser(userobj){
    console.log("adding user successfull");
    this._snackBar.open("User successfully registered", "x", {
      duration: 2000,
    });
    return this._http.post(this.authenticationurl,userobj);  //Add User
  }

  getregistereduserDetails(){
    return this._http.get(this.authenticationurl);
  }

  logout() {
    localStorage.removeItem('Registered loginDetails');
    this._snackBar.open("Logged out Successfully", "x", {
      duration: 2000,
    });
    console.log("logout successfull");
    return true;
  }

  getloggedinUserDetails(userid){
    const url=this.authenticationurl+"/"+userid;
    return this._http.get(url);
  }
}
