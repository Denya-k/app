import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {DatePipe} from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [DatePipe],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule, DatePipe, CommonModule],
})
export class DatepickerComponent implements OnChanges, OnInit {
  @Input() form: FormGroup | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['form'] && this.form) {
      this.form.addControl('dateOfBirth', this.fb.control(null, Validators.required));
    }
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    if (event.value && this.form) {
      const dateOfBirthControl = this.form.get('dateOfBirth');
      if (dateOfBirthControl) {
        const formattedDate = this.datePipe.transform(event.value, 'dd-MM-yyyy');
        dateOfBirthControl.setValue(formattedDate);
        dateOfBirthControl.markAsDirty();
        dateOfBirthControl.markAsTouched();
      }
    }
  }

  onInputBlur() {
    if (this.form) {
      const dateOfBirthControl = this.form.get('dateOfBirth');
      if (dateOfBirthControl) {
        dateOfBirthControl.markAsTouched();
      }
    }
  }
}
