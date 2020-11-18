import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductdetailComponent } from './productdetail.component';
import { ProductsLoadGuardService } from '../products-load-guard.service';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { AddandupdateproductComponent } from './addandupdateproduct/addandupdateproduct.component';
import { AddproductguardService } from '../addproduct-load-guard.service';


const prodRoutes: Routes = [
  
  { 
    path: '', 
    component:ProductsComponent
  },
  { 
    path: 'products', 
    children: [
      { path: ':id', component: ProductdetailComponent,
        canActivate: [ProductsLoadGuardService]
      }
    ]
  },
  { 
    path: 'addproduct', 
    component: AddandupdateproductComponent,
    canActivate: [ProductsLoadGuardService],
    canDeactivate:[AddproductguardService]
    
  },
  { 
    path: 'updateproduct', 
    children: [
      { path: ':id', component: AddandupdateproductComponent,
        canActivate: [ProductsLoadGuardService]
      }
    ]
  },
  { 
    path: 'deleteproduct', 
    children: [
      { path: ':id', component: ProductdetailComponent,
        canActivate: [ProductsLoadGuardService]
      }
    ]
  }
  
  /* ,
  { 
    path: '**', 
    component:PagenotfoundComponent
  } */
  
];

@NgModule({
  imports:[RouterModule.forChild(prodRoutes)],
  exports:[RouterModule]
})
export class ProductsRoutingModule { }
