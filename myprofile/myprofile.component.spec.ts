import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileComponent } from './myprofile.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MyprofileComponent', () => {
  let component: MyprofileComponent;
  let fixture: ComponentFixture<MyprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofileComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports:[MatToolbarModule,FormsModule,HttpClientModule,MatSnackBarModule,RouterTestingModule,BrowserAnimationsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the My Profile Component', () => {
    const fixture = TestBed.createComponent(MyprofileComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

 /*  it('should create', () => {
    expect(component).toBeTruthy();
  }); */

});
