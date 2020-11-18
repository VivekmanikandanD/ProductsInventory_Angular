import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopviewedproductsComponent } from './topviewedproducts.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('TopviewedproductsComponent', () => {
  let component: TopviewedproductsComponent;
  let fixture: ComponentFixture<TopviewedproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopviewedproductsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports:[MatToolbarModule,HttpClientModule,MatSnackBarModule,RouterTestingModule,ChartsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopviewedproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the Top viewed Products Component', () => {
    const fixture = TestBed.createComponent(TopviewedproductsComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

 /*  it('should create', () => {
    expect(component).toBeTruthy();
  }); */
});
