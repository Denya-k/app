import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './components/form/form/form.component';
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { DatepickerComponent } from './components/form/datepicker/datepicker.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {TranslateModule} from "@ngx-translate/core";
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    StopwatchComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    DatepickerComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    TranslateService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
