import { Subject } from "rxjs/Subject";
import { Message } from "./message.model";
import { Observable } from "rxjs";
import { Thread } from "../thread/thread.model";
import { User } from "../user/user.model";

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
    (messages: Message[]): Message[]
}

export class MessagesService {
    newMessages: Subject<Message> = new Subject<Message>();
    messages: Observable<Message[]>;
    updates: Subject<any> = new Subject<any>();

    create: Subject<Message> = new Subject<Message>();

    constructor(){
        this.messages = this.updates
        .scan((messages: Message[], operation: IMessagesOperation) => {
            return operation(messages);
        }, initialMessages)
        .publishReplay(1)
        .refCount()

        this.create
        .map(function(message: Message): IMessagesOperation {
            return (messages: Message[]) => {
                return messages.concat(message);
            };
        })
        .subscribe(this.updates)
    }

    addMessage(newMessage: Message): void {
        this.updates.next((messages: Message[]) => {
            return messages.concat(newMessage);
        })
    }

    messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
        return this.newMessages
        .filter((message: Message) => {
            return (message.thread.id === thread.id) && 
            (message.author.id != user.id)
        })
    }
}