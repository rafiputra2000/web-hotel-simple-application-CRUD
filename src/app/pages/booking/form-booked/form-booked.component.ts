import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  constructor(private readonly hotelBookedService: HotelBookedService, private readonly router: Router) {}

  ngOnInit(): void {

  }

  bookingGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    status: new FormControl(null),
    roomNumber: new FormControl('',[Validators.required]),
    duration: new FormControl(null,[Validators.required]),
    guestCount: new FormControl(null,[Validators.required]),
    reservee: new FormGroup({
      id: new FormControl(null),
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
    }),
  });

  onSubmitReservation(): void{
    console.log('submitValue', this.bookingGroup.value);
    const payload = this.bookingGroup.value;
    console.log(payload)
    const { reservee } = payload
    this.hotelBookedService.save(payload).subscribe({
      next:() => {
        this.bookingGroup.reset()
        alert(`Tamu ${reservee.name} telah memasan kamar`)
      }
    });
    this.router.navigateByUrl('form-booking')
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
