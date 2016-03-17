/**
 * user.service
 */

import {Injectable} from 'angular2/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {User} from '../model';
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

    private _currentUser:Subject<User> = new BehaviorSubject<User>(null);

    setCurrentUser(currentUser:User) {
        this._currentUser.next(currentUser);
    }

    get currentUser():Observable<User> {
        return this._currentUser;
    }
}
