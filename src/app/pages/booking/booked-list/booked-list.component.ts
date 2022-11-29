import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly hotelBookedService :HotelBookedService) {}

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


  // onReserve(booking: Book): void {}

  //Percobaan GetById still work
  onCheckIn(bookingId: number): void {
    this.bookings.map((t) => {
      if(t.id === bookingId){
        if(t.status === 'checked-out'){
          alert(`Tamu ${t.reservee.name} sudah melakukan ${t.status} tidak bisa melakukan checked-in`)
        } else {
          this.hotelBookedService.checkIn(bookingId).subscribe()
          alert(`Tamu ${t.reservee.name} sudah check-in pada kamar ${t.roomNumber}.`)
        }
      }
    })
  }

  //Percobaan GetById still fail
  // onCheckIn(bookingId: number): void {
  //   this.hotelBookedService.get(bookingId).subscribe({
  //     next: (booking: Book) => {
  //       if(booking.status === 'checked-out'){
  //         alert(`Tamu ${booking.reservee.name} sudah melakukan ${booking.status} tidak bisa melakukan checked-out`)
  //       } else {
  //         console.log("onCheckIn",booking.status);
  //         this.hotelBookedService.checkIn(bookingId).subscribe()
  //         alert(`Tamu ${booking.reservee.name} sudah check-in pada kamar ${booking.roomNumber}.`)
  //       }
  //     }
  //   })
  // }

  onCheckOut(bookingId: number): void {
    this.hotelBookedService.checkOut(bookingId).subscribe();
    this.bookings.map((t) => {
      if(t.id === bookingId){
        alert(`Tamu ${t.reservee.name} sudah check-out pada kamar ${t.roomNumber}.`)
      }
    })
  }

  onDeleteReservation(bookingId: Book): void{
    this.hotelBookedService.remove(bookingId).subscribe({
      next: (bookings: Book) => {
        this.booking = bookings;
      }
    })
  }
}
