import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/hotel-booked.model';
import { HotelBookedService } from '../service/hotel-booked.service';

@Component({
  selector: 'app-booked-list',
  templateUrl: './booked-list.component.html',
  styleUrls: ['./booked-list.component.scss']
})
export class BookedListComponent implements OnInit{

  bookings: Book[] = []
  booking!: Book;
  urlLinked: string = "/form-booking"

  constructor(private readonly hotelBookedService :HotelBookedService, private readonly router: Router) {}

  ngOnInit(): void {
    this.onLoadHotels()
    console.log(this.bookings);

  }

  onLoadHotels(): void {
    this.hotelBookedService.list().subscribe({
      next: (booking: Book[]) => {
        this.bookings = booking;
      }
    });
  }


  onReserve(booking: Book): void {
    if (booking.status === 'reserved') {
        this.router.navigateByUrl(`${this.urlLinked}/${booking.id}`);
    } else {
      alert(
      `Tamu ${booking.reservee.name} sudah melakukan ${booking.status} tidak bisa ubah durasi malam`
      );
    }
  }

  //Percobaan not GetById
  // onCheckIn(bookingId: number): void {
  //   this.bookings.map((t) => {
  //     if(t.id === bookingId){
  //       if(t.status === 'checked-out'){
  //         alert(`Tamu ${t.reservee.name} sudah melakukan ${t.status} tidak bisa melakukan checked-in`)
  //       } else {
  //         this.hotelBookedService.checkIn(bookingId).subscribe()
  //         alert(`Tamu ${t.reservee.name} sudah check-in pada kamar ${t.roomNumber}.`)
  //       }
  //     }
  //   })
  // }

  //Percobaan GetById
  onCheckIn(bookingId: number): void {
    this.hotelBookedService.get(bookingId).subscribe({
      next: (booking: Book) => {
        if(booking.status === 'checked-out'){
          alert(`Tamu ${booking.reservee.name} sudah melakukan ${booking.status} tidak bisa melakukan checked-out`)
        } else {
          console.log("onCheckIn",booking.status);
          this.hotelBookedService.checkIn(bookingId).subscribe()
          alert(`Tamu ${booking.reservee.name} sudah check-in pada kamar ${booking.roomNumber}.`)
        }
      }
    })
  }

  onCheckOut(bookingId: number): void {
    this.hotelBookedService.get(bookingId).subscribe({
      next: (booking: Book) => {
          this.hotelBookedService.checkOut(bookingId).subscribe();
          alert(`Tamu ${booking.reservee.name} sudah check-out pada kamar ${booking.roomNumber}.`)
      }
    });
  }

  onDeleteReservation(bookingId: number): void {
    this.hotelBookedService.get(bookingId).subscribe({
      next: (booking: Book) => {
          if(booking.status === 'reserved' || booking.status === 'checked-in') {
            alert(`Data pemesanan tidak dapat di hapus karena tamu ${booking.reservee.name} belum checkout.`)
          } else {
            this.hotelBookedService.remove(bookingId).subscribe();
          }

      }
    })

  }
}
