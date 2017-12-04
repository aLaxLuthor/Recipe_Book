import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedTab = 'recipe';
  onNavigate(tabName: string){
    this.loadedTab = tabName;
  }

}
