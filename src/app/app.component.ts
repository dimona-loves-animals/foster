import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {PhoneNumberValidator} from "./phone-number-validator";
import {environment} from "../environments/environment";
import {PhoneNumberFormat, PhoneNumberUtil} from 'google-libphonenumber';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  fosterForm = this.fb.group({
    animals: this.fb.array([this.fb.group({
      dog: [false],
      cat: [false],
    })]),
    foster_at_home: [false],
    home_with_garden: [false],
    can_pay_food: [false],
    can_pay_medicine: [false],
    can_handle_sick: [false],
    can_handle_bad_behaviour: [false],
    can_handle_aggressive: [false],
    full_name: ['', Validators.required],
    dob: [null, Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', [Validators.required, PhoneNumberValidator('IL')]],
    call_at_night: [false],
    comment: [''],
    agree_to_no_time_limit: [false, Validators.requiredTrue],
    agree_to_no_transfer: [false, Validators.requiredTrue],
    agree_to_pay: [false, Validators.requiredTrue],
    agree_to_week: [false, Validators.requiredTrue],
    agree_to_take: [false, Validators.requiredTrue],
    agree_to_photo: [false, Validators.requiredTrue],
    agree_to_bring: [false, Validators.requiredTrue],
    accept_terms: [false, Validators.requiredTrue],
  });

  foster_at_home = this.fosterForm.controls['foster_at_home'];
  home_with_garden = this.fosterForm.controls['home_with_garden'];
  can_pay_food = this.fosterForm.controls['can_pay_food'];
  can_pay_medicine = this.fosterForm.controls['can_pay_medicine'];
  can_handle_sick = this.fosterForm.controls['can_handle_sick'];
  can_handle_bad_behaviour = this.fosterForm.controls['can_handle_bad_behaviour'];
  can_handle_aggressive = this.fosterForm.controls['can_handle_aggressive'];
  full_name = this.fosterForm.controls['full_name'];
  dob = this.fosterForm.controls['dob'];
  address = this.fosterForm.controls['address'];
  email = this.fosterForm.controls['email'];
  phone = this.fosterForm.controls['phone'];
  agree_to_no_time_limit = this.fosterForm.controls['agree_to_no_time_limit'];
  agree_to_no_transfer = this.fosterForm.controls['agree_to_no_transfer'];
  agree_to_pay = this.fosterForm.controls['agree_to_pay'];
  agree_to_week = this.fosterForm.controls['agree_to_week'];
  agree_to_take = this.fosterForm.controls['agree_to_take'];
  agree_to_photo = this.fosterForm.controls['agree_to_photo'];
  agree_to_bring = this.fosterForm.controls['agree_to_bring'];
  accept_terms = this.fosterForm.controls['accept_terms'];

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {

  }

  onSubmit() {

    if (this.fosterForm.invalid) {
      this.fosterForm.markAsDirty();
      return
    }

    const formValues = this.fosterForm.value;
    const phoneUtil = PhoneNumberUtil.getInstance();
    const number = phoneUtil.parseAndKeepRawInput(formValues.phone, 'IL');
    formValues.phone = phoneUtil.format(number, PhoneNumberFormat.E164);

    formValues.animals = ["cat"];
    formValues.residence = "House_with_yard";

    console.log(formValues);

    this.httpClient.post(environment.api, formValues).subscribe(res => {
      console.log('yeah!')
    }, err => {
      console.error(err)
    })
  }

}
