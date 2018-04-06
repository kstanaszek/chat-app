import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../message/message.service';
import { ThreadsService } from '../thread/threads.service';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';
import * as _ from 'lodash';


@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent implements OnInit {
  unreadMessagesCount: number;
  constructor(public messagesService: MessagesService, public threadService: ThreadsService) { }

  ngOnInit() {
    this.messagesService.messages.combineLatest(
      this.threadService.currentThread, (messages: Message[], currentThread: Thread) => [currentThread, messages]
    ).subscribe(([currentThread, messages]: [Thread, Message[]]) => {
      this.unreadMessagesCount = _.reduce(
        messages,
        (sum: number, m: Message) => {
          const messageIsInCurrentThread: boolean = m.thread && currentThread && (currentThread.id === m.thread.id);
          if (m && !m.isRead && !messageIsInCurrentThread) {
            sum = sum + 1;
          }
          return sum;
        }, 0);
    }

    )
  }

}
