/**
 * app.component
 */

import {Component, OnInit} from 'angular2/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {ThreadContainerComponent} from './component/thread-container.component';
import {ChatNavComponent} from './component/chat-nav.component';
import {ChatWindowComponent} from './component/chat-window.component';
import {MessageService} from '../app/service/message.service';
import {ThreadService} from '../app/service/thread.service';
import {UserService} from '../app/service/user.service';
import {ChatExampleData} from './chatExampleData';

@Component({
    selector: 'chat-app',
    template: `
    <div>
        <chat-nav></chat-nav>
        <div class="container">
            <thread-container></thread-container>
            <chat-window></chat-window>
        </div>
    </div>
    `,
    providers: [MessageService, ThreadService, UserService],
    directives: [ChatNavComponent, ThreadContainerComponent, ChatWindowComponent]
})
export class AppComponent implements OnInit {

    messages:Observable<any>;

    constructor(private _userService:UserService,
                private _messageService:MessageService,
                private _threadService:ThreadService) {
    }

    ngOnInit() {
        //this._messageService.addNewMessage("Pan is good");
        //this.messages = this._messageService.messages;
        ChatExampleData.init(this._userService, this._messageService, this._threadService);
    }

    add() {
        //let text1= "good";
        //this._messageService.messageForThreadUser().subscribe(():void=> {})
    }
}