import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    {
      path: '',
      redirectTo: '/form-booking',
      pathMatch: "full"
    }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
