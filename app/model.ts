/**
 * model
 */

import {uuid} from '../app/util/uuid';

export class User {
    private _id:string;

    constructor(private _name:string,
                private _avatarSrc:string) {
        this._id = uuid();
    }

    get id():string {
        return this._id;
    }

    get name():string {
        return this._name;
    }

    get avatarSrc():string {
        return this._avatarSrc;
    }
}

export class Thread {
    private _id:string;
    private _lastMessage:Message;
    private _name:string;
    private _avatarSrc:string;

    constructor(id?:string,
                name?:string,
                avatarSrc?:string) {
        this._id = id || uuid();
        this._name = name;
        this._avatarSrc = avatarSrc;
    }

    get id():string {
        return this._id;
    }

    get avatarSrc():string {
        return this._avatarSrc;
    }

    get name():string {
        return this._name;
    }

    get lastMessage():Message {
        return this._lastMessage;
    }

    set lastMessage(message:Message) {
        this._lastMessage = message;
    }
}

export class Message {
    private _id:string;
    private _sentAt:Date;
    private _isRead:boolean;
    private _author:User;
    private _text:string;
    private _thread:Thread;

    constructor(obj?:any) {
        this._id = obj && obj.id || uuid();
        this._isRead = obj && obj.isRead || false;
        this._sentAt = obj && obj.sentAt || new Date();
        this._author = obj && obj.author || null;
        this._text = obj && obj.text || null;
        this._thread = obj && obj.thread || null;
    }

    get sentAt():Date {
        return this._sentAt;
    }

    get thread():Thread {
        return this._thread;
    }

    get author():User {
        return this._author;
    }

    get text():string {
        return this._text;
    }
    get isRead():boolean {
        return this._isRead;
    }

    set isRead(status:boolean) {
        this._isRead = status;
    }

    set author(user:User) {
        this._author = user;
    }

    set thread(thread:Thread) {
        this._thread = thread;
    }

    set text(text:string) {
        this._text = text;
    }
}
