import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  age: number = 20;
  height: number = 186;
  
  items = [
    { name: 'Еда', energy: 1280 },
    { name: 'Арахис', energy: 120 },
    { name: 'Банан', energy: 97 },
    { name: 'رمان', energy: 47 }
  ];
  
  constructor() {}
}
