import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    @Output() featureSelected = new EventEmitter<string>();

    constructor(private route: ActivatedRoute, private router: Router){}

    onSelect(tabName: string){
        // this.featureSelected.emit(tabName);
    }

}