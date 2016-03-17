/**
 * chat-message.component
 */

import {Component, Input, OnInit} from "angular2/core";
import {User, Message} from '../model';
import {FromNowPipe} from '../util/from-now.pipe';
import {UserService} from "../service/user.service";

@Component({
    selector: 'chat-message',
    pipes: [FromNowPipe],
    template: `
    <div class="msg-container"
       [ngClass]="{'base-sent': !incoming, 'base-receive': incoming}">

        <div class="avatar"
             *ngIf="!_inComing">
            <img src="./public/assets/image/avatar/{{message.author.avatarSrc}}">
        </div>

        <div class="messages"
          [ngClass]="{'msg-sent': !incoming, 'msg-receive': incoming}">
            <p>{{message.text}}</p>
            <time>{{message.sender}} • {{message.sentAt | FromNow}}</time>
        </div>

        <div class="avatar"
             *ngIf="_inComing">
            <img src="./public/assets/image/avatar/{{message.author.avatarSrc}}">
        </div>
    </div>
    `
})

export class ChatMessageComponent implements OnInit{
    @Input() message:Message;

    private _currentUser:User;
    private _inComing:boolean;

    constructor(private _userService:UserService){}

    ngOnInit() {
        this._userService.currentUser.subscribe((currentUser:User) => {
            this._currentUser = currentUser;
            if (this.message.author && currentUser) {
                this._inComing = this.message.author.id !== currentUser.id;
            }
        })
    }
}
