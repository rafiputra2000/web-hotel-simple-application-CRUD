import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BookedListComponent } from "./booking/booked-list/booked-list.component";
import { FormBookedComponent } from "./booking/form-booked/form-booked.component";

const routes: Routes = [
    {
      path: 'form-booking',
      component: FormBookedComponent
    },
    {
      path: 'booked-list',
      component: BookedListComponent
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }
