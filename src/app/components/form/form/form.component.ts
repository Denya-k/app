import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormService} from "../form.service";
import { emailAsyncValidator } from '../email-async.validator';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  public formSubmitted = false;
  public form: FormGroup;
  public frameworks: Array<string> = ['angular', 'react', 'vue'];
  public frameworkVersions: { [key: string]: string[] } = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      framework: ['', Validators.required],
      frameworkVersion: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        [emailAsyncValidator(this.formService)]
      ],
      hobby: this.fb.array([this.createHobbyGroup()], Validators.required),
    });

  }

  ngOnInit() {
  }

  addHobby() {
    const hobbyGroup = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
    });
    this.hobby.push(hobbyGroup);
  }

  removeHobby(index: number) {
    if (this.canRemoveHobby()) {
      this.hobby.removeAt(index);
    }
  }

  get hobby() {
    return this.form.get('hobby') as FormArray;
  }

  onSubmit() {
    this.formSubmitted = true;
    const formData = { ...this.form.value };
    formData.hobby = this.hobby.value;
    if (this.form.valid) {
      // Тут логіка отправки форми на сервер
      console.log("onSubmit", this.form.value);
    }
  }

  createHobbyGroup() {
    return this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }

  canRemoveHobby() {
    return this.hobby.length > 1;
  }

}
