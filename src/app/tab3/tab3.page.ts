import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from 'src/interfaces/config.interface';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  config: Config;
  submitted = false;
  state = false;

  constructor(
    private api: ContactsService,
  ) {}

  
  
  ngOnInit(): void {
    this.api.getConfig().subscribe(data => {
      console.log("datos",data[0]);
      if ( data[0] ){
        this.config = data[0];
      } else {
        const dt = {}
        this.api.newConfig(dt).subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
        })
      } 
    })  
  }

  newConfig() {
    if (this.state) {
      this.state = false;
    } else {
      this.state = true;
    } 
  }
  
  saveConfig(): void {
    const data = {
      name: this.config.name,
      phone: `+593${this.config.phone}`,
      message: this.config.message
    }

    this.api.editConfig(data).subscribe(response =>{
      console.log(response);
      this.submitted = true;
    },
    error => {
      console.log(error);
    })
    this.newConfig();
  }
}
