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
      const sessionBooking: string = this.storage.getItem('booking') as string
      try {
        if(!sessionBooking){
          const bookinglist: Book[] = []
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

  get(bookingId: number): Observable<Book> {
    return new Observable<Book>((observer: Observer<Book>) => {
      try {
        const sessionStorage: string = this.storage.getItem('booking') as string
        if (sessionStorage){
          const bookings: Book[] = JSON.parse(sessionStorage);
          const book: Book = bookings.find(t => {
            t.id === bookingId
            return t
          }) as Book
          observer.next(book)
        }
      } catch (err: any) {
        observer.error(err.message)
      }

    })
  }

  save(booking: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try {
        if (booking.id) {
          this.bookings = this.bookings.map((t) => {
            if (t.id === booking.id) t = booking;
            return t;
          });
        } else {
          booking.status = 'reserved'
          booking.id = this.bookings.length + 1;
          this.bookings.push(booking)
          observer.next();
        }
        this.storage.setItem('booking', JSON.stringify(this.bookings))
        console.log('saveService',this.bookings);
      } catch (err: any) {
        observer.error(err.message);
      }
    })
  }

  checkIn(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try{
        this.bookings.map(t =>{
          if(t.id === bookingId) {
            console.log('checkin', t.status);
            t.status = 'checked-in'
          }
          this.storage.setItem('booking', JSON.stringify(this.bookings))
          observer.next();
        })
      } catch (err:any){
        observer.error(err.message)
      }
    })
  };

  checkOut(bookingId: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try{
        this.bookings.map(t =>{
          if(t.id === bookingId)
          t.status = 'checked-out'
        })
        this.storage.setItem('booking', JSON.stringify(this.bookings))
        observer.next();
      } catch (err: any){
        observer.error(err.message)
      }
    })
  };

  remove(booked: number): Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      try{
        for(let index = 0; index < this.bookings.length; index++){
          if(this.bookings[index].id === booked){
            this.bookings.splice(index, 1)
          }
        }
        this.storage.setItem('booking', JSON.stringify(this.bookings))
        observer.next();
        } catch (err: any) {
          observer.error(err.message)
        }
    }
  )}

}
