import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private httpClient: HttpClient) {

  }

  onSubmit() {
    this.httpClient.post(environment.api, {
      "full_name": "etay",
      "email": "et.std8@gmail.com",
      "phone": "+9720526997001",
      "address": "harimon 19",
      "dob": "1980-10-21",
      "comment": "none",
      "animals": ["cat"],
      "residence": "House_with_yard"
    }).subscribe(res => {
      console.log('yeah!')
    }, err => {
      console.error(err)
    })
  }

}
