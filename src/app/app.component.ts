import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  FormArray,
  FormBuilder,
  FormControl,
  ValidatorFn,
  Validators
} from "@angular/forms";
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
    animals: this.fb.array([], AppComponent.minSelectedCheckboxes()),
    about_home: [''],
    foster_at_home: [false],
    home_with_garden: [false],
    have_car: [false],
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

  animals = this.fosterForm.get('animals');
  about_home = this.fosterForm.controls['about_home'];
  foster_at_home = this.fosterForm.controls['foster_at_home'];
  home_with_garden = this.fosterForm.controls['home_with_garden'];
  have_car = this.fosterForm.controls['have_car'];
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
  call_at_night = this.fosterForm.controls['call_at_night'];
  comment = this.fosterForm.controls['comment'];
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

  static minSelectedCheckboxes(): ValidatorFn {
    return (formArray: FormArray) => {

      const selectedCount = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + 1 : prev, 0);

      return selectedCount >= 1 ? null : {notSelected: true};
    };
  }

  onSubmit() {
    if (this.fosterForm.invalid) {
      for (let control in this.fosterForm.controls) {
        this.fosterForm.controls[control].markAsTouched();
      }
      return
    }

    const formValues = this.fosterForm.value;
    const phoneUtil = PhoneNumberUtil.getInstance();
    const number = phoneUtil.parseAndKeepRawInput(formValues.phone, 'IL');
    formValues.phone = phoneUtil.format(number, PhoneNumberFormat.E164);

    this.httpClient.post(environment.api, formValues).subscribe(_ => {
    }, err => {
      console.error(err)
    })
  }

  toggleAnimal(e, animal) {
    const checked = e.target.checked;
    const animals: FormArray = <FormArray>this.fosterForm.controls['animals'];
    if (checked) {
      animals.push(new FormControl(animal));
    } else {
      const at = animals.controls.findIndex(control =>
        control.value === animal
      );
      animals.removeAt(at);
    }
    animals.markAsTouched();
  }

}
