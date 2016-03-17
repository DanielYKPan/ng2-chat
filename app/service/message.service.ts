/**
 * message.service
 */

import {Injectable} from 'angular2/core';
import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {User, Message, Thread} from '../model';

let initialMessage:Message[] = [];

interface IMessageOperation extends Function {
    (messages:Message[]) : Message[];
}

@Injectable()
export class MessageService {

    newMessages:Subject<Message> = new Subject<Message>();

    messages:Observable<Message[]>;

    updates:Subject<any> = new Subject<any>();

    creates:Subject<Message> = new Subject<Message>();

    private _markThreadAsRead:Subject<any> = new Subject<any>();

    constructor() {
        this.messages = this.updates
            .scan((messages:Message[],
                   operation:IMessageOperation) => {
                return operation(messages);
            }, initialMessage)
            .publishReplay(1)
            .refCount();

        this.creates
            .map((message:Message):IMessageOperation => {
                return (messages:Message[]) => {
                    return messages.concat(message);
                };
            })
            .subscribe(this.updates);

        this.newMessages.subscribe(this.creates);

        this._markThreadAsRead
            .map((thread:Thread):IMessageOperation=> {
                return (messages:Message[]) => {
                    return messages.map((message:Message) => {
                        if (thread.id === message.thread.id) {
                            message.isRead = true;
                        }
                        return message;
                    })
                }
            }).subscribe(this.updates);
    }

    addNewMessage(message:Message) {
        this.newMessages.next(message);
    }

    messageForThreadUser(thread:Thread, user:User):Observable<Message> {
        return this.newMessages.filter((message:Message) => {
            return (message.thread.id === thread.id) && (message.author.id !== user.id)
        })
    }

    get markThreadAsRead():Subject<any> {
        return this._markThreadAsRead;
    }
}
