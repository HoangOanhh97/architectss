
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { HttpHeaders } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
})
export class CommonService {
    accessToken = "";
    static _currentUser ;

    constructor() {
        if (localStorage.getItem('sarch-token')) {
            this.accessToken = localStorage.getItem('sarch-token');
        }
    }

    public static get user (){
        if(this._currentUser == null){
            this._currentUser = JSON.parse(localStorage.getItem("currentUser"));
        }
        return this._currentUser;
    }

    public getAuthHeader(includeJsonContentType?: boolean,): any {
        if (!this.accessToken) {
            this.accessToken = localStorage.getItem('h2-token');
        }
        let headers = new HttpHeaders({
            'Authorization': this.accessToken,
            'userId': CommonService._currentUser?._id || {}
        });
        if (includeJsonContentType) {
            headers.append("Content-Type", "application/json");
        }
        headers.append("Accept", `application/json, text/plain, */*`);
        return { headers: headers };
    }

    public handleError(error: Response) {
        if (error.status === 401 && window.location.href.indexOf('/login') < 0) {
            console.log('handleError login');
            window.location.href = "/login";
        }
        return Observable.throw(error);
    }

}