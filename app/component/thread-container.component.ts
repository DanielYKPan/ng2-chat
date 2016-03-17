/**
 * thread-container.component
 */

import {Component, OnInit} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {ThreadService} from '../service/thread.service';
import {ChatThreadComponent} from './chat-thread.component';

@Component({
    selector: 'thread-container',
    directives: [ChatThreadComponent],
    template: `
    <div class="row">
        <div class="conversation-wrap">
            <chat-thread
                 *ngFor="#thread of threads | async"
                 [thread]="thread">
            </chat-thread>
        </div>
    </div>
    `
})

export class ThreadContainerComponent implements OnInit{
    private threads: Observable<any>;

    constructor(private _threadService:ThreadService){
    }

    ngOnInit() {
        this.threads = this._threadService.orderThreads;
    }
}
