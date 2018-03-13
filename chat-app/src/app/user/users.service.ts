import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { User } from "./user.model";

@Injectable()
export class UsersService {
    currentUser: Subject<User> = new BehaviorSubject<User>(null)

    public setCurrentUser(newUser: User): void {
        this.currentUser.next(newUser);
    }
}
export const userServiceInjectables: Array<any> = [
    UsersService
];