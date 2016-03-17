/**
 * chat-nav.component
 */

import {Component, OnInit} from "angular2/core";
import {MessageService} from '../service/message.service';
import {ThreadService} from '../service/thread.service';
import {Message, Thread} from '../model';

@Component({
    selector: 'chat-nav',
    template: `
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="https://ng-book.com/2">
                  <img src="./public/assets/image/logo/ng-book-2-minibook.png"/>
                   ng-book 2
                </a>
            </div>
            <p class="navbar-text navbar-right">
                <button class="btn btn-primary" type="button">
                  Messages <span class="badge">{{_unreadMessageCount}}</span>
                </button>
            </p>
        </div>
    </nav>
    `
})

export class ChatNavComponent implements OnInit{

    private _unreadMessageCount:number;

    constructor(private _messageService:MessageService,
                private _threadService:ThreadService){
    }

    ngOnInit():void {
        this._messageService.messages
            .combineLatest(
                this._threadService.currentThread,
                (messages:Message[], currentThread:Thread) => [currentThread, messages])
            .subscribe(([currentThread, messages] : [Thread, Message[]])=> {
                this._unreadMessageCount = _.reduce(messages, (sum:number, message:Message)=>{
                    let messageIsInCurrentThread: boolean = message.thread && currentThread && (message.thread.id === currentThread.id);
                    if(message && !messageIsInCurrentThread && !message.isRead){
                        sum += 1;
                    }
                    return sum;
                }, 0);
            });
    }
}
