import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Products } from '../products'; 
import { Router,ActivatedRoute } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  
   products:Products[];
   selectedProducts : Products[];
   producttobeupdated:Products;
   
   //show/hide buttons
   needupdatebtn:boolean=false;
   needdeletebtn:boolean=false;
   needaddbtn:boolean=true;
   selectedprodcount:number=0;

   //For login/logout links
   islogoutneeded:boolean;
   isloginandsignupneeded:boolean;

   //show/hide product labels
   showproductname:boolean=true;
   showproductprice:boolean=true;
   showproductmanufacturer:boolean=true;

   nameFilter;

  constructor(private productsvc:ProductService,private router: Router,private route: ActivatedRoute,private _snackBar: MatSnackBar,private _authenticationService:AuthenticationService) { }

  ngOnInit() {
      
      this.selectedprodcount=0;
      
      console.log("this.route.params "+JSON.stringify(this.route.params))
      this.route.params.subscribe((params: any) => {
        if (params.isfromaddProduct || params.isfromupdateProduct) {
            console.log("params id exist, it is from Add Product page or Update Product page ")
            this.productsvc.getProducts().subscribe((products:Products[])=>
            {
              this.products=products;

              //For enabling/disabling login/logout links
              if(this._authenticationService.isLoggedIn)
              {
                this.islogoutneeded=true;
                this.isloginandsignupneeded=false;
              }
              else
              {
                this.islogoutneeded=false;
                this.isloginandsignupneeded=true;
              }
            },
            
            err=>{
              console.log("Get Products in Summary view error "+err);
              this._snackBar.open("There were some errors fetching products, Please check after some time", "x", {
                duration: 2000,
              });

            });
        } else {
          console.log("params id does not exist, it is not from Add Product page or Update Product page")
          this.productsvc.getProducts().subscribe((products:Products[])=>
          {
             this.products=products;

            //For enabling/disabling login/logout links
            if(this._authenticationService.isLoggedIn)
            {
              this.islogoutneeded=true;
              this.isloginandsignupneeded=false;
            }
            else
            {
              this.islogoutneeded=false;
              this.isloginandsignupneeded=true;
            }
          },
          
          err=>{
            console.log("Get Products in Summary view error "+err);
            this._snackBar.open("There were some errors fetching products, Please check after some time", "x", {
              duration: 2000,
            });

        });
         
        }
       });

      

  }

   
   showOptions(ischecked,prodobj){
      //alert("checked "+ischecked)
      //alert(JSON.stringify(prodobj))
      if(ischecked==true)
      {
        this.selectedprodcount++;
        this.selectedProducts=prodobj;
        this.producttobeupdated=prodobj;
        
        if(this.products)
        {
          //Finding the index of the selected product in loaded products
          let indexofSelectedProduct=this.products.findIndex(i=>i.id===prodobj.id)
                  
          //Assigning isSelected property to True to the selected Product through it's index
          this.products[indexofSelectedProduct].isSelected=true;
        }
       
      }
      else if(ischecked==false)
      {
        this.selectedprodcount--;
        if(this.products)
        {
         //Finding the index of the selected product in loaded products
        let indexofSelectedProduct=this.products.findIndex(i=>i.id===prodobj.id)

         //Assigning isSelected property to False to the selected Product through it's index
        this.products[indexofSelectedProduct].isSelected=false;
        }
      }
      
      //Logic for enabling/disabling buttons
      if(this.selectedprodcount==1)
      {
        this.needupdatebtn=true;
        this.needdeletebtn=true;
      }
      else if(this.selectedprodcount>1)
      {
        this.needupdatebtn=false;
        this.needdeletebtn=true;
      }
      else
      {
        this.needupdatebtn=false;
        this.needdeletebtn=false;
      }
    
   }

   
   updateProduct(){
   
      if(this.producttobeupdated!=undefined)
      {
        console.log("selectedprodobj.id" +JSON.stringify(this.producttobeupdated))
        this.router.navigate(['addproduct', {id: this.producttobeupdated.id}]);
      }
      else
      {
        this._snackBar.open("Please select the product to be updated", "x", {
          duration: 2000,
        });
        console.log("Please select the product to be updated");
      }
    
   }

   deleteProduct(){

      let confirmationmsg=confirm("Are you sure you want to delete?");

      if(confirmationmsg==true)
      {
        this.selectedProducts = this.products.filter(p=> p.isSelected === true)
        console.log("this.selectedProducts "+JSON.stringify(this.selectedProducts));
  
        //Pushing product id in the selectedproductids array
        let selectedprodids=[];
        this.selectedProducts.forEach(function(x){
          selectedprodids.push(x.id);
        });
    
        var deletecount=0;
        //Calling the delete service for every id in selectedproductids array
        if(selectedprodids.length!=0)
        {
          for(var i=0;i<selectedprodids.length;i++)
          {
            this.productsvc.deleteProducts(selectedprodids[i]).subscribe(data =>{
              console.log("data "+data)
              //console.log("typeofdata "+typeof(data))
              if(data!="false")
              {
                console.log("inside data!=false "+data)
                deletecount++;
                this._snackBar.open("Selected Products Deleted Successfully", "x", {
                  duration: 2000,
                });
                console.log("selected products deleted successfully ")
    
                //console.log("deletecount "+deletecount)
                //console.log("before if selectedprodids.length "+selectedprodids.length)
                if(deletecount==selectedprodids.length)
                {
                  //Reloading the products get service after deleting the selected products
                  this.productsvc.getProducts().subscribe((products:Products[])=>
                  this.products=products,
                  err=>{
                    console.log("Get Products in Summary view error "+err);
                    this._snackBar.open("There were some errors fetching products, Please check after some time", "x", {
                      duration: 2000,
                    });
                  });
                }
              }
             
  
            });  
  
          }
        }
      }
      
  }

  showhidelabelsOptions(ischecked,labelname){
    console.log("ischecked "+ischecked)
    console.log("labelname "+JSON.stringify(labelname))
    if(ischecked==true && labelname=="name"){
      this.showproductname=true;
    }
    else if(ischecked==true && labelname=="price"){
      this.showproductprice=true;
    }
    else if(ischecked==true && labelname=="manufacturer"){
      this.showproductmanufacturer=true;
    }
    else if(ischecked==false && labelname=="name"){
      this.showproductname=false;
    }
    else if(ischecked==false && labelname=="price"){
      this.showproductprice=false;
    }
    else if(ischecked==false && labelname=="manufacturer"){
      this.showproductmanufacturer=false;
    }

  }


}
