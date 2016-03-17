/**
 * thread.service
 */

import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';
import {Thread, Message} from '../model';
import {MessageService} from '../service/message.service';

@Injectable()
export class ThreadService {

    private _threads:Observable<{[key: string]: Thread}>;

    private _orderedThreads:Observable<Thread[]>;

    private _currentThread:Subject<Thread> = new BehaviorSubject<Thread>(new Thread());

    private _currentThreadMessages:Observable<Message[]>;

    constructor(private _messageService:MessageService) {

        this._threads = this._messageService.messages
            .map((messages:Message[])=> {
                let threads:{[key:string]: Thread} = {};

                messages.map((message:Message)=> {
                    threads[message.thread.id] = threads[message.thread.id] || message.thread;

                    if (!threads[message.thread.id].lastMessage ||
                        threads[message.thread.id].lastMessage.sentAt < message.sentAt) {
                        threads[message.thread.id].lastMessage = message;
                    }
                });
                return threads;
            });

        this._orderedThreads = this._threads
            .map((threadGroups: { [key: string]: Thread }) => {

                let threads: Thread[] = _.values(threadGroups);
                return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
            });

        this._currentThreadMessages = this._currentThread
            .combineLatest(this._messageService.messages, (currentThread:Thread, messages:Message[])=> {
                if (currentThread && messages.length > 0) {
                    return _.chain(messages)
                        .filter((message:Message)=> (message.thread.id === currentThread.id))
                        .map((message:Message)=> {
                            message.isRead = true;
                            return message;
                        })
                        .value();
                } else {
                    return [];
                }
            });

        this._currentThread.subscribe(this._messageService.markThreadAsRead);
    }

    setCurrentThread(thread:Thread):void {
        this._currentThread.next(thread);
    }

    get orderThreads():Observable<Thread[]> {
        return this._orderedThreads;
    }

    get currentThread():Observable<Thread> {
        return this._currentThread;
    }

    get currentThreadMessages():Observable<Message[]> {
        return this._currentThreadMessages;
    }

}
