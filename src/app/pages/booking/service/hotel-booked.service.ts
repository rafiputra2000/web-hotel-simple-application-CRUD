import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Book } from '../model/hotel-booked.model';

@Injectable({
  providedIn: 'root'
})
export class HotelBookedService implements OnInit{

  bookings: Book[] = []
  storage: Storage = sessionStorage

  constructor() { }

  ngOnInit(): void {

  }

  list(): Observable<Book[]> {
    return new Observable<Book[]>((observer: Observer<Book[]>) => {
      const sessionBooking = this.storage.getItem('booking') as string
      try {
        if(!sessionBooking){
          const bookinglist: Book[] = [
            {
              id: 1,
              status: "reserved",
              roomNumber: '10',
              duration: 1, // dalam satuan malam, jika 2 berarti 2 malam menginap.
              guestCount: 2, // jumlah tamu yang menginap dalam 1 kamar
              reservee:
                {
                  id: 1,
                  name: 'otto',
                  email: 'otto@gmail.com',
                  phone: '0987637638'
                }

          },
          {
            id: 2,
            status: "reserved",
            roomNumber: '10',
            duration: 1, // dalam satuan malam, jika 2 berarti 2 malam menginap.
            guestCount: 2, // jumlah tamu yang menginap dalam 1 kamar
            reservee:
              {
                id: 1,
                name: 'andika',
                email: 'andika@gmail.com',
                phone: '0987637638'
              }

        }
          ]
          this.bookings = bookinglist
        } else {
          this.bookings = JSON.parse(sessionBooking)
        }
        this.storage.setItem('booking', JSON.stringify(this.bookings))
        observer.next(this.bookings)
      } catch (err: any){
        observer.error(err.message)
      }
    })
  }

  // get(bookingId: number): Observable<Book> {}

  save(booking: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>)=> {
      try {
        if (booking.id) {
          this.bookings = this.bookings.map((t) => {
            if (t.id === booking.id) t = booking;
            return t;
          });
        } else {
          booking.id = this.bookings.length + 1;
          this.bookings.push(booking)
          observer.next();
        }
        this.storage.setItem('booking', JSON.stringify(this.bookings))
      } catch (err: any) {
        observer.error(err.message);
      }
    })
  }

  // checkIn(bookingId: number): Observable<void> {};
  // checkOut(bookingId: number): Observable<void> {};

  remove(booked: Book): Observable<Book> {
    return new Observable<Book>((observer: Observer<Book>) => {
      try{
        for(let index = 0; index < this.bookings.length; index++){
          if(this.bookings[index].id === booked.id){
            console.log("index if", index);
            this.bookings.splice(index, 1)
          }
        }
        this.storage.setItem('booking', JSON.stringify(this.bookings))
        observer.next(booked);
        } catch (err: any) {
          observer.error(err.message)
        }
    }
  )}

}
