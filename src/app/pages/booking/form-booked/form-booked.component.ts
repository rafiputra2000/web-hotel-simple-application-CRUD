import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { min } from 'rxjs';
import { Book } from '../model/hotel-booked.model';
import { HotelBookedService } from '../service/hotel-booked.service';

@Component({
  selector: 'app-form-booked',
  templateUrl: './form-booked.component.html',
  styleUrls: ['./form-booked.component.scss']
})
export class FormBookedComponent implements OnInit {

  booking?: Book;

  constructor(private readonly hotelBookedService: HotelBookedService, private readonly router: Router, private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        const { id } = params;
        if (id) {
          this.hotelBookedService.get(+id).subscribe({
            next: (booking: Book) => {
              this.booking = booking;
              this.setFormValue(this.booking);
            }
          })
        }
      }
    });

  }

  bookingGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    status: new FormControl(null),
    roomNumber: new FormControl('', [Validators.required, Validators.min(1)]),
    duration: new FormControl(null, [Validators.required, Validators.min(1)]),
    guestCount: new FormControl(null, [Validators.required, Validators.min(1)]),
    reservee: new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(12)]),
    }),
  });

  onSubmitReservation(): void {
    console.log('submitValue', this.bookingGroup.value);
    const payload = this.bookingGroup.value;
    console.log(payload)
    const { reservee } = payload
    this.hotelBookedService.save(payload).subscribe({
      next: () => {
        this.bookingGroup.reset()
        alert(`Tamu ${reservee.name} telah memasan kamar`)
      }
    });
    this.router.navigateByUrl('form-booking')
  }

  setFormValue(booking: Book): void {
    if (booking) {
      const { id, roomNumber, reservee, duration, guestCount} = booking
      this.bookingGroup.get(['id'])?.setValue(id);
      this.bookingGroup.get(['reservee', 'name'])?.setValue(reservee.name);
      this.bookingGroup.get(['reservee', 'email'])?.setValue(reservee.email);
      this.bookingGroup.get(['reservee', 'phone'])?.setValue(reservee.phone);
      this.bookingGroup.get(['roomNumber'])?.setValue(roomNumber);
      this.bookingGroup.get(['duration'])?.setValue(duration);
      this.bookingGroup.get(['guestCount'])?.setValue(guestCount);
    }
  }

}
