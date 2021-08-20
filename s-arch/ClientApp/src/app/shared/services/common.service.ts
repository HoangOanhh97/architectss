
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
        if (sessionStorage.getItem('sarch-token')) {
            this.accessToken = sessionStorage.getItem('sarch-token');
        }
    }

    public static get user (){
        if(this._currentUser == null){
            this._currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        }
        return this._currentUser;
    }

    public static getAuthHeader(includeJsonContentType?: boolean): any {
        const accessToken = sessionStorage.getItem('sarch-token');
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${accessToken}`,
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