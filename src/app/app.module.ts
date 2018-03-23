import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { userServiceInjectables } from './user/users.service';
import { threadsServiceInjectables } from './thread/threads.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [userServiceInjectables, threadsServiceInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
