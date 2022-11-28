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
  // onCheckIn(bookingId: number): void {}
  // onCheckOut(bookingId: number): void {}

  onDeleteReservation(bookingId: Book): void{
    this.hotelBookedService.remove(bookingId).subscribe({
      next: (bookings: Book) => {
        this.booking = bookings;
      }
    })
  }
}
