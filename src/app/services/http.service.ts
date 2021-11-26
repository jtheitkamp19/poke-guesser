import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor() {

    }

    getRequestHeaders(): HttpHeaders {
        return new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    }
}