import { TestBed, async,ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsComponent } from '../products/products.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { FormsModule }  from '@angular/forms';
import { ProductsFilterPipe } from './products-filter.pipe';

describe('ProductsComponent', () => {
  let component :ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        FormsModule
      ],
      declarations: [
        ProductsComponent,
        ProductsFilterPipe
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
  }));

  it('should create the ProductsComponent', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Initially after loading the component selectedprodcount must be 0', () => {
    expect(component.selectedprodcount).toEqual(0);
  });
  
  it('selectedprodcount must be be incremented after marking the checkbox to true', () => {
    let initialselectedprodcount=component.selectedprodcount;
 
    let prodobj={
      "productname": "Samsung Note 10",
      "productquantity": "6",
      "productdescription": "Flagship mobile",
      "productmanufacturer": "Samsung",
      "productprice": "70000",
      "id": 2,
      "isSelected": false,
      "isViewed": 9
    };
    component.showOptions(true,prodobj);
    console.log("selectedprodcount must be be incremented after marking the checkbox to true "+component.selectedprodcount)
    expect(component.selectedprodcount).toBeGreaterThan(initialselectedprodcount);  //after adding new product initialselectedprodcount should get incremented
  });

  it('selectedprodcount must be be decremented after marking the checkbox to false', () => {
    let initialselectedprodcount=component.selectedprodcount;
  
    let prodobj={
      "productname": "Samsung Note 10",
      "productquantity": "6",
      "productdescription": "Flagship mobile",
      "productmanufacturer": "Samsung",
      "productprice": "70000",
      "id": 2,
      "isSelected": false,
      "isViewed": 9
    };
    component.showOptions(false,prodobj);
    console.log("selectedprodcount must be be decremented after marking the checkbox to fals "+component.selectedprodcount)
    expect(component.selectedprodcount).toBeLessThan(initialselectedprodcount);  //after adding new product initialselectedprodcount should get incremented
  });

  it('Show Update button and Delete button if the selectedprodcount is 1', () => {
    let initialselectedprodcount=component.selectedprodcount;
  
    let prodobj={
      "productname": "Samsung Note 10",
      "productquantity": "6",
      "productdescription": "Flagship mobile",
      "productmanufacturer": "Samsung",
      "productprice": "70000",
      "id": 2,
      "isSelected": false,
      "isViewed": 9
    };
    component.showOptions(true,prodobj);
    console.log("Show Update button and Delete button if the selectedprodcount is 1 "+component.selectedprodcount)
    expect(component.needupdatebtn).toBe(true,'Update button visible');  //after selecting a single checkbox show update and delete buttons
    expect(component.needdeletebtn).toBe(true,'Delete button visible');  //after selecting a single checkbox show update and delete buttons
  });

  it('Show Delete button and Hide Update button if the selectedprodcount is greater than 1', () => {
    let initialselectedprodcount=component.selectedprodcount;
   
    let prodobj={
      "productname": "Samsung Note 10",
      "productquantity": "6",
      "productdescription": "Flagship mobile",
      "productmanufacturer": "Samsung",
      "productprice": "70000",
      "id": 2,
      "isSelected": false,
      "isViewed": 9
    };
    component.showOptions(true,prodobj);
    component.showOptions(true,prodobj);
    console.log("Show Delete button and Hide Update button if the selectedprodcount is greater than 1 "+component.selectedprodcount)
    expect(component.needupdatebtn).toBe(false,'Update button not visible');  //after selecting more than one checkbox hide update button
    expect(component.needdeletebtn).toBe(true,'Delete button visible');  //after selecting a single checkbox show update and delete buttons
  });

  it('Hide Update button and Delete button if the selectedprodcount is 0', () => {
    let initialselectedprodcount=component.selectedprodcount;
   
    let prodobj={
      "productname": "Samsung Note 10",
      "productquantity": "6",
      "productdescription": "Flagship mobile",
      "productmanufacturer": "Samsung",
      "productprice": "70000",
      "id": 2,
      "isSelected": false,
      "isViewed": 9
    };
    component.showOptions(false,prodobj);
    component.showOptions(false,prodobj);
    console.log("Hide Update button and Delete button if the selectedprodcount is 0 "+component.selectedprodcount)
    expect(component.needupdatebtn).toBe(false,'Update button not visible');  //after unselecting all the checkboxes hide update button
    expect(component.needdeletebtn).toBe(false,'Delete button not visible'); //after unselecting all the checkboxes hide delete button
  });
  

  /*
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('productsinventory app is running!');
  }); */
});
