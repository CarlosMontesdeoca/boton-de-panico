import { Component, OnInit } from '@angular/core';
import { ALARMAS } from 'src/data/data.alarma';
import { Alarma } from 'src/interfaces/alarma.interface';
import { NavController } from '@ionic/angular';
import { ContactsService } from '../services/contacts.service';
// import { LocationService } from '../services/location.service';
import { Config } from 'src/interfaces/config.interface';

import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit {

  lat: any; 
  long: any;

  contact: any;
  from: any;
  to: any;
  user: any;
  text: any;
  cord: any;

  contacts = [];
  message = {};
  listMessages = [];

  alarmas: Alarma[] = []

  constructor(
    private api: ContactsService,
    private navCtrl: NavController,
    private geolocation: Geolocation,
  ) {
    this.alarmas = ALARMAS.slice(0);
  }

  options = {
    timeout: 12000, 
    maximumAge: 3600,
    enableHighAccuracy: true, 
  };

  geoInformation() {
    this.geolocation.getCurrentPosition().then((data) => {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      this.cord = "https://www.google.com.ec/maps/@" + this.lat + "," + this.long + ",17z?hl=es"
     }).catch((error) => {
       alert(error);
     });
     return this.cord
  }

  ngOnInit(): void {
    this.api.getConfig().subscribe(data => {
      console.log("datos",data[0]);
      if ( !data[0] ){
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

  playAlarm (alarma: Alarma) {

    let audio = new Audio();

    audio.src = alarma.audio;
    alarma.reproduciendo = true;
    audio.load();
    audio.play();

    setTimeout(() => {
      alarma.reproduciendo = false;
    }, alarma.duracion * 100000);

    // () => this.geoInformation()
  }

  getMessages () {
    this.geoInformation();
    this.api.getConfig().subscribe(data => {
      this.user = data[0].name;
      this.text = data[0].message;
      this.to = data[0].phone;
    })

    this.api.getContacts().subscribe(data => {
      this.contacts = data;
    })

    for ( let i in this.contacts) {
      this.from = this.contacts[i].phone
      this.message = {
        body: `${this.text}. \n esta es mi ubicacion ${this.cord}`,
        from: this.from,
        to: this.to
      }
      this.api.newSMS(this.message).subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      })
      this.listMessages.push(this.message)
    }
    console.log("mesajes", this.listMessages);

  }

  goToInfo() {
    this.navCtrl.navigateForward( '/info' );
  }
}

