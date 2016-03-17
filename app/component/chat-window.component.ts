/**
 * chat-window.component
 */

import {Component, OnInit, ElementRef} from "angular2/core";
import {Observable} from 'rxjs/Observable';
import {UserService} from '../service/user.service';
import {MessageService} from '../service/message.service';
import {ThreadService} from '../service/thread.service';
import {User, Message, Thread} from '../model';
import {ChatMessageComponent} from '../component/chat-message.component';

@Component({
    selector: 'chat-window',
    directives: [ChatMessageComponent],
    template: `
    <div class="chat-window-container">
        <div class="chat-window">
            <div class="panel-container">
                <div class="panel panel-default">

                    <div class="panel-heading top-bar">
                        <div class="panel-title-container">
                            <h3 class="panel-title">
                                <span class="glyphicon glyphicon-comment"></span>
                                Chat - {{_currentThread.name}}
                            </h3>
                        </div>
                        <div class="panel-buttons-container">
                        <!-- you could put minimize or close buttons here -->
                        </div>
                    </div>

                    <div class="panel-body msg-container-base">
                        <chat-message
                        *ngFor="#message of _messages | async"
                        [message]="message">
                        </chat-message>
                    </div>

                    <div class="panel-footer">
                        <div class="input-group">
                            <input type="text"
                            class="chat-input"
                            placeholder="Write your message here..."
                            (keydown.enter)="onEnter($event)"
                            [(ngModel)]="_draftMessage.text" />
                            <span class="input-group-btn">
                                <button class="btn-chat" (click)="onEnter($event)">Send</button>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    `
})

export class ChatWindowComponent implements OnInit {

    private _messages:Observable<Message[]>;
    private _draftMessage:Message;
    private _currentThread:Thread;
    private _currentUser:User;

    constructor(private _userService:UserService,
                private _messageService:MessageService,
                private _threadService:ThreadService,
                private _el:ElementRef) {
    }

    ngOnInit() {
        this._messages = this._threadService.currentThreadMessages;

        this._draftMessage = new Message();

        this._threadService.currentThread.subscribe((currentThread:Thread)=> {
            this._currentThread = currentThread;
        });

        this._userService.currentUser.subscribe((currentUser:User)=> {
            this._currentUser = currentUser;
        });

        this._messageService.messages.subscribe((messages:Message[])=>{
            setTimeout(()=>{
                this._scrollBottom();
            }, 0);
        });
    }

    onEnter(event:any):void {
        this._sendMessage();
        event.preventDefault();
    }

    private _sendMessage():void {
        let newMessage:Message = this._draftMessage;
        newMessage.author = this._currentUser;
        newMessage.thread = this._currentThread;
        newMessage.isRead = true;
        this._messageService.addNewMessage(newMessage);
        this._draftMessage = new Message();
    }

    private _scrollBottom():void {
        let scrollPane: any = this._el
            .nativeElement.querySelector('.msg-container-base');
        scrollPane.scrollTop = scrollPane.scrollHeight;
    }

}
