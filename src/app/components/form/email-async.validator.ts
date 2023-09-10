import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import {FormService} from "./form.service";

export function emailAsyncValidator(emailService: FormService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    return of(email).pipe(
      debounceTime(300),
      switchMap((value) => {
        return emailService.checkEmailExists(value);
      }),
      map((exists) => {
        if (exists) {
          return { emailExists: true };
        } else {
          return null;
        }
      }),
      catchError((err) => {
        console.log("err", err);
        return of(null);
      })
    );
  };
}
