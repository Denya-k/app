import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FormComponent} from "./components/form/form/form.component";
import {StopwatchComponent} from "./components/stopwatch/stopwatch.component";

const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'stopwatch', component: StopwatchComponent },
  { path: '', redirectTo: '/form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
