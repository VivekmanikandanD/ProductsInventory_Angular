import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddandupdateproductComponent } from './addandupdateproduct.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddandupdateproductComponent', () => {
  let component: AddandupdateproductComponent;
  let fixture: ComponentFixture<AddandupdateproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddandupdateproductComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports:[MatToolbarModule,FormsModule,HttpClientModule,MatSnackBarModule,RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddandupdateproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Add and Update Product Component', () => {
    const fixture = TestBed.createComponent(AddandupdateproductComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

 /*  it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
