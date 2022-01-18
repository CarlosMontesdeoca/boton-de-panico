import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
// import { Router } from '@angular/router';

// import { ListContacts } from 'src/interfaces/listcontacts.interface';
// import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  contacts = [];
  contact = {
    name: '',
    phone: ''
  };
  submitted = false;
  state = false;
  
  constructor(
    private api: ContactsService
  ) {}

  ngOnInit(): void {
    this.getContacts(); 
  }

  getContacts(): void {
    this.api.getContacts().subscribe(data => {
      console.log(data);
      this.contacts = data;
    })  
  }

  newContact() {
    if (this.state) {
      this.state = false;
    } else {
      this.state = true;
    } 
  }

  saveContact(): void {
    const data = {
      name: this.contact.name,
      phone: `+593${this.contact.phone}`,
    };

    this.api.newContact(data).subscribe(response => {
      console.log(response);
      this.submitted = true;
    },
    error => {
      console.log(error);
    })
    this.newContact();
    this.getContacts();
    this.clearContact();
  }

  clearContact(): void{
    this.submitted = false;
    this.contact = {
      name: '',
      phone: ''
    };
  }

  deleteContact(id): void {
    console.log(id);
      this.api.deleteContact(id).subscribe( response => {
        console.log(response);
      },
      error => {
        console.log(error);
      })
      this.getContacts();
    
    
  }

}
