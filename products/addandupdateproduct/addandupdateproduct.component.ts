import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Products } from '../../products';
import { ProductService } from 'src/app/product.service';
import * as uuid from 'uuid';
import { ActivatedRoute, Params, Router } from "@angular/router";

const productId = uuid.v4();

@Component({
  selector: 'app-addandupdateproduct',
  templateUrl: './addandupdateproduct.component.html',
  styleUrls: ['./addandupdateproduct.component.css']
})
export class AddandupdateproductComponent implements OnInit {

  @ViewChild(NgForm, {static: false}) addEmployeeForm: NgForm;
  
  productsobj:Products;
  productid:any;
  typeofform:string;
  saveorupdatebutton:string="";

  constructor(private productsService:ProductService,private route: ActivatedRoute, private router: Router) {
      if(! this.productsobj){
        this.productsobj={
        productname:"",
        productdescription:"",
        productmanufacturer:"",
        productprice:"",
        productquantity:"",
        id:"",
        isSelected:false,
        isViewed:0
      }
    }
  }

  ngOnInit() : void {
   
    console.log("this.route.params "+JSON.stringify(this.route.params))
    this.route.params.subscribe((params: any) => {
      if (params.id) {
          console.log("params id exist, it is updateProduct ")
          this.typeofform="Update";
          this.saveorupdatebutton="Update";
          this.route.params.forEach((params: Params) => {
          this.productid = params['id'];
          //calling the service for fetching product details
          this.productsService.getProductDetails(this.productid).subscribe((products:Products)=>
          {
            this.productsobj=products;
            
          },
          err=>console.log("Getting Product details for update error "+err));
    
        });
      } else {
        this.typeofform="Add";
        this.saveorupdatebutton="Save";
       /*  this.productsobj.productname="";
        this.productsobj.productdescription="";
        this.productsobj.productmanufacturer="";
        this.productsobj.productprice="";
        this.productsobj.productquantity=""; */
        console.log("params id does not exist, it is addProduct ")
      }
     });

}


    onSubmit(formValue: any){

          if(this.saveorupdatebutton=="Save"){
            // console.log(formValue);
            let newProduct: Products = {
              productname:formValue.productname,
              productquantity:formValue.productquantity,
              productdescription:formValue.productdescription,
              productmanufacturer:formValue.productmanufacturer,
              productprice:formValue.productprice,
              id:productId,
              isSelected:false,
              isViewed:0
            };

            console.log("add new Product "+JSON.stringify(newProduct))    
            this.productsService.addProducts(newProduct).subscribe((products:Products)=>console.log("Product added Successfully"),
            err=>console.log("addProduct error "+err));
            this.addEmployeeForm.reset();
            //this.router.navigate(['products', {isfromaddProduct: "Yes"}]);
            this.router.navigate(['products', {isfromaddProduct: "Yes"}]);
          }
          else if(this.saveorupdatebutton=="Update"){
            // console.log(formValue);
            let newProduct: Products = {
              productname:formValue.productname,
              productquantity:formValue.productquantity,
              productdescription:formValue.productdescription,
              productmanufacturer:formValue.productmanufacturer,
              productprice:formValue.productprice,
              id:this.productid,
              isSelected:false,
              isViewed:0
            };

            console.log("update the Product "+JSON.stringify(newProduct))    
            this.productsService.updateProducts(newProduct).subscribe((products:Products)=>console.log("Product updated Successfully"),
            err=>console.log("updateProduct error "+err));
            this.addEmployeeForm.reset();
            this.router.navigate(['products', {isfromupdateProduct: "Yes"}]);
           
          }
          else
          {
            console.log("Cannot perform Save or update, Please check the errors..")
          }
      }
}
