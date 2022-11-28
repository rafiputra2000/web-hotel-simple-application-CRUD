import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookedListComponent } from './booked-list/booked-list.component';
import { FormBookedComponent } from './form-booked/form-booked.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BookedListComponent,
    FormBookedComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BookedListComponent,
    FormBookedComponent
  ]
})
export class BookingModule { }
