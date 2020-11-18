import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsurl="http://localhost:3000/products";

  constructor(private _http:HttpClient,private _snackBar: MatSnackBar) { }


  getProducts(){
    this._snackBar.open("Products fetched successfully", "x", {
      duration: 2000,
    });
    return this._http.get(this.productsurl);
  }

  getProductDetails(getproductid){
    this._snackBar.open("Products Details fetched successfully", "x", {
      duration: 2000,
    });
    const url = `${this.productsurl}/${getproductid}`; // Get Product Details
    return this._http.get(url);
  }

  addProducts(productsobj){
    this._snackBar.open("Product added successfully, New product can be added now", "x", {
      duration: 6000,
    });
    return this._http.post(this.productsurl,productsobj);  //Add Product
  }
  
  updateProducts(productsobj){
    this._snackBar.open("Product updated successfully", "x", {
      duration: 2000,
    });
    const url = `${this.productsurl}/${productsobj.id}`; // Making update url with product id
    console.log("update url "+url)
    return this._http.put(url,productsobj);   //Update Product
  }

  deleteProducts(selectedprodid){
    this._snackBar.open("Product deleted successfully", "x", {
      duration: 2000,
    });
    const url = `${this.productsurl}/${selectedprodid}`; // Delete products
    return this._http.delete(url);
    /* if(selectedprodids.length!=0)
    {
      for(var i=0;i<selectedprodids.length;i++)
      {
        let prodid=selectedprodids.pop();
        const url = `${this.productsurl}/${prodid}`; // Delete products
        return this._http.delete(url);
      }
      
    } */
    
  }

}
