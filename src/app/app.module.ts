import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'; // leer datos de la api rest
// import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ContactsService } from '../app/services/contacts.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule // module
  ],
  providers: [ 
    // NativeGeocoder,
    Geolocation,
    ContactsService,    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy } 
  ],
  bootstrap: [AppComponent],  
})
export class AppModule {}