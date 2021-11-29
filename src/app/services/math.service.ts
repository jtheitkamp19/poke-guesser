import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MathService {
    constructor() {

    }

    getRandomNumberBetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }
}