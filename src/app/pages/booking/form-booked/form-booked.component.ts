import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../model/hotel-booked.model';
import { HotelBookedService } from '../service/hotel-booked.service';

@Component({
  selector: 'app-form-booked',
  templateUrl: './form-booked.component.html',
  styleUrls: ['./form-booked.component.scss']
})
export class FormBookedComponent implements OnInit{

  booking?: Book;

  constructor(private readonly hotelBookedService :HotelBookedService, private readonly router: Router) {}

  ngOnInit(): void {

  }

  bookingGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    roomNumber: new FormControl(null),
    duration: new FormControl(null),
    guestCount: new FormControl(null),
    status: new FormControl('reserved'),
    reserve: new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null),
    }),
  });

  onSubmitReservation(): void{
    console.log(this.bookingGroup.value);
    this.hotelBookedService.save(this.bookingGroup.value).subscribe();
    this.bookingGroup.reset()
    this.router.navigateByUrl('booked-list')
  }

  setFormValue(booking: Book): void {
    if(booking){
      this.bookingGroup.controls['id']?.setValue(booking.id);
      this.bookingGroup.controls['name']?.setValue(booking.reservee.name);
      this.bookingGroup.controls['email']?.setValue(booking.reservee.email);
      this.bookingGroup.controls['phone']?.setValue(booking.reservee.phone);
      this.bookingGroup.controls['roomnumber']?.setValue(booking.roomNumber);
      this.bookingGroup.controls['duration']?.setValue(booking.duration);
      this.bookingGroup.controls['guestcount']?.setValue(booking.guestCount);
    }
  }

}
