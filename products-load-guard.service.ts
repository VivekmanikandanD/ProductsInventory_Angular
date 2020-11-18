import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddandupdateproductComponent } from './products/addandupdateproduct/addandupdateproduct.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsLoadGuardService implements CanActivate{

  constructor(private _authenticationService:AuthenticationService,private _snackBar: MatSnackBar,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(`Can ${state.url} be activated ?`);
    if(`${state.url}`.indexOf(";")!=-1)   //For replacing with update url
    {
      state.url=state.url.replace(/add/g,"update");
      state.url=state.url.replace(/;id=/g,"/");
    }
    
    if (this._authenticationService.isLoggedIn()) {
      console.log("Yes, Product Details can be shown as we are already logged in.");
      return true;
  }
  else {
    let custommsg="";
    
    if(`${state.url}`.indexOf("addproduct")!=-1){
      custommsg="Please login to Add Products";
    }
    else
    {
      custommsg="Please login to see Product Details";
    }
      this._snackBar.open(custommsg, "x", {
        duration: 2000,
      });

      //Navigating to the login page
      this.router.navigate(['login', {navigatedfromurl: `${state.url}`}]);

      console.log("Cannot activate Product Details until logged in...");
      return false;
  }

}

CanDeactivate(state: RouterStateSnapshot,component: AddandupdateproductComponent,
  route: ActivatedRouteSnapshot):Observable<boolean> | boolean {
  console.log(`Can ${state.url} be deactivated ?`);
  console.log(` component.addEmployeeForm.dirty ?`+ component.addEmployeeForm.dirty);
  console.log(`component.addEmployeeForm.touched `+component.addEmployeeForm.touched);

 

    if (component.addEmployeeForm.dirty && component.addEmployeeForm.touched !=null) {
      console.log("The user has done some changes in the form, cannot deactivate untill the user confirms");
      return confirm("Discard your changes ?");
    }
    else {
        console.log("The user hasn't done any changes in the form, can deactivate successfully");
        return true;
    } 

}

}
