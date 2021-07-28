import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import 'rxjs';
import { throwError } from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class NewsService {
    private _baseURl = environment.api;
    private cache = {

    }
    private handleError(error: Response) {
        return throwError(error);
    }

    constructor(private http: HttpClient) {

    }

    // getArticles(): Observable<any> {
    //     return this
    //         .http
    //         .get(this._baseURl + "api/public-articles");
    // }

    // getCategories(): Observable<any>  {
    //     return this
    //         .http
    //         .get(this._baseURl + "api/public-categories");
            
    // }

    // getArticle(id: any): Observable<any>  {
    //     return this
    //         .http
    //         .get(this._baseURl + "api/public-article/" + id);
    // }

}