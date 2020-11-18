import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductdetailComponent } from './productdetail.component';
import { PagenotfoundComponent } from '../pagenotfound/pagenotfound.component';
import { ProductService } from '../product.service';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material'
import { AddandupdateproductComponent } from './addandupdateproduct/addandupdateproduct.component';
import { FormsModule} from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsFilterPipe } from './products-filter.pipe';
import {MatRippleModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [ProductsComponent,ProductdetailComponent,PagenotfoundComponent,AddandupdateproductComponent,ProductsFilterPipe],
  imports: [ProductsRoutingModule,CommonModule,MatCardModule,MatDividerModule,MatCheckboxModule,MatToolbarModule,MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule,MatSnackBarModule,MatRippleModule,MatListModule,MatExpansionModule],
  providers:[ProductService]
})
export class ProductsModule { }
