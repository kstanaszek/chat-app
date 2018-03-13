import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { userServiceInjectables } from './user/users.service';


@NgModule({
  declarations: [
    AppComponent,
    userServiceInjectables
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
