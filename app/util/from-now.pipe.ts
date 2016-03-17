/**
 * from-now.pipe
 */

import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'FromNow'})
export class FromNowPipe implements PipeTransform {
    transform(value:any, args:Array<any>) : any {
        return moment(value).fromNow();
    }
}
