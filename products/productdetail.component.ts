import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";
import { ProductService } from '../product.service';
import { Products } from '../products'; 

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  productsobj:Products;
  productid:string;
  
  /* productname:string;
  productprice:string;
  productdescription:string;
  productmanufacturer:string;
  productquantity:string; */

  constructor(private route: ActivatedRoute, private location: Location,private productsvc:ProductService) {

        if(! this.productsobj){
          this.productsobj={
            productname:"",
            productquantity:"",
            productdescription:"",
            productmanufacturer:"",
            productprice:"",
            id:"",
            isSelected:false,
            isViewed:0
        }
      }
   }

  ngOnInit() {
      
      this.route.params.forEach((params: Params) => {
      this.productid = params['id'];
      //calling the service for fetching product details
      this.productsvc.getProductDetails(this.productid).subscribe((products:Products)=>
      {
        this.productsobj=products;

        //Update isViewed property for the viewed product
        let updateProduct: Products = {
          productname:this.productsobj.productname,
          productquantity:this.productsobj.productquantity,
          productdescription:this.productsobj.productdescription,
          productmanufacturer:this.productsobj.productmanufacturer,
          productprice:this.productsobj.productprice,
          id:this.productsobj.id,
          isSelected:this.productsobj.isSelected,
          isViewed:this.productsobj.isViewed+1
        };
        this.productsvc.updateProducts(updateProduct).subscribe((products:Products)=>console.log("isViewed property updated Successfully for the viewed product"),
        err=>console.log("updateProduct error "+err));
      },
      err=>console.log("Get Products in Summary view error "+err));

    });
  }

  goBack(): void {
    this.location.back();
  }

  
}
