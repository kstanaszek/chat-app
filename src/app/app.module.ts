import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { userServiceInjectables } from './user/users.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [userServiceInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
