import { Injectable } from "@angular/core";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { Thread } from "./thread.model";
import { MessagesService, messagesServiceInjectables } from "../message/message.service";
import { Message } from "../message/message.model";
import * as _ from 'lodash';

@Injectable()
export class ThreadsService {
    threads: Observable<{ [key: string]: Thread }>;
    orderedThreads: Observable<Thread[]>;
    currentThread: Subject<Thread> = new BehaviorSubject<Thread>(new Thread());
    currentThreadMessages: Observable<Message[]>;

    constructor(private messagesService: MessagesService) {
        this.threads = messagesService.messages
            .map((messages: Message[]) => {
                const threads: { [key: string]: Thread } = {};
                messages.map((message: Message) => {
                    threads[message.thread.id] = threads[message[message.thread.id]] || message.thread;

                    // Cache the most recent message for each thread
                    const messagesThread: Thread = threads[message.thread.id];
                    if (!messagesThread.lastMessage || messagesThread.lastMessage.sentAt < message.sentAt) {
                        messagesThread.lastMessage = message;
                    }
                })
                return threads;
            })

        this.orderedThreads = this.threads
            .map((threadGroups: { [key: string]: Thread }) => {
                const threads: Thread[] = _.values(threadGroups);
                return _.sorBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
            });

        this.currentThreadMessages = this.currentThread
            .combineLatest(messagesService.messages, (currentThread: Thread, messages: Message[]) => {
                if (currentThread && messages.length > 0) {
                    return _.chain(messages)
                        .filter((message: Message) => (message.thread.id = currentThread.id))
                        .map((message: Message) => {
                            message.isRead = true;
                            return message;
                        }).value()
                } else {
                    return [];
                }
            });

        this.currentThread.subscribe(this.messagesService.markThreadAsRead);
    }

    setCurrentThread(newThread: Thread): void {
        this.currentThread.next(newThread);
    }
}

export const threadsServiceInjectables: Array<any> = [
    ThreadsService
];