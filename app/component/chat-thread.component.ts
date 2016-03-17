/**
 * chat-thread.component
 */

import {Component, Input, OnInit} from "angular2/core";
import {ThreadService} from '../service/thread.service';
import {Thread} from '../model';

@Component({
    selector: 'chat-thread',
    template: `
    <div class="media conversation">
        <div class="pull-left">
            <img class="media-object avatar"
               src="./public/assets/image/avatar/{{thread.avatarSrc}}">
        </div>
        <div class="media-body">
            <h5 class="media-heading contact-name">{{thread.name}}
            <span *ngIf="_selected">&bull;</span>
            </h5>
            <small class="message-preview">{{thread.lastMessage.text}}</small>
        </div>
        <a (click)="clicked($event)" class="div-link">Select</a>
    </div>
    `
})

export class ChatThreadComponent implements OnInit {
    @Input() thread:Thread;

    private _selected:boolean = false;

    ngOnInit() {
        this._threadService.currentThread.subscribe((currentThread:Thread):void=> {
            this._selected = currentThread && this.thread && (currentThread.id === this.thread.id);
        });
    }

    constructor(private _threadService:ThreadService) {
    }


    clicked(event:any):void {
        this._threadService.setCurrentThread(this.thread);
        event.preventDefault();
    }
}
