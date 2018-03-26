import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { userServiceInjectables } from './user/users.service';
import { threadsServiceInjectables } from './thread/threads.service';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatThreadsComponent,
    ChatThreadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [userServiceInjectables, threadsServiceInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
