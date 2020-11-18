import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'productsinventory';
  islogoutneeded:boolean;
  isloginandsignupneeded:boolean;
  constructor(private _authenticationService:AuthenticationService) {

   }
  
  ngOnInit(){
    
  }


  isLoggedIn() {

    //console.log("this._authenticationService.isLoggedIn() "+this._authenticationService.isLoggedIn())
    return this._authenticationService.isLoggedIn();
    
  }

  logout(){
    let logoutresponse=this._authenticationService.logout();
    if(logoutresponse)
    {
      this.islogoutneeded=false;
      this.isloginandsignupneeded=true;
    }
    console.log("Log out successfully processed");
  }

  
}
