import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { userServiceInjectables } from './user/users.service';
import { threadsServiceInjectables } from './thread/threads.service';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatPageComponent } from './chat-page/chat-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatThreadsComponent,
    ChatThreadComponent,
    ChatWindowComponent,
    ChatMessageComponent,
    ChatNavBarComponent,
    ChatPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [userServiceInjectables, threadsServiceInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
