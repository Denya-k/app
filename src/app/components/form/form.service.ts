import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  checkEmailExists(email: string): Observable<boolean> {
    return of(email === 'test@test.test');
  }

}
