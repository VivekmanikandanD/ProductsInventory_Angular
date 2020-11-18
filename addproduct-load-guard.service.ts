import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot } from '@angular/router'
import { AddandupdateproductComponent } from './products/addandupdateproduct/addandupdateproduct.component';

@Injectable({
  providedIn: 'root'
})
export class AddproductguardService implements CanDeactivate<AddandupdateproductComponent> {

  constructor() { }

    canDeactivate(component: AddandupdateproductComponent): boolean {
      if (component.addEmployeeForm.dirty && !component.addEmployeeForm.submitted) {
          return confirm('Are you sure you want to leave, there are unsaved changes on your form ?');
      }
      return true;
  }

}
