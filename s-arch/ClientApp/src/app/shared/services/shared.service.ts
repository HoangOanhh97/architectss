import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
// import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
    // Theming
    maTheme: string
    maThemeSubject: Subject<string> = new Subject<string>()

    setTheme(color) {
        this.maTheme = color
        this.maThemeSubject.next(this.maTheme)
    }

    constructor()  {
        // Set default theme as sa-black
        this.maTheme = 'sa-black';
    }

    
}