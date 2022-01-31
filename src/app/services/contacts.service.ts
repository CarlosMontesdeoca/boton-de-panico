import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

import { ListContacts } from "../../interfaces/listcontacts.interface";
import { Config } from 'src/interfaces/config.interface';

const url = 'https://server-panic-button.herokuapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  

  constructor(
    private http: HttpClient
  ) {}

  getContacts(): Observable <any> {
    let direction = `${url}contacts`;
    return this.http.get(direction);
  }

  newContact(data): Observable <any> {
    let direction = `${url}contacts`;
    return this.http.post(direction, data);
  }
  
  deleteContact(id): Observable <any> {
    let direction = `${url}contacts/${id}`;
    return this.http.delete(direction);
  }

  getConfig(): Observable <any> {
    let direction =`${url}config`;
    return this.http.get(direction);
  }

  newConfig(data): Observable <any> {
    let direction = `${url}config`;
    return this.http.post(direction, data);
  }

  editConfig(data): Observable <any> {
    let direction = `${url}config/`;
    return this.http.put(direction, data);
  }

  newSMS(data): Observable <any> {
    let direction = `${url}sms/`;
    return this.http.post(direction, data);
  }
}
