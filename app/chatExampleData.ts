/**
 * chatExampleData
 */

import {User, Message, Thread} from './model';
import {MessageService} from '../app/service/message.service';
import {UserService} from '../app/service/user.service';
import {ThreadService} from '../app/service/thread.service';

// the person using the app us Juliet
let me:User = new User('Juliet', 'female-avatar-1.png');
let ladycap:User = new User('Lady Capulet', 'female-avatar-2.png');
let echo:User = new User('Echo Bot', 'male-avatar-1.png');
let rev:User = new User('Reverse Bot', 'female-avatar-4.png');
let wait:User = new User('Waiting Bot', 'male-avatar-2.png');

let tLadycap:Thread = new Thread('tLadycap', ladycap.name, ladycap.avatarSrc);
let tEcho:Thread = new Thread('tEcho', echo.name, echo.avatarSrc);
let tRev:Thread = new Thread('tRev', rev.name, rev.avatarSrc);
let tWait:Thread = new Thread('tWait', wait.name, wait.avatarSrc);

let initialMessages:Array<Message> = [
    new Message({
        author: me,
        sentAt: moment().subtract(45, 'minutes').toDate(),
        text: "Yet let me weep for such a feeling loss.",
        thread: tLadycap
    }),
    new Message({
        author: ladycap,
        sentAt: moment().subtract(20, 'minutes').toDate(),
        text: "So shall you feel the loss, but not the friend which you weep for.",
        thread: tLadycap
    }),
    new Message({
        author: echo,
        sentAt: moment().subtract(1, 'minutes').toDate(),
        text: "I'll echo whatever you send me",
        thread: tEcho
    }),
    new Message({
        author: rev,
        sentAt: moment().subtract(3, 'minutes').toDate(),
        text: "I'll reverse whatever you send me",
        thread: tRev
    }),
    new Message({
        author: wait,
        sentAt: moment().subtract(4, 'minutes').toDate(),
        text: "I'll wait however many seconds you send to me before responding. Try sending '3'",
        thread: tWait
    })
];

export class ChatExampleData {

    static init(userService:UserService,
                messageService:MessageService,
                threadService:ThreadService) {

        messageService.messages.subscribe(()=> ({}));

        userService.setCurrentUser(me);

        initialMessages.map((message:Message)=> messageService.addNewMessage(message));

        this.setupBots(messageService);
    }

    static setupBots(messageService:MessageService):void {

        // echo bot
        messageService.messageForThreadUser(tEcho, echo)
            .subscribe((message:Message):void => {
                let newMessage:Message = new Message({
                    author: echo,
                    text: message.text,
                    thread: tEcho
                });
                messageService.addNewMessage(newMessage);
            }, null);

        // reverse bot
        messageService.messageForThreadUser(tRev, rev)
            .subscribe((message:Message):void =>{
                let newMessage:Message = new Message({
                    author: rev,
                    text: message.text.split('').reverse().join(''),
                    thread: tRev
                });
                messageService.addNewMessage(newMessage);
            }, null);

        // waiting bot
        messageService.messageForThreadUser(tWait, wait)
            .subscribe((message:Message):void => {

                let waitTime: number = parseInt(message.text, 10);
                let reply: string;

                if (isNaN(waitTime)) {
                    waitTime = 0;
                    reply = "I didn't understand ${message}. Try sending me a number";
                } else {
                    reply = "I waited ${waitTime} seconds to send you this.";
                }

                let newMessage:Message = new Message({
                    author: wait,
                    text: reply,
                    thread: tWait
                });

                setTimeout(
                    () => {
                        messageService.addNewMessage(newMessage);
                    },
                    waitTime * 1000);

            }, null);
    }
}
